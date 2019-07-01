/*
* @Author: Mahesh Babu
* @Date:   2019-07-01
*/

'use strict';

var ExtendableError = require('es6-error');

class AppError extends ExtendableError {
    constructor(message = "No message provided", code = message, errors = [], data) {
        super(message);
        this.errors = errors;
        this.code = code;
        this.data = data;
    }
}

module.exports = exports = AppError;
