'use strict';

var sys = require('sys');

module.exports = function WelcomeController() {
    this.welcome = function(req, res) {        
        res.render('welcome');
    };   
};