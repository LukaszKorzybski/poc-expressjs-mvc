var _ = require('lodash'),
    validator = require('validator'),
    FormMixin = require('../utils/formMixin'),    
    validationErrors = require('../utils/validationErrors');

module.exports = function Form(requestBody) {
    'use strict';    

    throw new Error("sadu");

    FormMixin.apply(this, [requestBody]);
    var formMethods = new FormMixin.methods;

    this.bind = function(obj) {
        formMethods.bind.apply(this, [obj]);
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
        this._throwErrorIfUnbound();

        formMethods.applyTo.apply(this, [obj]);
        obj.height = validator.toInt(this.data.height) / 100;
        
        return obj;
    };
};