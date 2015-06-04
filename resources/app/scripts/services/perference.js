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