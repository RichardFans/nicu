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