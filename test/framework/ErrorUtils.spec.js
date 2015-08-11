'use strict';

var ErrorUtils = require('../../src/framework/ErrorUtils.js');

describe('ErrorUtils', function() {
    
    var errorUtils,
        response,
        logger;

    beforeEach(function() {
        logger = jasmine.createSpyObj('logger', ['error']),
        response = jasmine.createSpyObj('response', ['send', 'status', 'render']);

        errorUtils = new ErrorUtils(logger);
        response.status.and.returnValue(response);
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
});