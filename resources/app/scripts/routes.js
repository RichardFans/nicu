'use strict';

angular.module('nicu')
    .config(['$stateProvider', '$urlRouterProvider', MainRouter]);

function MainRouter($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/main.html'
        })
        .state('dashboard.home', {
            url: '/home',
            templateUrl: 'views/dashboard/home.html ',
            controller: 'HomeCtrl'
        })
        .state('dashboard.form', {
            templateUrl: 'views/form.html',
            url: '/form'
        })
        .state('dashboard.blank', {
            templateUrl: 'views/pages/blank.html',
            url: '/blank'
        })
        .state('dashboard.chart', {
            templateUrl: 'views/chart.html',
            url: '/chart',
            controller: 'ChartCtrl'
        })
        .state('dashboard.table', {
            templateUrl: 'views/table.html',
            url: '/table'
        })
        .state('dashboard.panels-wells', {
            templateUrl: 'views/ui-elements/panels-wells.html',
            url: '/panels-wells'
        })
        .state('dashboard.buttons', {
            templateUrl: 'views/ui-elements/buttons.html',
            url: '/buttons'
        })
        .state('dashboard.notifications', {
            templateUrl: 'views/ui-elements/notifications.html',
            url: '/notifications'
        })
        .state('dashboard.typography', {
            templateUrl: 'views/ui-elements/typography.html',
            url: '/typography'
        })
        .state('dashboard.icons', {
            templateUrl: 'views/ui-elements/icons.html',
            url: '/icons'
        })
        .state('dashboard.grid', {
            templateUrl: 'views/ui-elements/grid.html',
            url: '/grid'
        })
        .state('login', {
            templateUrl: 'views/pages/login.html',
            url: '/login',
            controller: 'LoginCtrl'
        })


}