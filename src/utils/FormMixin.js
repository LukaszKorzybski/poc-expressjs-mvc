var _ = require('lodash');

var mixInMethods = function(target) {
    'use strict';
    
    target.bind = function(obj) {
        this.data = _.merge({}, obj);
    };

    target.isValid = function() {
        this._throwErrorIfUnbound();
        return !this.hasErrors();
    };

    target.applyTo = function(obj) {
        this._throwErrorIfUnbound();
        
        _.merge(obj, this.data);
        return obj;
    };

    target.hasErrors = function() {
        var fieldsWithErrors = Object.keys(this.errors);
        return fieldsWithErrors.length > 0;
    };

    target._throwErrorIfUnbound = function() {
        if (!this.data) {
            throw new Error("Cannot apply unbound form.");
        }
    }

    target._addError = function(field, validationError, customMessage) {
        var customisedMessage = customMessage ? customMessage : validationError.message;

        if (!this.errors[field]) {
            this.errors[field] = {};
        }

        this.errors[field][validationError.type] = customisedMessage;
    }
};

var FormMixin = function(requestBody) {
    'use strict';
    
    this.data = requestBody || undefined;
    this.errors = {};    
    
    mixInMethods(this);
};

FormMixin.methods = mixInMethods({});

module.exports = FormMixin;