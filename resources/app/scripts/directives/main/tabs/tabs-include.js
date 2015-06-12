'use strict';

angular.module('nicu.directives')
    .directive('tabInclude', [function () {
        var selfIndex = function (element) {
            var arr = element.parent().children();
            var val = element[0];
            var i = arr.length;
            while (i--) {
                if (val == arr[i]) return i;
            }
            return -1
        };

        return {
            require: ['^tab', '^tabset'],
            restrict: 'A',
            priority: 100,
            compile: function (element, attrs, transclude) {

                var elem = angular.element('<div></div>');
                elem.attr('ng-include', '$include[' + selfIndex(element) + ']');
                element.append(elem);

                return function postLink(scope, element, attrs) {
                    if (scope.$include == null) {
                        scope.$include = [];
                    }
                    scope.$include.push('');

                    element.isolateScope().$watch('active',
                        function (newValue) {

                            if (newValue) {
                                scope.$include[selfIndex(element)] = attrs.tabInclude;
                            }
                        }
                    );
                };
            }
        };
    }]);