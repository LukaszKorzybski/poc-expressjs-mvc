'use strict';

var exceptionMappers = {
    itemNotFoundErrorMapper: function(err, req, res, next) {
        if (err.name == 'ItemNotFoundError') {
            res.status(404).render('404');
        } else {
            next(err);
        }
    }
};

module.exports = {
    register: function(app) {
        var mapperNames = Object.keys(exceptionMappers);
        mapperNames.forEach(function(mapperName) {
            app.use(exceptionMappers[mapperName]);
        });
    }
};