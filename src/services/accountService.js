'use strict';
var unirest = require('unirest'),
    promiseWrapper = require('../utils/PromiseWrapper')();

module.exports = function AccountService(config) {
    var accountUrl = config.backendUrl + '/account';

    this.getAccount = function(userId) {
        var request = unirest.get(accountUrl + '/' + userId);

        return promiseWrapper.wrapRequest(request);
    };

    this.updateAccount = function(account) {
        var request = unirest
            .put(accountUrl + '/' + account.userId)
            .send(account);

        return promiseWrapper.wrapRequest(request);;
    };
};