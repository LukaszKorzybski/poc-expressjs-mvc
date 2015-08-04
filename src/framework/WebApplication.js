'use strict';
var Q = require('q'),
    bodyParser = require('body-parser'),
    kleiDust = require('klei-dust'),    
    errorUtils = require('./errorUtils'),
    exceptionMappers = require('./exceptionMappers');

function WebApplication(app, config, routes) {
    this.app = app;
    this.config = config;
    this.routes = routes;
};

var proto = WebApplication.prototype;

proto.initialize = function() {
    this.app.use(bodyParser());
    this.setupTemplateEngine();
    this.routes(this.app, this.config);
    this.setupExceptionMapping();
    this.setupUnhandledExceptionReporting();
};

proto.setupTemplateEngine = function() {
    kleiDust.setOptions({ extension: 'html' });
    this.app.set('views', __dirname + '/../views');
    
    this.app.engine('html', kleiDust.dust);
    this.app.set('view engine', 'html');
    this.app.set('view options', { layout: false });
}

proto.setupExceptionMapping = function() {
    if (this.app.get('env') !== 'development') {
        this.app.use(exceptionMappers.itemNotFoundErrorMapper);
    }
};

proto.setupUnhandledExceptionReporting = function() {
    if (this.app.get('env') === 'development') {
        Q.longStackSupport = true;
        this.app.use(errorUtils.debugErrorHandler);
    } else {
        this.app.use(errorUtils.productionErrorHandler);
    }
};

proto.run = function() {
    var server = this.app.listen(this.config.port, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('WebApplication listening at http://%s:%s', host, port);
    });
};

module.exports = WebApplication;