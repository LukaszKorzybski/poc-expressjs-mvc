'use strict';

var mocks = require('../helpers/mocks.js'),
    PromiseWrapper = require('../../src/framework/PromiseWrapper.js');

describe('PromiseWrapper', function() {    

    var promiseWrapper;    

    beforeEach(function() {
        promiseWrapper = PromiseWrapper();
    });

    describe('wrapRequest', function() {
        
        var unirestRequest;

        var createUnirestRequest = function() {
            return {
                resolve: null,
                end: function(resolver) { this.resolve = resolver; }
            };
        };

        beforeEach(function() {
            unirestRequest = createUnirestRequest();
        });

        it('should return a promise object', function() {
            var result = promiseWrapper.wrapRequest(unirestRequest);
            
            expect(typeof result).toEqual("object");
            expect(typeof result.then).toEqual("function");
        });

        it('should return promise which is resolved with response when response status is OK', function(done) {
            var httpResponse = { ok: true };

            var result = promiseWrapper.wrapRequest(unirestRequest);

            result.then(function(resp) {
                expect(resp).toBe(httpResponse);
                done();
            });

            result.catch(function() {
                done.fail('Promise rejected but was expected to be resolved.');
            });
           
            unirestRequest.resolve(httpResponse);
        });

        it('should return promise which is rejected with HTTPRequestError when response status is not OK', function(done) {
            var httpResponse = { ok: false, request: { method: 'GET' } };

            var result = promiseWrapper.wrapRequest(unirestRequest);

            result.then(function(resp) {
                done.fail('Promise resolved but was expected to be rejected');
            });

            result.catch(function(err) {
                expect(err.name).toEqual('HTTPRequestError');
                done();
            });

            unirestRequest.resolve(httpResponse);
        });
    });    
});