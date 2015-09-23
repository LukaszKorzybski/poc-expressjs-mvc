'use strict';

var errors = require('node-custom-errors'),
    sprintf = require("underscore.string/sprintf");

var ItemNotFoundError = errors.create('ItemNotFoundError', Error, null, false, 
    function(itemType, id, cause) {
        var template = '%s was not found | Id: %s',
            errorMessage = sprintf(template, itemType, id);

        this.name = 'ItemNotFoundError';
        this.message = errorMessage;
        this.cause = cause;
});


module.exports = ItemNotFoundError;