'use strict';

angular.module('nicu.directives')
    .directive('userTypeList', function () {
        var controller = ['$scope', '$filter', 'dialogs', 'toaster', 'NgTableParams', 'UserType', 'Perference',
            function ($scope, $filter, dialogs, toaster, NgTableParams, UserType, Perference) {
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: 10,
                    sorting: {
                        parent_id: 'asc'     // initial sorting
                    }
                }, {
                    counts: [5, 10, 15],
                    total: 0,
                    getData: function ($defer, params) {
                        UserType.query(function (data) {
                            console.log('UserType query');
                            params.total(data.length);

                            var data = params.sorting() ?
                                $filter('orderBy')(data, params.orderBy()) :
                                data;

                            $scope.parents = [{id: '0', name: '无'}];
                            angular.forEach(data, function (item) {
                                if (item.parent_id == 0) {
                                    $scope.parents.push({
                                        id: item.id,
                                        name: item.name
                                    });
                                }
                            });
                            for (var i = 0; i < data.length; i++) {
                                data[i].parent = Perference.getItem(data[i].parent_id, $scope.parents);
                            }

                            $defer.resolve(data.slice((params.page() - 1) * params.count(),
                                params.page() * params.count()));

                        });
                    }
                });

                $scope.add = function () {
                    dialogs.create('UserTypeDlg.html', 'UserTypeDlgCtrl',
                        {parents: $scope.parents, toaster: toaster}, {
                            animation: true,
                            size: 'md'
                        })
                        .result.then(function (type) {
                            UserType.save(type).$promise.then(function (success) {
                                console.log('add success: ' + success);
                                $scope.tableParams.reload();
                            }, function () {
                                console.log('add error: ' + error);
                            })
                        });
                }

                $scope.edit = function (type) {

                    type.$edit = true;
                    type.$nameChanged = type.name;
                    type.$parentChanged = type.parent;
                    $scope.parents_list = Perference.except(type.id, $scope.parents);
                };

                $scope.save = function (type, $data) {
                    type.$edit = false;
                    if (type.$nameChanged == "") {
                        toaster.pop('error', '类型名称不能为空！', '');
                    } else if (Perference.inArray(type.$parentChanged, $scope.parents) < 0) {
                        toaster.pop('error', '无效的父类型！', '');
                    } else if (type.name != type.$nameChanged
                        || type.parent_id != type.$parentChanged.id) {

                        if (type.parent_id == 0 && type.$parentChanged.id != 0) {
                            for (var i = $data.length; i--;) {
                                if ($data[i].parent_id == type.id) {
                                    toaster.pop('error', '只支持二级分类，但该类型包含子分类，因此不能拥有上级分类！', '');
                                    return;
                                }
                            }
                        }

                        var data = {};
                        data['name'] = type.$nameChanged;
                        data['parent_id'] = type.$parentChanged.id;
                        UserType.update({id: type.id}, data).$promise.then(function (success) {
                            console.log('save success: ' + success);
                            $scope.tableParams.reload();
                        }, function (error) {
                            console.log('save error: ' + error);
                        });

                    }
                };

                $scope.delete = function (type, $data) {
                    dialogs.confirm('删除员工类型', '确定要删除<strong>' + type.name + '</strong>分类吗？')
                        .result.then(function () {
                            for (var i = $data.length; i--;) {
                                if ($data[i].parent_id == type.id) {
                                    toaster.pop('error', '无法删除包含子类型的分类！', '');
                                    return;
                                }
                            }
                            UserType.delete({id: type.id}).$promise.then(function (success) {
                                console.log('del success: ' + success);
                                $scope.tableParams.reload();
                            }, function (error) {
                                console.log('del error: ' + error);
                            });
                        });
                };
            }
        ];

        return {
            templateUrl: 'scripts/directives/setting/user-type-list/user-type-list.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: controller

        }
    }
);

angular.module('nicu.controllers').controller('UserTypeDlgCtrl', function ($scope, $modalInstance, data) {
    $scope.parents = data.parents;
    $scope.type = {parent: data.parents[0]};

    $scope.ok = function (type) {
        if (type.name != null && type.name != "") {
            type.parent_id = type.parent.id;
            $modalInstance.close(type);
        } else {
            data.toaster.pop('warning', '请填写类型名称！', '');
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});