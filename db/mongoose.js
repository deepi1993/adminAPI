var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoURL = 
mongoose.connect('mongodb://<vikramkalta1991>:<deepika93>@ds131492.mlab.com:31492/readyapi');

module.exports = {mongoose};
