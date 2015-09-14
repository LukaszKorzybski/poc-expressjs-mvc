'use strict';

var mocks = require('../../helpers/mocks.js'),
    Form = require('../../../src/framework/forms/Form.js');

describe('Form', function() {

    var form,
        data = { a: 1, b: "2" };

    it('should initialise without validation errors', function() {
        form = new Form();
        expect(form.hasErrors()).toBe(false);
    });

    describe('bind', function() {
        it('should bind the form to a copy of given object', function() {            
            form = new Form();
            form.bind(data);

            expect(form.data).not.toBe(data);
            expect(form.data).toEqual(data);
        });
    });

    describe('isValid', function() {
        it('should throw error if form is unbound', function() {
            var test = function() { 
                form = new Form();
                form.isValid();
            };

            expect(test).toThrow();
        });

        it('should return true form is bound', function() {
            form = new Form(data);
            expect(form.isValid()).toBe(true);
        });
    });

    describe('applyTo', function() {
        it('should throw error if form is unbound', function() {
            var test = function() {
                form = new Form();
                form.applyTo({});
            };

            expect(test).toThrow();
        });

        it('should merge form data into given object', function() {
            var result = { a: 10, b: "" };
            form = new Form(data);

            form.applyTo(result);

            expect(result).toEqual(data);
        });
    });

    describe('hasErrors', function() {
        it('should return false if there are no validation errors', function() {
            form = new Form(data);
            expect(form.hasErrors()).toBe(false);
        });

        it('should return true if there are validation errors', function() {
            form = new Form(data);
            form._addError('testField', 'required');
            expect(form.hasErrors()).toBe(true);
        });
    });
});