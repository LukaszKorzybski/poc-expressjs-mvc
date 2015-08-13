'use strict';

var ErrorUtils = require('../../src/framework/ErrorUtils.js'),
    mocks = require('../helpers/mocks.js');

describe('ErrorUtils', function() {
    
    var errorUtils,
        response,
        logger;

    beforeEach(function() {
        logger = jasmine.createSpyObj('logger', ['error']),
        response = mocks.response();

        errorUtils = new ErrorUtils(logger);        
    });

    describe('debugErrorHandler', function() {
        it('should send 500 response status', function() {
            errorUtils.debugErrorHandler({}, null, response, null);
            expect(response.status).toHaveBeenCalledWith(500);
        });

        it('should log full stack trace', function() {
            spyOn(errorUtils, 'getFullStackTrace').and.returnValue("full stack trace");
            errorUtils.debugErrorHandler({}, null, response, null)
            expect(logger.error).toHaveBeenCalledWith("full stack trace");
        });
    });

    describe('productionErrorHandler', function() {
        it('should send 500 response status', function() {
            errorUtils.productionErrorHandler({}, null, response, null);
            expect(response.status).toHaveBeenCalledWith(500);
        });

        it('should log full stack trace', function() {
            spyOn(errorUtils, 'getFullStackTrace').and.returnValue("full stack trace");
            errorUtils.productionErrorHandler({}, null, response, null)
            expect(logger.error).toHaveBeenCalledWith("full stack trace");
        });

        it('should render 500.html template', function() {
            errorUtils.productionErrorHandler({}, null, response, null)
            expect(response.render).toHaveBeenCalledWith('500');
        });
    });

    describe('getFullStackTrace', function() {
        it('should return empty string if error does not have a stack trace or cause', function() {
            var error = {};
            var result = errorUtils.getFullStackTrace(error);
            expect(result).toBe("");
        });

        it("should return error's stack trace if error does not have cause", function() {
            var error = { stack: 'stack trace' };
            var result = errorUtils.getFullStackTrace(error);
            expect(result).toBe(error.stack);
        });

        it("should return valid stack trace when cause's does not have a stack trace", function() {
            var error = { stack: 'stack trace', cause: {} };
            var result = errorUtils.getFullStackTrace(error);
            expect(result).toMatch(/^stack trace/);
        });

        it("should return composed stack trace for error and its cause", function() {
            var cause = { stack: 'cause stack trace' },
                error = { stack: 'stack trace', cause: cause };

            var result = errorUtils.getFullStackTrace(error);
            expect(result).toBe(error.stack + "\nCaused by:\n" + cause.stack);
        });
    });    
});