'use strict';

var Q = require('q'),
    mocks = require('../helpers/mocks.js'),
    AccountController = require('../../src/controllers/AccountController.js'),
    ItemNotFoundError = require('../../src/framework/exceptions/ItemNotFoundError.js');

describe('AccountController', function() {

    var accountController,
        accountService,
        AccountForm,
        form,
        request,
        response,
        next;

    var user = { id: 1 };

    var AccountForm = function() {         
        return form;
    };

    var getAccountUserPromise = function() {
        var userPromise = Q.fcall(function() {
            return { body: user }
        });
        accountService.getAccount.and.returnValue(userPromise);

        return userPromise;
    };

    var getAccountItemNotFoundPromise = function() {
        var userPromise = Q.fcall(function() {
            throw new ItemNotFoundError();
        });
        accountService.getAccount.and.returnValue(userPromise);

        return userPromise;
    };

    beforeEach(function() {
        request = { 
            params: { userId: user.id }
        };
        response = mocks.response();
        next = mocks.next();
        form = mocks.form();

        accountService = jasmine.createSpyObj('AccountService', ['getAccount', 'updateAccount']);
        accountController = new AccountController(accountService, AccountForm);
    });

    describe('viewAccount', function() {
        it('should render account view with given user details', function(done) {
            var userPromise = getAccountUserPromise();

            accountController.viewAccount(request, response, next);
            
            userPromise.then(function() {
                var renderArgs = response.render.calls.argsFor(0);
                expect(form.bind).toHaveBeenCalledWith(user);
                expect(renderArgs[0]).toEqual('account');
                expect(renderArgs[1].form).toBe(form);
                done();
            });
        });

        it('should return with ItemNotFoundError when user cannot be retrieved', function(done) {
            var userPromise = getAccountItemNotFoundPromise();

            accountController.viewAccount(request, response, next);

            next.and.callFake(function() {
                var thrownError = next.calls.argsFor(0)[0];
                expect(thrownError.name).toEqual('ItemNotFoundError');
                done();
            });
        });
    });

    describe('updateAccount', function() {        
        it('should update the user when submitted form is valid', function(done) {
            var getUserPromise = getAccountUserPromise();
            form.isValid.and.returnValue(true);

            accountController.updateAccount(request, response, next);

            getUserPromise.then(function() {
                expect(form.applyTo).toHaveBeenCalledWith(user);
                expect(accountService.updateAccount).toHaveBeenCalled();
                done();
            });
        });

        it('should redirect back to main page', function(done) {
            var getUserPromise = getAccountUserPromise();
            form.isValid.and.returnValue(true);

            accountController.updateAccount(request, response, next);

            response.redirect.and.callFake(function() {
                var target = response.redirect.calls.argsFor(0)[0];
                expect(target).toEqual('/');
                done();
            });
        });

        it('should display the form again if form data is not valid', function() {
            form.isValid.and.returnValue(false);

            accountController.updateAccount(request, response, next);

            expect(response.render).toHaveBeenCalled();
            expect(response.render.calls.argsFor(0)[0]).toEqual('account');
        });

        it('should return with ItemNotFoundError when user cannot be retrieved', function(done) {
            var userPromise = getAccountItemNotFoundPromise();
            form.isValid.and.returnValue(true);

            accountController.updateAccount(request, response, next);

            next.and.callFake(function() {
                var thrownError = next.calls.argsFor(0)[0];
                expect(thrownError.name).toEqual('ItemNotFoundError');
                done();
            });
        });
    });  
});