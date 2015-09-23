'use strict';

var errors = require('node-custom-errors'),
    sprintf = require("underscore.string/sprintf");

var HTTPRequestError = errors.create('HTTPRequestError', Error, null, false, function(response, cause) {    
    var request = response.request,
        method = request.method.toUpperCase(),
        template = 'HTTP request failed | %s %s | Status: %s',
        errorMessage = sprintf(template, method, request.href, response.status);

    this.name = 'HTTPRequestError';
    this.message = errorMessage;
    this.cause = cause;

    this.url = request.href;
    this.method = method;
    this.responseStatus = response.status;
    this.response = response;
});


module.exports = HTTPRequestError;