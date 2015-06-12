'use strict';

angular.module('nicu.directives')
    .directive('rolePermissionList', function () {
        var controller = ['$scope', 'dialogs', 'toaster', 'NgTableParams', 'Role', 'Permission', 'Perference',
            function ($scope, dialogs, toaster, NgTableParams, Role, Permission, Perference) {

                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: 10
                }, {
                    counts: [5, 10, 15],
                    total: 0,
                    getData: function ($defer, params) {
                        Role.query(function (data) {
                            console.log('Role query');
                            params.total(data.length);

                            $scope.roles = [];
                            angular.forEach(data, function (item) {
                                $scope.roles.push(item.name);
                            });

                            $defer.resolve(data.slice((params.page() - 1) * params.count(),
                                params.page() * params.count()));

                        });
                    }
                });

                $scope.add = function () {
                    dialogs.create('RoleAddDlg.html', 'RoleAddDlgCtrl',
                        {Perference: Perference, Permission: Permission, roles: $scope.roles}, {
                            animation: true,
                            size: 'md'
                        })
                        .result.then(function (role) {
                            Role.save(role).$promise.then(function (success) {
                                console.log('add success: ' + success);
                                $scope.tableParams.reload();
                            }, function (error) {
                                console.log('add error: ' + error);
                            });
                        });
                }

                $scope.edit = function (role) {
                    role.$edit = true;
                    role.$nameChanged = role.name;
                    role.$descriptionChanged = role.description;
                };

                $scope.save = function (role, $data) {
                    role.$edit = false;
                    if (role.$nameChanged == "") {
                        toaster.pop('error', '角色名称不能为空！');
                    } else if (role.name != role.$nameChanged
                        && Perference.getItems(role.$nameChanged, $data, 'name').length == 1) {
                        toaster.pop('error', '角色名称必须唯一！');
                    } else if (role.name != role.$nameChanged
                        || role.description != role.$descriptionChanged) {
                        console.log('s = ' + Perference.getItems(role.$nameChanged, $data, 'name').length);

                        var data = {};
                        data['name'] = role.$nameChanged;
                        data['display_name'] = role.$nameChanged;
                        data['description'] = role.$descriptionChanged;
                        Role.update({id: role.id}, data).$promise.then(function (success) {
                            console.log('save success: ' + success);
                            $scope.tableParams.reload();
                        }, function (error) {
                            console.log('save error: ' + error);
                        });
                    }
                };

                $scope.delete = function (role, $data) {
                    dialogs.confirm('删除员工角色', '确定要删除<strong>' + role.name + '</strong>角色吗？')
                        .result.then(function () {
                            Role.delete({id: role.id}).$promise.then(function (success) {
                                console.log('del success: ' + success);
                                $scope.tableParams.reload();
                            }, function (error) {
                                console.log('del error: ' + error);
                            });
                        });
                };

                $scope.setPerms = function (role) {
                    dialogs.create('PermSetDlg.html', 'PermSetDlgCtrl',
                        {toaster: toaster, Permission: Permission, role: role}, {
                            animation: true,
                            size: 'md'
                        })
                        .result.then(function (perms) {
                            //Role.save(role).$promise.then(function (success) {
                            //    console.log('add success: ' + success);
                            //    $scope.tableParams.reload();
                            //}, function (error) {
                            //    console.log('add error: ' + error);
                            //});
                        });
                }
            }];

        return {
            templateUrl: 'scripts/directives/setting/role-permission-list/role-permission-list.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: controller

        }
    });

angular.module('nicu.controllers')
    .controller('PermSetDlgCtrl', function ($scope, $modalInstance, data) {
        $scope.role = data.role;

        var setParentOfChildren = function (node) {
            angular.forEach(node.children, function (child) {
                child.parent = node;
                if (child.children != null && child.children.length > 0) {
                    setParentOfChildren(child);
                }
            });
        };

        data.Permission.get({id: data.role.id}).$promise.then(function (data) {
            console.log('Permission get: ' + data);
            setParentOfChildren(data[1]);
            $scope.data = data[1].children;

        }, function (error) {
            console.log('Permission get error: ' + error);
        });

        $scope.setCheckedAll = function (node, checked) {
            node.is_checked = checked;
            setCheckedChildren(node);
        }

        var setCheckedChildren = function (node) {
            if (node.children != null && node.children.length > 0) {
                angular.forEach(node.children, function (child) {
                    child.is_checked = node.is_checked;
                    setCheckedChildren(child);
                });
            }
        }

        var setCheckedAncestors = function (node) {
            if (node.parent) {
                if (node.is_checked) {
                    if (!node.parent.is_checked) {
                        node.parent.is_checked = node.is_checked;
                        setCheckedAncestors(node.parent);
                    }
                } else {
                    if (node.parent.is_checked) {
                        var allUnchecked = true;
                        var children = node.parent.children;
                        for (var i = 0; i < children.length; i++) {
                            if (children[i].is_checked) {
                                allUnchecked = false;
                                break;
                            }
                        }
                        if (allUnchecked) {
                            node.parent.is_checked = node.is_checked;
                            console.log('xx node.parent.is_checked: ' + node.parent.is_checked);
                            setCheckedAncestors(node.parent);
                        }
                    }
                }
            }
        }

        $scope.onChange = function (node) {
            setCheckedChildren(node);
            setCheckedAncestors(node);
        }

        $scope.ok = function (role) {
            if (role.name == null || role.name == "") {
                data.toaster.pop('warning', '请填写角色名称！');
            } else if ($scope.conflict) {
                data.toaster.pop('warning', '该角色名称已经存在！');
            } else {
                role.display_name = role.name;
                $modalInstance.close(role);
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

angular.module('nicu.controllers')
    .controller('RoleAddDlgCtrl', function ($scope, $modalInstance, data) {
        $scope.roles = data.roles;
        $scope.role = {};
        $scope.conflict = false;

        $scope.$watch(function (scope) {
                return scope.role.name;
            },
            function (newValue, oldValue) {
                if (data.Perference.inArray(newValue, $scope.roles) > 0) {
                    $scope.conflict = true;
                } else {
                    $scope.conflict = false;
                }
            }
        );

        $scope.ok = function (role) {
            if (role.name == null || role.name == "") {
                data.toaster.pop('warning', '请填写角色名称！');
            } else if ($scope.conflict) {
                data.toaster.pop('warning', '该角色名称已经存在！');
            } else {
                role.display_name = role.name;
                $modalInstance.close(role);
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });