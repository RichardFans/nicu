'use strict';

angular.module('nicu.services')
    .factory('Nodes', ['$resource', nodeService]);

function nodeService($resource) {
    return $resource('/api/v1/nodes/:id');
}