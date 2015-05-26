'use strict';

angular.module('nicu')
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', MainRouter]);

function MainRouter($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
        //主页
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/main.html',
            data: {
                requireLogin: true
            }
        })
        .state('dashboard.home', {
            url: '/home',
            templateUrl: 'views/dashboard/home.html ',
            controller: 'HomeCtrl'
        })

        //远程医疗
        .state('dashboard.remote-transfer', {
            templateUrl: 'views/dashboard/remote-hospital/transfer-request.html',
            url: '/transfer-request'
        })
        .state('dashboard.remote-evaluate', {
            templateUrl: 'views/dashboard/remote-hospital/evaluate-request.html',
            url: '/evaluate-request'
        })

        //病人管理
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
        .state('dashboard.work-report', {
            templateUrl: 'views/dashboard/patients-manage/work-report.html',
            url: '/work-report'
        })

        //个人中心
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

        //办公管理
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
        .state('dashboard.office-employee-info', {
            templateUrl: 'views/dashboard/office-work/office-employee-info.html',
            url: '/office-employee-info'
        })

        //统计分析
        .state('dashboard.statistics-quality', {
            templateUrl: 'views/dashboard/statistics/statistics-quality.html',
            url: '/statistics-quality'
        })
        .state('dashboard.statistics-hospital', {
            templateUrl: 'views/dashboard/statistics/statistics-hospital.html',
            url: '/statistics-hospital'
        })
        .state('dashboard.statistics-others', {
            templateUrl: 'views/dashboard/statistics/statistics-others.html',
            url: '/statistics-others'
        })

        //系统管理
        .state('dashboard.system-employee', {
            templateUrl: 'views/dashboard/system/employee-manage.html',
            url: '/system-employee'
        })
        .state('dashboard.system-hospital', {
            templateUrl: 'views/dashboard/system/hospital-manage.html',
            url: '/system-hospital'
        })
        .state('dashboard.system-office', {
            templateUrl: 'views/dashboard/system/office-manage.html',
            url: '/system-office'
        })
        .state('dashboard.custom-report', {
            templateUrl: 'views/dashboard/system/custom-report.html',
            url: '/custom-report'
        })

        //登录
        .state('login', {
            templateUrl: 'views/pages/login.html',
            url: '/login',
            controller: 'LoginCtrl',
            data: {
                requireLogin: false
            }
        });

    $httpProvider.interceptors.push(['$timeout', '$q', '$injector', 'Perference',
        function ($timeout, $q, $injector, Perference) {
            var $state;

            $timeout(function () {
                $state = $injector.get('$state');
            });

            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if (Perference.hasToken()) {
                        config.headers.Authorization = 'Bearer ' + Perference.getToken();
                    }
                    return config;
                },
                'requestError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        Perference.deleteToken();
                        $state.go('login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
}

angular.module('nicu').run(['$rootScope', '$state', 'Perference',
    function ($rootScope, $state, Perference) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            var requireLogin = toState.data.requireLogin;
            //console.log('yyy: ' + toState.url);
            if (requireLogin && !Perference.hasToken()) {
                event.preventDefault();
                //console.log('xxx');
                $state.go('login');
            }
        });
    }]);