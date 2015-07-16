'use strict';
var _ = require('lodash');

function Form(requestBody) {     
    this.data = requestBody || undefined;
    this.errors = {};        
};

var proto = Form.prototype;

proto.bind = function(obj) {
    this.data = _.merge({}, obj);
};

proto.isValid = function() {
    this._throwErrorIfUnbound();
    return !this.hasErrors();
};

proto.applyTo = function(obj) {
    this._throwErrorIfUnbound();
    
    _.merge(obj, this.data);
    return obj;
};

proto.hasErrors = function() {
    var fieldsWithErrors = Object.keys(this.errors);
    return fieldsWithErrors.length > 0;
};

proto._throwErrorIfUnbound = function() {
    if (!this.data) {
        throw new Error("Cannot apply unbound form.");
    }
};

proto._addError = function(field, validationError, customMessage) {
    var customisedMessage = customMessage ? customMessage : validationError.message;

    if (!this.errors[field]) {
        this.errors[field] = {};
    }

    this.errors[field][validationError.type] = customisedMessage;
};

module.exports = Form;