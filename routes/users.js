/*
* @Author: MaheshBabu U
* @Date:   2019-07-01 21:04:40
*/
'use strict';

var express = require('express');
var router = express.Router();
const reqHandler = require('utils/http-route-request-handler');
const resSender = require('utils/http-route-response-sender');
const users = require('users')
const errorMessages = require('./users-errors.json');
const Joi = require('joi');
const validateForm = require('express-joi-middleware');
const schemas = require('validation-schemas/rules.js');

/** Get Users Details **/
router.get('/', (req, ...args) => reqHandler(users.getUsers, errorMessages)(req, ...args), resSender);

/** User Registration **/
router.post('/register', validateForm(schemas.register_schema, {}), (req, res, next) => reqHandler(users.register, errorMessages, req.body)(req, res, next), resSender);

/** Register FCM device token **/
router.post('/fcmtoken', validateForm(schemas.fcmtoken_schema, {}), (req, res, next) => reqHandler(users.saveDeviceToken, errorMessages, req.body)(req, res, next), resSender);

/** Get i18n Language **/
router.get('/:language/i18n', (req, ...args) => reqHandler(users.getLanguageData, errorMessages, req.params.language)(req, ...args), resSender);

/** Get FCM registered device tokens **/
router.get('/getdevices', (req, ...args) => reqHandler(users.getdevices, errorMessages, req.params.language)(req, ...args), resSender);

/** Get firebase token **/
router.post('/sendnotifications',  validateForm(schemas.fcmnotification_schema, {}), (req, res, next) => reqHandler(users.createPushNotification, errorMessages, req.body)(req, res, next), resSender);


module.exports = router;
