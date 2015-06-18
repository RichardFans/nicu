'use strict';

angular.module('nicu.directives')
    .directive('footer', function () {
        return {
            templateUrl: 'scripts/directives/main/footer/footer.html',
            restrict: 'E',
            replace: true

        }
    });