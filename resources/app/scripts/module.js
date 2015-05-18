angular.module('nicu', [
    'ui.router',
    'ngStorage',

    'chart.js',
    'angular-loading-bar',
    'ui.select', 'ngSanitize',
    'ngTable',

    'nicu.directives',
    'nicu.controllers',
    'nicu.services'
    //'ui.utils',
]);

angular.module('nicu.directives', ['ui.bootstrap']);

angular.module('nicu.controllers', []);

angular.module('nicu.services', ['ngResource']);