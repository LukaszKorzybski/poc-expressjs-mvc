'use strict';

var errorUtils = {
    debugErrorHandler: function(err, req, res, next) {
        var fullStackTrace = errorUtils.getFullStackTrace(err);
        console.error(fullStackTrace);
        res.status(500).send('<!DOCTYPE html><title>Internal Server Error</title><pre>' + fullStackTrace + '</pre>');
    },    
    productionErrorHandler: function(err, req, res, next) {
        console.error(errorUtils.getFullStackTrace(err));
        res.status(500).render('500');
    },
    getFullStackTrace: function(error) {
        var result = '',
            currentError = error;

        while (currentError) {
            if (currentError.stack) {
                result += currentError.stack;
            }
            if (currentError.cause) {
                result += '\nCaused by:\n';
            }

            currentError = currentError.cause;
        };

        return result;
    }
};

module.exports = errorUtils;