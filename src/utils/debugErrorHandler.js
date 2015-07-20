'use strict';

module.exports = function debugErrorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('<pre>' + err.stack + '</pre>');
};