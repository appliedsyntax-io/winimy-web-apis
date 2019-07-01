/*
* @Author: MaheshBabu U
* @Date:   2019-07-01 21:04:40
*/

'use strict';

var AppError = require('app-error');

module.exports = exports = function (method, errorMessages = {}, ...args) {
    return function (req, res, next) {
        if (!res.locals.data) {
            res.locals.data = {};
        }
        method(...args).then((result) => {
            if (result == true) {
                result = {
                    success: true
                };
            }
            res.locals.data = result || { success: true };
            next();
        }).catch((err) => {
            res.locals.err = err;
            console.error(err);
            res.locals.data.message = errorMessages[err.code] || errorMessages[err.message] || "There was a problem processing your request";
            res.locals.data.code = err.code;
            if (err.errors) {
                res.locals.data.errors = err.errors;
            }
            next();
        });
    };
};
