'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('nicu.directives')
    .directive('sidebar', ['$location', function () {
        return {
            templateUrl: 'scripts/directives/sidebar/sidebar.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($scope) {
                $scope.collapseVar = 0;
                $scope.lastCollapseVar = 0;
                $scope.multiCollapseVar = 0;

                $scope.check = function (x) {
                    $scope.collapseVar = x;
                    $scope.lastCollapseVar = x;
                };

                $scope.expansion = function (x) {
                    $scope.collapseVar = x;
                };

                $scope.collapse = function ($event) {
                    if (!$event.currentTarget.querySelector('.active')) {
                        $scope.collapseVar = $scope.lastCollapseVar;
                    } else {
                        $scope.lastCollapseVar = $scope.collapseVar;
                    }
                };

                $scope.multiCheck = function (y) {
                    if (y == $scope.multiCollapseVar)
                        $scope.multiCollapseVar = 0;
                    else
                        $scope.multiCollapseVar = y;
                };
            }
        }
    }]);