'use strict';

angular.module('nicu.services')
    .factory('User', ['$resource', userService]);

function userService($resource) {
    return $resource('/api/v1/users/:id', {}, {
        update: {
            method: 'PUT'
        },
        query: {
            method: 'GET'
        }
    });
}