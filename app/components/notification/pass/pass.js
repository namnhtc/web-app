(function (angular) {
  'use strict';

  function NotificationPassItem() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        content: "@",
        friend: "=",
        timeAgo: "="
      },
      templateUrl: 'components/notification/pass/_pass-item.html',
      controller: 'NotificationPassCtrl'
    };
  }

  function NotificationPassCtrl($scope) {
    $scope.message = $scope.content.replace('{username}', $scope.friend.username);
  }

  angular.module('notification.pass', []);
  angular.module('notification.pass')
    .controller('NotificationPassCtrl', ['$scope', NotificationPassCtrl]);
  angular.module('notification.pass')
    .directive('notificationPassItem', NotificationPassItem);
}(window.angular));