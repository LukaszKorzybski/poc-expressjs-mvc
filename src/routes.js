'use strict';
var WelcomeController = require('./controllers/WelcomeController'),    
    AccountController = require('./controllers/AccountController'),
    AccountService = require('./services/AccountService'),
    AccountForm = require('./forms/AccountForm');

module.exports = function routes(app, config) {    
    var accountService = new AccountService(config),    
        welcomeController = new WelcomeController(),
        accountController = new AccountController(accountService, AccountForm);

    app.get('/', welcomeController.welcome);
    app.get('/account/:userId', accountController.viewAccount);
    app.post('/account/:userId', accountController.updateAccount);
};