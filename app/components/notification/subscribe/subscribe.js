(function (angular) {
  'use strict';

  function NotificationSubscribeItem() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        id: "@notiId",
        content: "@",
        friend: "=",
        timeAgo: "="
      },
      templateUrl: 'components/notification/subscribe/_subscribe-item.html',
      controller: 'NotificationSubscribeCtrl'
    };
  }

  function NotificationSubscribeCtrl($scope, Profile, LeaderboardServices,
    NotificationService) {
    var ctrl = this;
    $scope.message = $scope.content.replace(/\{username\}/g, $scope.friend.username);

    $scope.follow = function () {
      LeaderboardServices.follow({
          friend_id: $scope.friend._id
        })
        .then(function (response) {
          Profile.detail.following_user_ids = response.data.following_user_ids;
          $scope.friend.is_friend = true;
          $scope.isTemporaryFriend = true;
        })
        .then(function () {
          ctrl.open({
            is_friend: true
          });
        });
    };

    $scope.unfollow = function () {
      LeaderboardServices.unfollow({
          friend_id: $scope.friend._id
        })
        .then(function (response) {
          $scope.friend.is_friend = false;
        })
        .then(function (response) {
          ctrl.open({
            is_friend: false
          });
        })
    }

    ctrl.open = function (data) {
      // data = {is_friend}
      data.id = $scope.id;
      NotificationService.open(data);
    };
  }

  angular.module('notification.subscribe', []);
  angular.module('notification.subscribe')
    .directive('notificationSubscribeItem', NotificationSubscribeItem);
  angular.module('notification.subscribe')
    .controller('NotificationSubscribeCtrl', ['$scope', 'Profile', 'LeaderboardServices',
      'NotificationService', NotificationSubscribeCtrl
    ]);
}(window.angular));