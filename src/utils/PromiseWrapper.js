'use strict';
var Q = require('q'),
    HTTPRequestError = require('../exceptions/HTTPRequestError');

module.exports = function PromiseWrapper() {    
    var self = {};
    
    self.wrapRequest = function wrapRequest(unirestRequest) {
        var deferred = Q.defer();
        
        unirestRequest.end(function(response) {
            if (response.ok) {
                deferred.resolve(response);
            } else {                                    
                deferred.reject(new HTTPRequestError(response));
            }
        });

        return deferred.promise;
    };
    
    return self;
};