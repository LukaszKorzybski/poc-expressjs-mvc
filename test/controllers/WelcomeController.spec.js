'use strict';

var mocks = require('../helpers/mocks.js'),
    WelcomeController = require('../../src/controllers/WelcomeController.js');

describe('WelcomeController', function() {

    var welcomeController,
        response;

    beforeEach(function() {
        response = mocks.response();
        welcomeController = new WelcomeController();
    });

    describe('welcome', function() {
        it('should render welcome page', function() {
            welcomeController.welcome({}, response);
            expect(response.render).toHaveBeenCalledWith('welcome');
        });
    });
});