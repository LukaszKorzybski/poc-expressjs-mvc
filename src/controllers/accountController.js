var AccountForm = require('../forms/accountForm.js');

module.exports = function AccountController(accountService) {
    'use strict';    

    this.viewAccount = function(req, res, next) {
        var userId = req.params.userId;        

        accountService
            .getAccount(userId)
            .then(function(response) {                
                // var account = response.body,
                //     form = new AccountForm();            

                //form.bind(account);
                //res.render('account', { form: form });
                res.render('account', { form: { data: {}, errors: {} } });
            })
            .catch(function(e) {
                next(e);
            });
    };

    this.updateAccount = function(req, res, next) {
        var userId = req.params.userId,
            form = new AccountForm(req.body);

        if (form.isValid()) {
            var getPromise = accountService.getAccount(userId);

            getPromise.then(function(getResponse) {
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