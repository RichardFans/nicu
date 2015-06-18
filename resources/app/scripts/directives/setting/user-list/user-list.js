'use strict';

angular.module('nicu.directives')
    .directive('userList', function () {
        var controller = ['$scope', '$q', '$filter', '$modal', 'toaster', 'NgTableParams', 'User', 'Perference',
            function ($scope, $q, $filter, $modal, toaster, NgTableParams, User, Perference) {
                var sexes = ['男', '女', '未知'];
                var eduLvs = ['博研', '硕研', '普本', '成本', '大专', '中专', '高中', '其它'];
                var titles = ['高级', '副高', '中级', '初级', '其它'];
                var yesOrNo = ['是', '否'];

                var getSelectOptions = function (data) {
                    var def = $q.defer(),
                        outer = [];
                    angular.forEach(data, function (item) {
                        outer.push({
                            'id': item,
                            'title': item
                        });
                    });
                    def.resolve(outer);
                    return def;
                }
                $scope.roles_def = $q.defer();

                $scope.cols = [
                    {title: '姓名', sortable: 'name', filter: {name: 'text'}, show: true, field: 'name'},
                    /* 账户信息 */
                    {title: '用户名', sortable: 'username', filter: {name: 'text'}, show: true, field: 'username'},
                    {title: '上次登录ip', sortable: 'last_ip', filter: {name: 'text'}, show: true, field: 'last_ip'},
                    {title: '上次登录时间', sortable: 'last_time', filter: {name: 'text'}, show: true, field: 'last_ip'},
                    {title: '登录次数', sortable: 'login_count', filter: {name: 'text'}, show: true, field: 'login_count'},
                    /* 基本信息 */
                    {
                        title: '性别',
                        sortable: 'sex',
                        filter: {name: 'select'},
                        filterData: getSelectOptions(sexes),
                        show: true,
                        field: 'sex'
                    },
                    {title: '出生年月', sortable: 'birthday', filter: {name: 'text'}, show: true, field: 'birthday'},
                    {
                        title: '最高学历',
                        sortable: 'edu_level',
                        filter: {name: 'select'},
                        filterData: getSelectOptions(eduLvs),
                        show: true,
                        field: 'edu_level'
                    },

                    /* 联系方式 */
                    {title: '邮箱', sortable: 'email', filter: {name: 'text'}, show: true, field: 'email'},
                    {title: '电话号码', sortable: 'phone', filter: {name: 'text'}, show: true, field: 'phone'},

                    /* 工作相关 */
                    {
                        title: '职称',
                        sortable: 'title',
                        filter: {name: 'select'},
                        filterData: getSelectOptions(titles),
                        show: true,
                        field: 'title'
                    },
                    {title: '职务', sortable: 'post', filter: {name: 'text'}, show: true, field: 'post'},
                    {
                        title: '是否有执照',
                        sortable: 'is_licensed',
                        filter: {name: 'select'},
                        filterData: getSelectOptions(yesOrNo),
                        show: true,
                        field: 'email'
                    },
                    {title: '入科时间', sortable: 'entry_time', filter: {name: 'text'}, show: true, field: 'entry_time'},
                    {
                        title: '员工分类',
                        sortable: 'type_id',
                        filter: {name: 'text'},
                        filterData: $scope.roles_def,
                        show: true,
                        field: 'type_id'
                    },

                ];

                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: 10,
                    sorting: {
                        //parent_id: 'asc'     // initial sorting
                    }
                }, {
                    counts: [5, 10, 15],
                    total: 0,
                    getData: function ($defer, params) {
                        User.query(function (data) {
                            console.log('User query');

                            var roles = Perference.getSelectOptions(data.roles, 'display_name');
                            $scope.roles_def.resolve(roles);

                            data = data.users;

                            params.total(data.length);

                            data = params.filter() ?
                                $filter('filter')(data, params.filter()) :
                                data;

                            data = params.sorting() ?
                                $filter('orderBy')(data, params.orderBy()) :
                                data;

                            $defer.resolve(data.slice((params.page() - 1) * params.count(),
                                params.page() * params.count()));

                        });
                    }
                });

                $scope.add = function () {
                    //var modalInstance = $modal.open({
                    //    templateUrl: 'UserDlg.html',
                    //    controller: 'UserDlgCtrl',
                    //    resolve: {
                    //        parents: function () {
                    //            return $scope.parents;
                    //        },
                    //        toaster: function () {
                    //            return toaster;
                    //        }
                    //    }
                    //});
                    //
                    //modalInstance.result.then(function (type) {
                    //    User.save(type).$promise.then(function (success) {
                    //        console.log('add success: ' + success);
                    //        $scope.tableParams.reload();
                    //    }, function (error) {
                    //        console.log('add error: ' + error);
                    //    });
                    //});
                }

                $scope.edit = function (type) {
                    //type.$edit = true;
                    //type.$nameChanged = type.name;
                    //type.$parentChanged = type.parent;
                    //$scope.parents_list = Perference.except(type.id, $scope.parents);
                };

                $scope.save = function (type, $data) {
                    //type.$edit = false;
                    //if (type.$nameChanged == "") {
                    //    toaster.pop('error', '类型名称不能为空！', '');
                    //} else if (Perference.inArray(type.$parentChanged, $scope.parents) < 0) {
                    //    toaster.pop('error', '无效的父类型！', '');
                    //} else if (type.name != type.$nameChanged
                    //    || type.parent_id != type.$parentChanged.id) {
                    //
                    //    if (type.parent_id == 0 && type.$parentChanged.id != 0) {
                    //        for (var i = $data.length; i--;) {
                    //            if ($data[i].parent_id == type.id) {
                    //                toaster.pop('error', '只支持二级分类，但该类型包含子分类，因此不能拥有上级分类！', '');
                    //                return;
                    //            }
                    //        }
                    //    }
                    //
                    //    var data = {};
                    //    data['name'] = type.$nameChanged;
                    //    data['parent_id'] = type.$parentChanged.id;
                    //    User.update({id: type.id}, data).$promise.then(function (success) {
                    //        console.log('save success: ' + success);
                    //        $scope.tableParams.reload();
                    //    }, function (error) {
                    //        console.log('save error: ' + error);
                    //    });
                    //
                    //}
                };

                $scope.delete = function (type, $data) {
                    //for (var i = $data.length; i--;) {
                    //    if ($data[i].parent_id == type.id) {
                    //        toaster.pop('error', '无法删除包含子类型的分类！', '');
                    //        return;
                    //    }
                    //}
                    //User.delete({id: type.id}).$promise.then(function (success) {
                    //    console.log('del success: ' + success);
                    //    $scope.tableParams.reload();
                    //}, function (error) {
                    //    console.log('del error: ' + error);
                    //});
                };
            }];

        return {
            templateUrl: 'scripts/directives/setting/user-list/user-list.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: controller

        }
    });
//
//angular.module('nicu.controllers').controller('UserDlgCtrl', function ($scope, $modalInstance, toaster, parents) {
//    $scope.parents = parents;
//    $scope.type = {parent: parents[0]};
//
//    $scope.ok = function (type) {
//        if (type.name != null && type.name != "") {
//            type.parent_id = type.parent.id;
//            $modalInstance.close(type);
//        } else {
//            toaster.pop('warning', '请填写类型名称！', '');
//        }
//    };
//
//    $scope.cancel = function () {
//        $modalInstance.dismiss('cancel');
//    };
//});