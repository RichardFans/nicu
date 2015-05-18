'use strict';

angular.module('nicu.directives')
    .directive('footer', function () {
        return {
            templateUrl: 'scripts/directives/footer/footer.html',
            restrict: 'E',
            replace: true

        }
    });