var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var glob = require('glob');
var config = require('config');

mongoose.Promise = global.Promise;

var modelsDirectory = config.app.modelsDirectory;
if (modelsDirectory) {
    modelsDirectory = appRoot + modelsDirectory;
} else {
    modelsDirectory = path.join(__dirname, 'models');
}

var models = glob.sync(modelsDirectory + "/*.js", null);

for (var i = 0; i < models.length; i++) {
    require(models[i]);
}

module.exports = exports = mongoose;
