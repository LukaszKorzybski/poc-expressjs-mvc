var AccountForm = require('../forms/accountForm.js');

module.exports = function AccountController(accountService) {
    'use strict';    

    this.viewAccount = function(req, res) {
        var userId = req.params.userId;

        accountService
            .getAccount(userId)
            .then(function(response) {

                var account = response.body,
                    form = new AccountForm();

                form.bind(account);
                res.render('account', { form: form });
            });
    };

    this.updateAccount = function(req, res) {
        var userId = req.params.userId,
            form = new AccountForm(req.body);

        if (form.isValid()) {
            var getPromise = accountService.getAccount(userId);

            getPromise.then(function(getResponse) {
                var account = getResponse.body,
                updatedAccount = form.applyTo(account);

                return accountService.updateAccount(updatedAccount);
            })
            .then(function(updateResponse) {
                res.redirect('/');
            });

        } else {
            res.render('account', { form: form });
        }
    };
};