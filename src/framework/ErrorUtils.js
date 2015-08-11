'use strict';

module.exports = function ErrorUtils(logger) {

    this.debugErrorHandler = function(err, req, res, next) {
        var fullStackTrace = this.getFullStackTrace(err);
        logger.error(fullStackTrace);
        res.status(500).send('<!DOCTYPE html><title>Internal Server Error</title><pre>' + fullStackTrace + '</pre>');
    };

    this.productionErrorHandler = function(err, req, res, next) {
        logger.error(this.getFullStackTrace(err));
        res.status(500).render('500');
    };

    this.getFullStackTrace = function(error) {
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
    };   
};