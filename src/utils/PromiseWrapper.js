module.exports = function PromiseWrapper() {
    'use strict';

    var self = {};
    
    self.wrapRequest = function(unirestRequest) {
        var promise = new Promise(function(resolve, reject) {
            unirestRequest.end(function(response) {
                response.ok ? resolve(response) : reject(response);
            });
        });

        return promise;
    };
    
    return self;
};