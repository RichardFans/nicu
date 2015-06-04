'use strict';

angular.module('nicu.services')
    .factory('Category', ['$resource', categoryService]);

function categoryService($resource) {
    return $resource('/api/v1/categories/:id');
}