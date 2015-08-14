'use strict';

var mocks = require('../helpers/mocks.js'),
    exceptionMappers = require('../../src/framework/exceptionMappers.js'),
    ItemNotFoundError = require('../../src/framework/exceptions/ItemNotFoundError.js');

describe('exceptionMappers', function() {

    var response,
        next;

    beforeEach(function() {
        response = mocks.response();
        next = mocks.next();
    });

    describe('itemNotFoundErrorMapper', function() {

        var unknownError = { name: 'unknown error' },
            itemNotFoundError = new ItemNotFoundError('entity', 1);

        it('should be a no-op if error is not ItemNotFoundError', function() {            
            exceptionMappers.itemNotFoundErrorMapper(unknownError, null, response, next);
            expect(response.render.calls.count()).toEqual(0);
        });

        it('should pass execution to others if error is not ItemNotFoundError', function() {
            exceptionMappers.itemNotFoundErrorMapper(unknownError, null, response, next);
            expect(next).toHaveBeenCalled();
        });

        it('should set 404 response status for ItemNotFoundError', function() {
            exceptionMappers.itemNotFoundErrorMapper(itemNotFoundError, null, response, next);
            expect(response.status).toHaveBeenCalledWith(404);
        });

        it('should render 404.html template for ItemNotFoundError', function() {
            exceptionMappers.itemNotFoundErrorMapper(itemNotFoundError, null, response, next);
            expect(response.render).toHaveBeenCalledWith('404');
        });
    });
});