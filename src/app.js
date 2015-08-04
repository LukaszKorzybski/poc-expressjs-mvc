'use strict';
var express = require('express'),
    WebApplication = require('./framework/WebApplication'),
    config = require('./config'),
    routes = require('./routes');    

var main = function() {
    var expressApp = express();
    var application = new WebApplication(expressApp, config, routes);
    
    application.initialize();
    application.run();
}

main();