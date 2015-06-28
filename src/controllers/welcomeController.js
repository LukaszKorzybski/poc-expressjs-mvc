module.exports = function WelcomeController() {
    'use strict';    

    this.welcome = function(req, res) {
        res.render('welcome');
    };   
};