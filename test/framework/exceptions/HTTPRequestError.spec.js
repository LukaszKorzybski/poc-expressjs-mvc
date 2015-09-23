'use strict';

var mocks = require('../../helpers/mocks.js'),
    HTTPRequestError = require('../../../src/framework/exceptions/HTTPRequestError.js');

describe('HTTPRequestError', function() {
    
    var response,
        error;

    beforeEach(function() {
        response = mocks.unirestResponse();
        response.status = 200;
        response.request = { 
            method: 'get',
            href: 'http://localhost/test'
        };

        error = new HTTPRequestError(response);
    });

    it('should have proper name', function() {
        expect(error.name).toBe('HTTPRequestError');
    });

    it('should expose original response', function() {
        expect(error.response).toBe(response);
    });

    it('should expose exception that caused it', function() {
        var cause = new Error("cause");
        error = new HTTPRequestError(response, cause);
        expect(error.cause).toBe(cause);
    });
});