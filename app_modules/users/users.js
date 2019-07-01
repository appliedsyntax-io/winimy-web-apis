'use strict';
/*
* @Author: MaheshBabu U
* @Date:   2019-07-01 21:04:40
*/
const AppClass = require('app-class');
const AppError = require('app-error');
const mongoose = require('utils/mongoose-bootstrapper');
const User = mongoose.model('User');
const FcmUser = mongoose.model('FcmUser');
const fs = require('fs');
const appRoot = require('app-root-path');
const config = require('config')

var admin = require("firebase-admin");

var serviceAccount = require(appRoot + '/public/firebase.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "",
  messagingSenderId: ""

});

//const messaging = admin.messaging();

class Users extends AppClass {

	getUsers(){
		return User.find();
	}

	/**
	 * Store data into the users collection
	 */

	register(userData){
		return User.create(userData)
		.then((result) =>{
			return Promise.resolve({status: 201, message:"Success", result: result})
		}).catch(err =>{
			return Promise.reject({status:406, message: err})
		})
	}

	/**
	 * Get i18n language data
	 * @param language
	 */
	 getLanguageData(language) {
	 	return new Promise(function(resolve, reject){
		 	fs.readFile(appRoot + '/i18n/' + language + '.json', (err, data) => {  
			    if (err) throw err;
			    let langData = JSON.parse(data);
			    return resolve(langData) 
			});
		})
	 }

	/**
	 * Get web push notifications
	 */
	createPushNotification(data){
		console.log(data)
		// This registration token comes from the client FCM SDKs.
		if(data.devices){
			if(data.devices === 'all'){

			}else{
				var message = { 
								"notification": {
								  "title": data.title, 
								  "body": data.body
								},
								 "token" : data.devices
							}
				// Send a message to the device corresponding to the provided
				// registration token.
				return new Promise(function(resolve, reject){
					admin.messaging().send(message)
					.then((response) => {
					   // Response is a message ID string.
					   console.log('Successfully sent message:', response);
					   return resolve(response)
					})
					.catch((error) => {
					   console.log('Error sending message:', error);
					   return reject(error)
					});
				})
			}
			
		}
	}

	/**
	 * Insert user FCM user device token
	 */
	 saveDeviceToken(data){
	 	var query = { token: data.token },
		    options = { upsert: true, new: true, setDefaultsOnInsert: true };
	 	return FcmUser.findOneAndUpdate(query, data, options)
		.then((result) =>{
			return Promise.resolve({status: 201, message:"Success", result: result})
		}).catch(err =>{
			return Promise.reject({status:406, message: err})
		})
	 }

	 /**
	  * Return FCM registered Devices tokens
	  */
	  getdevices(){
	  	return FcmUser.find()
		.then((result) =>{
			return Promise.resolve({status: 201, message:"Success", result: result})
		}).catch(err =>{
			return Promise.reject({status:406, message: err})
		})
	  }

}

module.exports = exports = new Users();