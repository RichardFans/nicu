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
