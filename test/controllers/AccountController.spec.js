'use strict';

var Q = require('q'),
    mocks = require('../helpers/mocks.js'),
    AccountController = require('../../src/controllers/AccountController.js');

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
            var promise = Q.fcall(function() { 
                return { body: user } 
            });
            accountService.getAccount.and.returnValue(promise);
            
            accountController.viewAccount(request, response, next);
            
            promise.then(function() {                
                var renderArgs = response.render.calls.argsFor(0);
                expect(renderArgs[0]).toEqual('account');
                expect(renderArgs[1].form.data.id).toEqual(user.id);
                done();
            })
            .catch(function(e) {
                done.fail('Promise expected to be resolved but rejected with: ' + e);
            });            
        });
    });
});