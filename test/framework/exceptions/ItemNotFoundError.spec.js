'use strict';

var mocks = require('../../helpers/mocks.js'),
    ItemNotFoundError = require('../../../src/framework/exceptions/ItemNotFoundError.js');

describe('ItemNotFoundError', function() {

    var error,
        cause;

    beforeEach(function() {
        cause = new Error("cause");
        error = new ItemNotFoundError("ItemType", "testId", cause);
    });

    it('should have proper name', function() {
        expect(error.name).toEqual('ItemNotFoundError');
    });

    it('should expose exception that caused it', function() {
        expect(error.cause).toBe(cause);
    });
});