var WelcomeController = require('./controllers/welcomeController'),    
    AccountController = require('./controllers/accountController'),
    AccountService = require('./services/accountService');    

module.exports = function routes(app, config) {    
    var accountService = new AccountService(config),    
        welcomeController = new WelcomeController(),
        accountController = new AccountController(accountService);

    app.get('/', welcomeController.welcome);
    app.get('/account/:userId', accountController.viewAccount);
    app.post('/account/:userId', accountController.updateAccount);
};