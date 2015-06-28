var _ = require('lodash');

module.exports.asForm = function() {
    'use strict';
    
    this.data = requestBody || undefined;
    this.errors = {};

    this.bind = function(obj) {
        this.data = _.merge({}, obj);
    };

    this.isValid = function() {
        this._throwErrorIfUnbound();
        return !this.hasErrors();
    };

    this.applyTo = function(obj) {
        this._throwErrorIfUnbound();
        
        _.merge(obj, this.data);
        return obj;
    };

    this.hasErrors = function() {
        var fieldsWithErrors = Object.keys(this.errors);
        return fieldsWithErrors.length > 0;
    };

    this._throwErrorIfUnbound = function() {
        if (!this.data) {
            throw new Error("Cannot apply unbound form.");
        }
    }

    this._addError = function(field, validationError, customMessage) {
        var customisedMessage = customMessage ? customMessage : validationError.message;

        if (!this.errors[field]) {
            this.errors[field] = {};
        }

        this.errors[field][validationError.type] = customisedMessage;
    };
};