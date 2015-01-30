(function (angular) {
  'use strict';

  function RefCodeSubmittedItem() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        id: '@notiId',
        content: '@',
        friend: '=',
        timeAgo: '='
      },
      templateUrl: 'components/notification/referral/_ref-code-submitted-item.html',
      controller: 'RefCodeSubmittedCtrl'
    };
  }

  function RefCodeSubmittedCtrl($scope, Profile, LeaderboardServices, NotificationService) {
    var ctrl = this;
    var friend = angular.fromJson($scope.friend);
    $scope.message = $scope.content.replace(/\{username\}/g, friend.username);

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

  angular.module('notification.refCodeSubmitted', []);
  angular.module('notification.refCodeSubmitted')
    .controller('RefCodeSubmittedCtrl', ['$scope', 'Profile', 'LeaderboardServices',
      'NotificationService', RefCodeSubmittedCtrl
    ]);
  angular.module('notification.refCodeSubmitted')
    .directive('notificationRefCodeSubmittedItem', RefCodeSubmittedItem);
}(window.angular));