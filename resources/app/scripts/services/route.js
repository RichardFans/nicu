'use strict';

angular.module('nicu.services')
    .provider('runtimeRoutes', ['$stateProvider', runtimeRoutes]);

function runtimeRoutes($stateProvider) {
    this.$get = function () {
        return {
            add: function (route) {
                $stateProvider.state(route.state, {
                    url: route.url,
                    templateUrl: route.templateUrl,
                    controller: route.controller
                });
            }
        }
    }
}