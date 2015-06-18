'use strict';

angular.module('nicu.controllers')
    .controller('LoginCtrl', ['$scope', '$window', '$state', 'toaster',
        'Nodes', 'Auth', 'Perference', LoginCtrl]);
//$sessionStorage
function LoginCtrl($scope, $window, $state, toaster, Nodes, Auth, Perference) {
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
