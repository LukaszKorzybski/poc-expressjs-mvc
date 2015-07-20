'use strict';
var Q = require('q'),
    express = require('express'),
    bodyParser = require('body-parser'),
    kleiDust = require('klei-dust'),
    config = require('./config'),
    routes = require('./routes'),
    debugErrorHandler = require('./utils/debugErrorHandler'),
    productionErrorHandler = require('./utils/productionErrorHandler');

var app = null;

var main = function() {
    app = express();
    initialize();
    run();
}

var initialize = function() {
    app.use(bodyParser());
    setupTemplateEngine();    
    routes(app, config);
    setupErrorHandling();
};

var setupTemplateEngine = function() {
    kleiDust.setOptions({ extension: 'html' });
    app.set('views', __dirname + '/views');
    
    app.engine('html', kleiDust.dust);
    app.set('view engine', 'html');
    app.set('view options', { layout: false });
}

var setupErrorHandling = function() {
    if (app.get('env') === 'development') {
        Q.longStackSupport = true;
        app.use(debugErrorHandler);
    } else {
        app.use(productionErrorHandler);
    }
};

var run = function() {
    var server = app.listen(config.port, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app listening at http://%s:%s', host, port);
    });
};

main();