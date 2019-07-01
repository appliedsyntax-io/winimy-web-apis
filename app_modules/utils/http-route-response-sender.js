/*
* @Author: MaheshBabu U
* @Date:   2019-07-01 21:04:40
*/

'use strict';

module.exports = exports = function (req, res, next) {
    var locals = res.locals;

    var status = 200;
    if (locals.err) {
        status = 406;
    }

    if (locals.data && locals.data.message) {
        try {
            req.flash("message", locals.data.message);
        } catch (e) {}
    }
    var accepts = req.headers['accept'];
    if ((accepts.indexOf('application/json') > -1) && locals.data) {
        // purging flash as it is not needed!
        try {
            req.flash();
        } catch (e) {};
        return res.status(status).json(locals.data);
    }
    if (locals.redirect) {
        return res.redirect(locals.redirect);
    }

    if (locals.render) {
        if (!locals.data) {
            locals.data = {};
        }
        locals.data.flash = req.flash();
        return res.status(status).render(locals.render, locals.data);
    }

    if (locals.data) {
        return res.status(status).send(locals.data);
    }
    next();
};
