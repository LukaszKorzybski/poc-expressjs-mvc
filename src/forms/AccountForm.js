'use strict';
var util = require('util'),
    _ = require('lodash'),
    validator = require('validator'),
    validationErrors = require('../utils/validationErrors'),
    Form = require('../utils/Form');
    
function AccountForm(requestBody) {
    Form.apply(this, [requestBody]);

    this.bind = function(obj) {
        AccountForm.super_.prototype.bind.apply(this, [obj]);
        this.data.height = obj.height * 100;
    };

    this.isValid = function() {
        this._throwErrorIfUnbound();

        !validator.isNull(this.data.username) || this._addError('username', validationErrors.required);
        !validator.isNull(this.data.height) || this._addError('height', validationErrors.required);
        validator.isInt(this.data.height) || this._addError('height', validationErrors.integer);
                    
        return !this.hasErrors();
    };

    this.applyTo = function(obj) {
        AccountForm.super_.prototype.applyTo.apply(this, [obj]);

        obj.height = validator.toInt(this.data.height) / 100;
        
        return obj;
    };
};

util.inherits(AccountForm, Form);

module.exports = AccountForm;