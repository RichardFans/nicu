'use strict';

angular.module('nicu.services')
    .factory('UserType', ['$resource', userTypeService]);

function userTypeService($resource) {
    return $resource('/api/v1/user_types/:id', {}, {
        update: {
            method: 'PUT'
        }
    });
}