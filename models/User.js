/*
* @Author: MaheshBabu U
* @Date:   2019-07-01
*/

'use strict';

var path = require('path');
var mongooseBootstrapper = require('utils/mongoose-model-bootstrapper');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var ShortId = require('mongoose-shortid-nodeps');
mongoose.set('useCreateIndex', true);
var UserSchema = mongooseBootstrapper({

    username: { type: String, required: true },

    email: { type: String, index: true, unique: true, required: true },

    fname: { type: String, required: true, index: true },

    lname: { type: String },

    address: { type: String, required: true },

	country: { type: String, required: true, index: true },

	city: { type: String, required: true },

	postcode: { type: String, required: true },

    archive: { type: Boolean, default: false }

}, []);


UserSchema.pre('find', function () {
  //this.where({ archive: false });
});



mongoose.model('User', UserSchema, 'users');
