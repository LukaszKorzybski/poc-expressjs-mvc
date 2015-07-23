'use strict';
var unirest = require('unirest'),
    promiseWrapper = require('../framework/PromiseWrapper')(),
    ItemNotFoundError = require('../exceptions/ItemNotFoundError');

module.exports = function AccountService(config) {
    var accountUrl = config.backendUrl + '/account';

    this.getAccount = function(userId) {
        var request = unirest.get(accountUrl + '/' + userId);
        
        return promiseWrapper.wrapRequest(request)
            .catch(function(err) {
                if (err.responseStatus === 404) {
                    throw new ItemNotFoundError('Account', userId, err);
                } else {
                    throw err;
                }
            });
    };

    this.updateAccount = function(account) {
        var request = unirest
            .put(accountUrl + '/' + account.userId)
            .send(account);

        return promiseWrapper.wrapRequest(request);
    };
};