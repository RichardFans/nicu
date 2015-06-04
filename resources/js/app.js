$(function() {
    $('#side-menu').metisMenu();
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function () {
    $(window).bind("load resize", function () {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

});
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
'use strict';

angular.module('nicu.controllers')
    .controller('HomeCtrl', ['$scope', '$location', '$filter',  'NgTableParams', HomeCtrl]);

function HomeCtrl($scope, $location, $filter, NgTableParams) {

}
'use strict';

angular.module('nicu.controllers')
    .controller('LoginCtrl', ['$scope', '$state', 'toaster',
        'Nodes', 'Auth', 'Perference', LoginCtrl]);
//$sessionStorage
function LoginCtrl($scope, $state, toaster, Nodes, Auth, Perference) {
    function successAuth(data) {
        Perference.setToken(data.token, $scope.auto_login);
        Perference.setUser($scope.user);
        $state.go('app.home');
    }

    $scope.auto_login = Perference.isAutoLogin();
    $scope.user = Perference.getUser();

    $scope.nodes = Nodes.query(function () {
        if ($scope.user.node == null) {
            $scope.user.node = $scope.nodes[0];
        }
    });

    $scope.loginForm = function () {
        if ($scope.login_form.$valid) {
            //alert('你的login： name = ' + $scope.user.username + ', password = ' + $scope.user.password +
            //', node = ' + $scope.user.node.id);
            Auth.login($scope.user, successAuth, function (data, status) {
                if (status == 401) {
                    toaster.pop('error', '用户名或密码错误', '');
                } else if (status == 500) {
                    toaster.pop('error', '服务器错误', '');
                }
            });
        } else {
            $scope.login_form.submitted = true;
        }
    }
}

'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('nicu.controllers')
    .controller('MainCtrl', ['$scope', MainCtrl]);

function MainCtrl($scope) {


}
'use strict';

angular.module('nicu.services')
    .factory('Auth', ['$http', 'urls', 'Perference', authService]);

function authService($http, urls, Perference) {
    return {
        register: function (data, success, error) {
            $http.post(urls.BASE + '/auth/register', data).success(success).error(error)
        },
        login: function (data, success, error) {
            $http.post(urls.BASE + '/auth/login', data).success(success).error(error)
        },
        logout: function (success) {
            Perference.deleteToken();
            success();
        }
    };
}
'use strict';

angular.module('nicu.services')
    .factory('Category', ['$resource', categoryService]);

function categoryService($resource) {
    return $resource('/api/v1/categories/:id');
}
'use strict';

angular.module('nicu.services')
    .factory('Nodes', ['$resource', nodeService]);

function nodeService($resource) {
    return $resource('/api/v1/nodes/:id');
}
'use strict';

angular.module('nicu.services')
    .factory('Perference', ['$sessionStorage', '$localStorage', perferenceService]);

function perferenceService($sessionStorage, $localStorage) {
    return {
        setUser: function (user) {
            $localStorage.user = {username: user.username, node: user.node};
        },
        getUser: function () {
            return $localStorage.user == null ? {} : $localStorage.user;
        },

        isAutoLogin: function () {
            return $localStorage.auto_login;
        },
        setToken: function (token, auto_login) {
            $localStorage.auto_login = auto_login;
            if (auto_login) {
                $localStorage.token = token;
            } else {
                $sessionStorage.token = token;
            }
        },
        getToken: function () {
            var auto_login = $localStorage.auto_login;
            if (auto_login) {
                return $localStorage.token;
            } else {
                return $sessionStorage.token;
            }
        },
        hasToken: function () {
            var token;
            var auto_login = $localStorage.auto_login;
            if (auto_login) {
                token = $localStorage.token;
            } else {
                token = $sessionStorage.token;
            }
            return token != null;
        },
        deleteToken: function (success) {
            delete $localStorage.token;
            delete $sessionStorage.token;
        }
    };
}
'use strict';

angular.module('nicu.services')
    .factory('Permission', ['$resource', permService]);

function permService($resource) {
    return $resource('/api/v1/permissions/:id');
}
'use strict';

angular.module('nicu.services')
    .provider('runtimeRoutes', ['$stateProvider', runtimeRoutes]);

function runtimeRoutes($stateProvider) {
    this.$get = function () {
        return {
            add: function (route) {
                $stateProvider.state(route.state, {
                    url: route.url,
                    templateUrl: route.templateUrl,
                    controller: route.controller
                });
            }
        }
    }
}
'use strict';

angular.module('nicu.controllers')
    .controller('WorkloadCtrl', ['$scope', WorkloadCtrl]);

function WorkloadCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('EmployeeInfoCtrl', ['$scope', EmployeeInfoCtrl]);

function EmployeeInfoCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('LeaveVerifyCtrl', ['$scope', LeaveVerifyCtrl]);

function LeaveVerifyCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('OfficeNotifyCtrl', ['$scope', OfficeNotifyCtrl]);

function OfficeNotifyCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('PerManageCtrl', ['$scope', PerManageCtrl]);

function PerManageCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('PerVerifyCtrl', ['$scope', PerVerifyCtrl]);

function PerVerifyCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('PatientsDetailCtrl', ['$scope', PatientsDetailCtrl]);

function PatientsDetailCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('PatientsInCtrl', ['$scope', PatientsInCtrl]);

function PatientsInCtrl($scope) {

}
'use strict';

angular.module('nicu.controllers')
    .controller('PatientsOutCtrl', ['$scope', PatientsOutCtrl]);

function PatientsOutCtrl($scope) {

}
'use strict';

angular.module('nicu.controllers')
    .controller('PatientsRegCtrl', ['$scope', PatientsRegCtrl]);

function PatientsRegCtrl($scope) {

}
'use strict';

angular.module('nicu.controllers')
    .controller('PatientsReportCtrl', ['$scope', PatientsReportCtrl]);

function PatientsReportCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('UserAsk4leaveCtrl', ['$scope', UserAsk4leaveCtrl]);

function UserAsk4leaveCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('UserNotifyCtrl', ['$scope', UserNotifyCtrl]);

function UserNotifyCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('UserPerCtrl', ['$scope', UserPerCtrl]);

function UserPerCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('UserProfileCtrl', ['$scope', UserProfileCtrl]);

function UserProfileCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('RemoteApplyCtrl', ['$scope', RemoteApplyCtrl]);

function RemoteApplyCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('RemoteVerifyCtrl', ['$scope', RemoteVerifyCtrl]);

function RemoteVerifyCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('BasicCtrl', ['$scope', BasicCtrl]);

function BasicCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('CustomReportCtrl', ['$scope', CustomReportCtrl]);

function CustomReportCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('EmployeeCtrl', ['$scope', EmployeeCtrl]);

function EmployeeCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('OfficeCtrl', ['$scope', OfficeCtrl]);

function OfficeCtrl($scope) {

}


'use strict';

angular.module('nicu.controllers')
    .controller('QualityCtrl', ['$scope', QualityCtrl]);

function QualityCtrl($scope) {

}


'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('nicu.directives')
    .directive('advice', function () {
        return {
            templateUrl: 'scripts/directives/design/advice.html',
            restrict: 'E',
            replace: true,
            scope: {
                'warning': '@',
                'danger': '@'
            }
        }
    });
'use strict';

angular.module('nicu.directives')
    .directive('footer', function () {
        return {
            templateUrl: 'scripts/directives/footer/footer.html',
            restrict: 'E',
            replace: true

        }
    });
'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('nicu.directives')
    .directive('header', function () {
        return {
            templateUrl: 'scripts/directives/header/header.html',
            restrict: 'E',
            replace: true
        }
    });
'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('nicu.directives')
    .directive('sidebar', ['$location', function () {
        return {
            templateUrl: 'scripts/directives/sidebar/sidebar.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($scope, runtimeRoutes, Category) {
                $scope.collapseVar = 0;
                $scope.check = function (x) {
                    if (x == $scope.collapseVar) {
                        $scope.collapseVar = 0;
                    } else {
                        $scope.collapseVar = x;
                    }
                };

                console.log('sidebar...');
                $scope.loadRoutes = function (nodes) {
                    for (var i = 0; i < nodes.length; i++) {
                        var node = nodes[i];
                        if (node.route) {
                            runtimeRoutes.add(node.route);
                        }
                        if (node.children && node.children.length > 0) {
                            $scope.loadRoutes(node.children);
                        }
                    }
                }

                $scope.category = Category.get({id: 1}, function () {
                    $scope.loadRoutes($scope.category[1].children);
                });

            }
        }
    }]);
'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('nicu.directives')
    .directive('notificationList', function () {
        var controller = ['$scope', '$q', '$filter', 'NgTableParams',
            function ($scope, $q, $filter, NgTableParams) {
                var data = [
                    {title: '中秋节放假通知', type: '普通消息', published_at: '2015-5-5', published_by: '王小东'},
                    {title: '习近平总书记发表重要讲话', type: '重要通知', published_at: '2015-5-1', published_by: '曾小贤'},
                    {title: '妇女节放假通知', type: '普通消息', published_at: '2015-4-3', published_by: '王小东'},
                    {title: '邹省长前来视察', type: '紧急通知', published_at: '2015-3-5', published_by: '王小东'},
                    {title: 'ICU病房管理须知', type: '科室文件', published_at: '2015-3-5', published_by: '王小东'},
                    {title: '党员学习2009', type: '普通消息', published_at: '2009-2-5', published_by: '谢亚丽'},
                    {title: '党员学习2010', type: '普通消息', published_at: '2010-2-5', published_by: '谢亚丽'},
                    {title: '党员学习2011', type: '普通消息', published_at: '2011-2-5', published_by: '谢亚丽'},
                    {title: '党员学习2012', type: '普通消息', published_at: '2012-4-5', published_by: '谢亚丽'},
                    {title: '党员学习2013', type: '普通消息', published_at: '2013-5-5', published_by: '谢亚丽'},
                    {title: '党员学习2014', type: '普通消息', published_at: '2014-1-5', published_by: '谢亚丽'},
                    {title: '外卖及联系方式', type: '普通消息', published_at: '2014-1-29', published_by: '高明张'},
                    {title: '科室通讯录2015', type: '科室文件', published_at: '2015-3-5', published_by: '王小东'},
                    {title: '科室通讯录2014', type: '科室文件', published_at: '2014-3-5', published_by: '谢亚丽'},
                    {title: '科室通讯录2013', type: '科室文件', published_at: '2013-3-5', published_by: '王小东'},
                    {
                        title: '科室通讯录2012',
                        type: '科室文件',
                        published_at: '2012-3-5',
                        published_by: '王小东'
                    }
                ];

                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: 4,
                    filter: {},
                    sorting: {
                        published_at: 'desc'     // initial sorting
                    }
                }, {
                    total: data.length,
                    getData: function ($defer, params) {
                        var filteredData = params.filter() ?
                            $filter('filter')(data, params.filter()) :
                            data;
                        var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            data;
                        params.total(orderedData.length);
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(),
                            params.page() * params.count()));
                    }
                });

                var inArray = Array.prototype.indexOf ?
                    function (val, arr) {
                        return arr.indexOf(val)
                    } :
                    function (val, arr) {
                        var i = arr.length;
                        while (i--) {
                            if (arr[i] === val) return i;
                        }
                        return -1
                    };
                $scope.types = function() {
                    var def = $q.defer(),
                        arr = [],
                        filer = [];
                    angular.forEach(data, function(item){
                        if (inArray(item.type, arr) === -1) {
                            arr.push(item.type);
                            filer.push({
                                'id': item.type,
                                'title': item.type
                            });
                        }
                    });
                    def.resolve(filer);
                    return def;
                };
                $scope.publishers = function() {
                    var def = $q.defer(),
                        arr = [],
                        filer = [];
                    angular.forEach(data, function(item){
                        if (inArray(item.published_by, arr) === -1) {
                            arr.push(item.published_by);
                            filer.push({
                                'id': item.published_by,
                                'title': item.published_by
                            });
                        }
                    });
                    def.resolve(filer);
                    return def;
                };

                $scope.show = function(title) {
                    alert('title: ' + title);
                };

            }];

        return {
            templateUrl: 'scripts/directives/dashboard/notification-list/notification-list.html',
            restrict: 'E',
            replace: true,
            scope: {
                //'model': '=',
                //'comments': '@',
            },
            controller: controller

        }
    });


'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('nicu.directives')
    .directive('stats', function () {
        return {
            templateUrl: 'scripts/directives/dashboard/stats/stats.html',
            restrict: 'E',
            replace: true,
            scope: {
                'model': '=',
                'comments': '@',
                'number': '@',
                'name': '@',
                'colour': '@',
                'details': '@',
                'type': '@'
            }

        }
    });
'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('nicu.directives')
    .directive('headerNotification',function(){
        var controller = ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {
            $scope.logout = function () {
                Auth.logout(function () {
                    $state.go('login');
                });
            };
        }];

        return {
            templateUrl:'scripts/directives/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true,
            controller: controller
        }
    });


'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('nicu')
    .directive('sidebarSearch',function() {
        return {
            templateUrl:'scripts/directives/sidebar/sidebar-search/sidebar-search.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            controller:function($scope){
                $scope.selectedMenu = 'home';
            }
        }
    });