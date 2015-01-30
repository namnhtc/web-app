(function(angular) {
    'use strict';

    angular.module('settings.sidebar', [])
        .directive('sideNav', function() {
            return {
                restrict: 'EA',
                scope: true,
                replace: true,
                templateUrl: 'settings/_sidebar.html'
            };
        });
})(window.angular);