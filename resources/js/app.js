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
'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('nicu.controllers')
    .controller('ChartCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.line = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            series: ['Series A', 'Series B'],
            data: [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ],
            onClick: function (points, evt) {
                console.log(points, evt);
            }
        };

        $scope.bar = {
            labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
            series: ['Series A', 'Series B'],

            data: [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ]

        };

        $scope.donut = {
            labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
            data: [300, 500, 100]
        };

        $scope.radar = {
            labels:["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],

            data:[
                [65, 59, 90, 81, 56, 55, 40],
                [28, 48, 40, 19, 96, 27, 100]
            ]
        };

        $scope.pie = {
            labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
            data : [300, 500, 100]
        };

        $scope.polar = {
            labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
            data : [300, 500, 100, 40, 120]
        };

        $scope.dynamic = {
            labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
            data : [300, 500, 100, 40, 120],
            type : 'PolarArea',

            toggle : function ()
            {
                this.type = this.type === 'PolarArea' ?
                    'Pie' : 'PolarArea';
            }
        };
    }]);
'use strict';

angular.module('nicu.controllers')
    .controller('HomeCtrl', ['$scope', '$location', '$filter',  'NgTableParams', HomeCtrl]);

function HomeCtrl($scope, $location, $filter, NgTableParams) {

}
'use strict';

angular.module('nicu.controllers')
    .controller('LoginCtrl', ['$scope', 'Nodes', LoginCtrl]);

function LoginCtrl($scope, Nodes) {
    $scope.user = {};
    $scope.nodes = Nodes.query(function () {
        $scope.user.node = $scope.nodes[0];
    });

    $scope.loginForm = function() {
        if ($scope.login_form.$valid) {
            alert('你的login： name = ' + $scope.user.username + ', password = ' + $scope.user.password );
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
    .controller('MainCtrl', function ($scope, $position) {
    });
'use strict';

angular.module('nicu.services')
    .factory('Nodes', ['$resource', nodeService]);

function nodeService($resource) {
    return $resource('/api/v1/nodes/:id');
}
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
            controller: function ($scope) {
                $scope.collapseVar = 0;
                $scope.lastCollapseVar = 0;
                $scope.multiCollapseVar = 0;

                $scope.check = function (x) {
                    $scope.collapseVar = x;
                    $scope.lastCollapseVar = x;
                };

                $scope.expansion = function (x) {
                    $scope.collapseVar = x;
                };

                $scope.collapse = function ($event) {
                    if (!$event.currentTarget.querySelector('.active')) {
                        $scope.collapseVar = $scope.lastCollapseVar;
                    } else {
                        $scope.lastCollapseVar = $scope.collapseVar;
                    }
                };

                $scope.multiCheck = function (y) {
                    if (y == $scope.multiCollapseVar)
                        $scope.multiCollapseVar = 0;
                    else
                        $scope.multiCollapseVar = y;
                };
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
                    console.log('hello');
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
        return {
            templateUrl:'scripts/directives/header/header-notification/header-notification.html',
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