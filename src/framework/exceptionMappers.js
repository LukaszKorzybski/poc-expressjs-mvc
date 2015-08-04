'use strict';

module.exports = {
    itemNotFoundErrorMapper: function(err, req, res, next) {
        if (err.name == 'ItemNotFoundError') {
            res.status(404).render('404');
        } else {
            next(err);
        }
    }
};