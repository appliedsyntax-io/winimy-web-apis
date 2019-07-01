/*
* @Author: Mahesh Babu
* @Date:   2019-07-01
*/

'use strict';

class AppClass {
    constructor() {
        // FIXME: won't work for multiple inheritance
        // FIXME: should be done for only functions?
        for (let name of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            this[name] = this[name].bind(this);
        }
    }

    getErrors() {
        return this.errors || {};
    }
}

module.exports = exports = AppClass;
