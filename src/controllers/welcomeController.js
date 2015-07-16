'use strict';

module.exports = function WelcomeController() {
    this.welcome = function(req, res) {
        res.render('welcome');
    };   
};