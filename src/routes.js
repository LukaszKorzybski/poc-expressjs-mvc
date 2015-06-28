var config = require('./config.js'),
    WelcomeController = require('./controllers/welcomeController'),    
    AccountController = require('./controllers/accountController'),
    AccountService = require('./services/accountService');

var accountService = new AccountService(config),    
    welcomeController = new WelcomeController(),
    accountController = new AccountController(accountService);
    
    

module.exports = function routes(app) {
    app.get('/', welcomeController.welcome);
    app.get('/account/:userId', accountController.viewAccount);
    app.post('/account/:userId', accountController.updateAccount);
};