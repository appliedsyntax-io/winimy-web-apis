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
var FcmUserSchema = mongooseBootstrapper({

    /*user_id: { type: String, required: true },*/

    token: { type: String, index: true, unique: true, required: true },

    archive: { type: Boolean, default: false }

}, []);


FcmUserSchema.pre('find', function () {
  this.where({ archive: false });
});



mongoose.model('FcmUser', FcmUserSchema, 'fcmusers');
