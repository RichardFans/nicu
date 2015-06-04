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
            controller: function ($scope, runtimeRoutes, Category) {
                $scope.collapseVar = 0;
                $scope.check = function (x) {
                    if (x == $scope.collapseVar) {
                        $scope.collapseVar = 0;
                    } else {
                        $scope.collapseVar = x;
                    }
                };

                console.log('sidebar...');
                $scope.loadRoutes = function (nodes) {
                    for (var i = 0; i < nodes.length; i++) {
                        var node = nodes[i];
                        if (node.route) {
                            runtimeRoutes.add(node.route);
                        }
                        if (node.children && node.children.length > 0) {
                            $scope.loadRoutes(node.children);
                        }
                    }
                }

                $scope.category = Category.get({id: 1}, function () {
                    $scope.loadRoutes($scope.category[1].children);
                });

            }
        }
    }]);