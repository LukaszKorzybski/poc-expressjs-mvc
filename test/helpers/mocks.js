'use strict';

module.exports = {
    response: function() {
        var response = jasmine.createSpyObj('response', ['send', 'status', 'render']);

        response.status.and.returnValue(response);
        return response;
    },
    unirestResponse: function() {
        return {};
    },
    next: function() {
        return jasmine.createSpy('next');
    }
};