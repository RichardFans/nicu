'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('nicu.directives')
    .directive('header', function () {
        return {
            templateUrl: 'scripts/directives/header/header.html',
            restrict: 'E',
            replace: true
        }
    });