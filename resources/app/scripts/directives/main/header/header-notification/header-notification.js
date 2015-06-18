'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('nicu.directives')
    .directive('headerNotification',function(){
        var controller = ['$window', '$scope', '$state', 'Auth', function ($window, $scope, $state, Auth) {
            $scope.logout = function () {
                Auth.logout(function () {
                    $state.go('blank');
                });
            };
        }];

        return {
            templateUrl:'scripts/directives/main/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true,
            controller: controller
        }
    });

