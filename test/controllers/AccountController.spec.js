'use strict';

var Q = require('q'),
    mocks = require('../helpers/mocks.js'),
    AccountController = require('../../src/controllers/AccountController.js'),
    ItemNotFoundError = require('../../src/framework/exceptions/ItemNotFoundError.js');

describe('AccountController', function() {

    var accountController,
        accountService,
        request,
        response,
        next;

    var user = { id: 1 };

    beforeEach(function() {
        request = { 
            params: { userId: user.id }
        };
        response = mocks.response();
        next = mocks.next();

        accountService = jasmine.createSpyObj('AccountService', ['getAccount']);
        accountController = new AccountController(accountService);
    });

    describe('viewAccount', function() {
        it('should render account view with given user details', function(done) {
            var userPromise = Q.fcall(function() {
                return { body: user }
            });
            accountService.getAccount.and.returnValue(userPromise);

            accountController.viewAccount(request, response, next);
            
            userPromise.then(function() {
                var renderArgs = response.render.calls.argsFor(0);
                expect(renderArgs[0]).toEqual('account');
                expect(renderArgs[1].form.data.id).toEqual(user.id);
                done();
            });
        });

        it('should return with ItemNotFoundError when user cannot be retrieved', function(done) {
            var userPromise = Q.fcall(function() {
                throw new ItemNotFoundError();
            });
            accountService.getAccount.and.returnValue(userPromise);

            accountController.viewAccount(request, response, next);

            next.and.callFake(function() {
                var thrownError = next.calls.argsFor(0)[0];
                expect(thrownError.name).toEqual('ItemNotFoundError');
                done();
            });
        });
    });
});