/*
* @Author: MaheshBabu
* @Date:   2019-06-27 9:08:42
*/

'use strict';

// TODO: ES6
require('debug-trace')({
    always: true
});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var appRoot = require('app-root-path');
var config = require('config');
var cors = require('cors');
require('utils/mongoose-bootstrapper');
require('utils/mongoose-connector');
var tz = require('moment-timezone');

/*app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});*/
app.use(cors({
    origin: function (origin, callback) {
        return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routesDirectory = config.app.routesDirectory;
if (routesDirectory) {
    routesDirectory = appRoot + routesDirectory;
} else {
    routesDirectory = path.join(__dirname, 'routes');
}

app.use(function (req, res, next) {
    if (req.body && req.body.formData && typeof req.body.formData == 'string') {
        let formData = JSON.parse(req.body.formData);

        for (var key in formData) {
            req.body[key] = formData[key];
        }

        delete req.body.formData;
    }
    next();
});

var routes = config.app.routes;

// routes
for (var i = 0; i < routes.length; i++) {
    var routeObject = routes[i];
    var p = path.join(routesDirectory, routeObject.file);
    app.use(routeObject.basePath, require(p));
}

app.use(require('utils/http-route-response-sender'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// development error handler
if (app.get('env') === 'development' || app.get('env') === 'staging') {
    app.use(function (err, req, res, next) {
        if (err.isJoi) {
            res.status(406).json({
                message:(err.details[0].message).toString(),
                error:err
            });
            return;
        }else{
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err
            });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    if (err.isJoi) {
        //console.log(err.details[0].message)
        res.status(406).json({
            message:(err.details[0].message).toString(),
            error:err
        });
        return;
    }else{
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    }
});

module.exports = app;
