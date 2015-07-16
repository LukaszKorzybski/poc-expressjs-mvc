'use strict';
var HTTPRequestError = require('../exceptions/HTTPRequestError');

module.exports = function PromiseWrapper() {    
    var self = {};
    
    self.wrapRequest = function(unirestRequest) {
        var promise = new Promise(function(resolve, reject) {
            unirestRequest.end(function(response) {
                if (response.ok) {
                    resolve(response)
                } else {
                    var error = new HTTPRequestError(response);
                    reject(error);
                }
            });
        });

        return promise;
    };
    
    return self;
};