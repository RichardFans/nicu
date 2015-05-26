'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('nicu.directives')
    .directive('headerNotification',function(){
        var controller = ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {
            $scope.logout = function () {
                Auth.logout(function () {
                    $state.go('login');
                });
            };
        }];

        return {
            templateUrl:'scripts/directives/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true,
            controller: controller
        }
    });

