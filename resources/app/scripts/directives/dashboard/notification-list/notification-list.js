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

