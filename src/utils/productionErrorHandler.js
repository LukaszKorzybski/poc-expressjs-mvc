'use strict';

module.exports = function productionErrorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('500');
};