var Joi = require('joi')

/* Registration Validaton Rules */
const register_rules = {
        body: {
            fname: Joi.string().trim().regex(/^[a-zA-Z ]+$/, 'alphbets').min(2).max(60).required().label('First name'),
            lname: Joi.string().trim().regex(/^[a-zA-Z ]+$/, 'alphbets').min(2).max(60).label('Last name'),
            username: Joi.string().trim().regex(/^[a-zA-Z0-9]+$/, 'alphbets').min(2).max(60).required().label('Username'),
            email: Joi.string().trim().max(90).email().required().label('Email'),
            country: Joi.string().trim().max(50).required().label('Country'),
            city: Joi.string().trim().max(50).required().label('City'),
            address: Joi.string().trim().min(2).max(100).required().label('Address'), 
            postcode: Joi.string().trim().max(50).required().label('Postcode')
        }
};

/* FCM Validaton Rules */
const fcm_rules = {
        body: {
            token: Joi.string().trim().required().label('Token')
        }
};
/* FCM Validaton Rules */
const fcmnotification_rules = {
        body: {
            title: Joi.string().trim().max(50).required().label('Title'),
            body: Joi.string().trim().required().label('Body'),
            devices: Joi.string().trim().required().label('Devices')
        }
};

module.exports.register_schema = register_rules;
module.exports.fcmtoken_schema = fcm_rules;
module.exports.fcmnotification_schema = fcmnotification_rules;



 
