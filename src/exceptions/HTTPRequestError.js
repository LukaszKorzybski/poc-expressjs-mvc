var errors = require('node-custom-errors');

var HTTPRequestError = errors.create('HTTPRequestError', Error, null, false, function(response) {
    'use strict';

    var errorMessage = 'HTTP request failed | Status: ' + response.status + ' | Response: ' + response.raw_body;   

    this.message = errorMessage;
    this.response = response;
    this.httpStatus = response.status;
});


module.exports = HTTPRequestError;