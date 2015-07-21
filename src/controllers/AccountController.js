'use strict';
var AccountForm = require('../forms/AccountForm.js');

module.exports = function AccountController(accountService) {
    
    this.viewAccount = function(req, res, next) {
        var userId = req.params.userId;

        accountService
            .getAccount(userId)
            .then(function(response) {
                var account = response.body,
                    form = new AccountForm();

                form.bind(account);
                res.render('account', { form: form });
            })
            .catch(function(e) {
                next(e);
            });
    };

    this.updateAccount = function(req, res, next) {
        var userId = req.params.userId,
            form = new AccountForm(req.body);

        if (form.isValid()) {
            var responsePromise = accountService.getAccount(userId);

            responsePromise.then(function(getResponse) {
                var account = getResponse.body;
                
                form.applyTo(account);
                return accountService.updateAccount(account);
            })
            .then(function(updateResponse) {
                res.redirect('/');
            })
            .catch(function(e) {
                next(e);
            })

        } else {
            res.render('account', { form: form });
        }
    };
};