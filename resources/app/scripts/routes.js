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

        .state('dashboard.patient-registration', {
            templateUrl: 'views/dashboard/patients-manage/patient-registration.html',
            url: '/patient-registration'
        })
        .state('dashboard.hospitalized-patients-manage', {
            templateUrl: 'views/dashboard/patients-manage/hospitalized-patients-manage.html',
            url: '/hospitalized-patients-manage'
        })
        .state('dashboard.patients-info', {
            templateUrl: 'views/dashboard/patients-manage/patients-info.html',
            url: '/patients-info'
        })

        .state('dashboard.user-profile', {
            templateUrl: 'views/dashboard/user-office/user-profile.html',
            url: '/user-profile'
        })
        .state('dashboard.user-ask4leave', {
            templateUrl: 'views/dashboard/user-office/user-ask4leave.html',
            url: '/user-office'
        })
        .state('dashboard.user-notification', {
            templateUrl: 'views/dashboard/user-office/user-notification.html',
            url: '/user-notification'
        })
        .state('dashboard.user-performance', {
            templateUrl: 'views/dashboard/user-office/user-performance.html',
            url: '/user-performance'
        })

        .state('dashboard.office-ask4leave', {
            templateUrl: 'views/dashboard/office-work/office-ask4leave.html',
            url: '/office-ask4leave'
        })
        .state('dashboard.office-notification', {
            templateUrl: 'views/dashboard/office-work/office-notification.html',
            url: '/office-notification'
        })
        .state('dashboard.office-performance', {
            templateUrl: 'views/dashboard/office-work/office-performance.html',
            url: '/office-performance'
        })
        .state('dashboard.office-mail-list', {
            templateUrl: 'views/dashboard/office-work/office-mail-list.html',
            url: '/office-mail-list'
        })
        .state('dashboard.office-birthday', {
            templateUrl: 'views/dashboard/office-work/office-birthday.html',
            url: '/office-birthday'
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