'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('nicu.directives')
    .directive('advice', function () {
        return {
            templateUrl: 'scripts/directives/main/advice/advice.html',
            restrict: 'E',
            replace: true,
            scope: {
                'warning': '@',
                'danger': '@'
            }
        }
    });