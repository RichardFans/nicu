'use strict';

angular.module('nicu.controllers')
    .controller('EmployeeCtrl', ['$scope', 'UserType', EmployeeCtrl]);

function EmployeeCtrl($scope, UserType) {

    UserType.query().$promise.then(function (data) {
        $scope.userTypeList = data;
    });


}

