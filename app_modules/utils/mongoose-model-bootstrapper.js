var mongoose = require('mongoose');
var immutable = require('mongoose-immutable');
var findOrCreate = require('mongoose-findorcreate');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

module.exports = exports = function (schemaObj, plugins) {

    schemaObj.ud = { "type": Date, "default": Date.now, "index": true };
    schemaObj.cd = { "type": Date, "default": Date.now, "index": true, "immutable": true };

    var schema = new Schema(schemaObj);

    schema.plugin(immutable);
    schema.plugin(deepPopulate);
    schema.plugin(findOrCreate);

    if (plugins) {
        for (var i = 0; i < plugins.length; i++) {
            schema.plugin(require(plugins[i].name), plugins[i].opts);
        }
    }

    schema.pre('save', function (next)
    {
        // this.update({}, { $set: { 'ud': new Date() } });
        next();
    });
    
    schema.pre('update', function (next)
    {
        // this.update({}, { $set: { 'ud': new Date() } });
        next();
    });

    return schema;
};