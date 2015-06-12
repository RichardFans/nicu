'use strict';

angular.module('nicu.services')
    .factory('Perference', ['$q', '$sessionStorage', '$localStorage', perferenceService]);

function perferenceService($q, $sessionStorage, $localStorage) {
    var inArray = function (val, arr) {
            var i = arr.length;
            while (i--) {
                if (angular.equals(val, arr[i])) return i;
            }
            return -1
        };

    return {
        inArray: inArray,
        getSelectOptions: function (items, id, name, nameKey) {
            var def = $q.defer(),
                arr = [],
                data = [];
            if (typeof(name) === 'undefined') {
                name = id;
            }
            if (typeof(nameKey) === 'undefined') {
                nameKey = 'title';
            }
            angular.forEach(items, function (item) {
                if (inArray(item[id], arr) === -1) {
                    arr.push(item[id]);
                    e = {'id': item[id]};
                    e[nameKey] = item[name];
                    data.push(e);
                }
            });
            def.resolve(data);
            return def;
        },
        except: function (exceptId, items) {
            var itemsExp = [];
            angular.forEach(items, function (item) {
                if (exceptId != item.id) {
                    itemsExp.push(item);
                }
            });
            return itemsExp;
        },
        getItem: function (value, items, key) {
            if (typeof(key) === 'undefined') {
                key = 'id';
            }
            var i = items.length;
            while (i--) {
                if (items[i][key] == value)
                    return items[i];
            }
            return null;
        },
        getItems: function (value, items, key) {
            if (typeof(key) === 'undefined') {
                key = 'id';
            }
            var i = items.length;
            var result = [];
            while (i--) {
                if (items[i][key] == value) {
                    result.push(items[i]);
                }
            }
            return result;
        },
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