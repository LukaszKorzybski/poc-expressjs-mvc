var _ = require('lodash'),
    validator = require('validator'),
    validationErrors = require('../utils/validationErrors');

module.exports = function Form(requestBody) {
    'use strict';

    this.data = requestBody || undefined;
    this.errors = {};

    this.bind = function(obj) {
        this.data = _.merge({}, obj);
        this.data.height = obj.height * 100;
    };

    this.isValid = function() {
        if (!this.data) {
            throw new Error("Cannot validate unbound form.");
        }

        !validator.isNull(this.data.username) || this._addError('username', validationErrors.required);
        !validator.isNull(this.data.height) || this._addError('height', validationErrors.required);
        validator.isInt(this.data.height) || this._addError('height', validationErrors.integer);
                    
        return !this.hasErrors();
    };

    this.applyTo = function(obj) {
        if (!this.data) {
            throw new Error("Cannot apply unbound form.");
        }

        obj.username = this.data.username;
        obj.height = validator.toInt(this.data.height) / 100;
        obj.email = this.data.email;

        return obj;
    };

    this.hasErrors = function() {
        var fieldsWithErrors = Object.keys(this.errors);            
        return fieldsWithErrors.length > 0;                
    };

    this._addError = function(field, validationError, customMessage) {
        var customisedMessage = customMessage ? customMessage : validationError.message;

        if (!this.errors[field]) {
            this.errors[field] = {};
        }

        this.errors[field][validationError.type] = customisedMessage;
    };
};