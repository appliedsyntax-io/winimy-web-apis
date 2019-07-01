/*
* @Author: MaheshBabu U
* @Date:   2019-07-01 21:04:40
*/

'use strict';

const config = require('config');
const mongoose = require('mongoose');
//const MongoClient = require('mongodb').MongoClient;
var options = { server: { socketOptions: { keepAlive: 1 } }, useNewUrlParser: true };
mongoose.connect(config.app.dbURL, options, err => {
    if (err) {
        console.log('error connecing to mongo db...');
        return console.log(err);
    }
    console.log('connected to mongo db...');
});
