'use strict';

angular.module('nicu')
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', MainRouter]);

function MainRouter($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/app/home');

    $stateProvider
        //主页
        .state('app', {
            url: '/app',
            templateUrl: 'views/categories/main.html',
            controller: 'MainCtrl',
            data: {
                requireLogin: true
            }
        })
        .state('app.home', {
            url: '/home',
            templateUrl: 'views/categories/home.html ',
            controller: 'HomeCtrl'
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
                'responseError': function (response) {
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