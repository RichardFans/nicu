'use strict';

angular.module('nicu.services')
    .factory('Role', ['$resource', roleService]);

function roleService($resource) {
    return $resource('/api/v1/roles/:id', {}, {
        update: {
            method: 'PUT'
        }
    });
}