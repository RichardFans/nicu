'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('nicu.directives')
    .directive('breadcrumb', function () {
        return {
            templateUrl: 'scripts/directives/main/breadcrumb/breadcrumb.html',
            restrict: 'E',
            replace: true,
            scope: {
                'current': '@',
                'parent': '@'
            }
        }
    });