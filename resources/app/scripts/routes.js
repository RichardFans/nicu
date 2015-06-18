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
            resolve: {
                window: ['$window', function ($window) {
                    return $window;
                }]
            },
            controller: 'MainCtrl',
            //目前能实现注销后路由状态重载的办法，但会引起页面刷新（bad！）
            //关注：https://github.com/angular-ui/ui-router/issues/1095
            onExit: function (window) {
                window.location.reload();
            },
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
        })
        .state('blank', {
            templateUrl: 'views/pages/blank.html',
            url: '/blank',
            data: {
                requireLogin: false
            },
            resolve: {
                timeout: ['$timeout', function ($timeout) {
                    return $timeout;
                }]
            },
            onEnter: function (timeout) {
                timeout(function () {
                    var url = "http://" + window.location.host + "/#/login";
                    console.log('url = ' + url);
                    window.location.href = url;
                }, 200, true);
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
angular.module('nicu')
    .config(['dialogsProvider', '$translateProvider', function (dialogsProvider, $translateProvider) {
        dialogsProvider.useBackdrop('static');
        dialogsProvider.useEscClose(true);
        dialogsProvider.useCopy(false);
        dialogsProvider.setSize('sm');

        $translateProvider.preferredLanguage('zh-CN');
    }]);


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