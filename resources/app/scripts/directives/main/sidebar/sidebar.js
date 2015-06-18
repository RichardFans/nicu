'use strict';

angular.module('nicu.directives')
    .directive('sidebar', [function () {
        return {
            templateUrl: 'scripts/directives/main/sidebar/sidebar.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($rootScope, $scope, $state, runtimeRoutes, Category) {
                $rootScope.collapseVar = 0;
                $scope.check = function (x) {
                    if (x == $rootScope.collapseVar) {
                        $rootScope.collapseVar = 0;
                    } else {
                        $rootScope.collapseVar = x;
                    }
                };

                console.log('sidebar...');
                $scope.loadRoutes = function (nodes) {
                    for (var i = 0; i < nodes.length; i++) {
                        var node = nodes[i];
                        if (node.route) {
                            //ui-router注销后路由无法实现路由清除,因此存在安全隐患
                            //下面这个做法是牺牲安全性来保障用户体验
                            //另一种解决办法见routes.js
                            //请关注：https://github.com/angular-ui/ui-router/issues/1095
                            //var state = $state.get(node.route.state);
                            //if (state == null) {
                            runtimeRoutes.add(node.route);
                            //}
                        }
                        if (node.children && node.children.length > 0) {
                            $scope.loadRoutes(node.children);
                        }
                    }
                }

                Category.get({id: 1}).$promise.then(function (data) {
                    console.log('Category get: ' + data);
                    $scope.loadRoutes(data[1].children);
                    $scope.category = data;
                }, function(error) {
                    console.log('Category get error: ' + error);
                });

            }
        }
    }]);