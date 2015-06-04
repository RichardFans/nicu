'use strict';

angular.module('nicu.services')
    .factory('Permission', ['$resource', permService]);

function permService($resource) {
    return $resource('/api/v1/permissions/:id');
}