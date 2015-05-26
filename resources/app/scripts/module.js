'use strict';

angular.module('nicu', [
    'ui.router',

    'chart.js',
    'angular-loading-bar',
    'ui.select', 'ngSanitize',
    'ngTable',
    'toaster',

    'nicu.directives',
    'nicu.controllers',
    'nicu.services'
    //'ui.utils',
]);

angular.module('nicu').constant('urls', {
    BASE: 'http://localhost:80',
    BASE_API: 'http://localhost/api/v1'
});

angular.module('nicu.directives', ['ui.bootstrap']);

angular.module('nicu.controllers', []);

angular.module('nicu.services', ['ngResource', 'ngStorage']);

