(function (angular) {
  'use strict';

  function NotificationNewTier() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        content: '@',
        gift: "@",
        timeAgo: "="
      },
      templateUrl: 'components/notification/referral/_new-tier-item.html',
      controller: 'AchieveNewTierCtrl'
    };
  }

  function AchieveNewTierCtrl($scope, AppSetting) {
    var gift = angular.fromJson($scope.gift);
    $scope.iconUrl = AppSetting.sharedSettings.notification_icon_urls.referral;
    $scope.message = $scope.content.replace('{new_gift_value}', gift.new_gift_value);
  }

  angular.module('notification.newTier', []);
  angular.module('notification.newTier')
    .controller('AchieveNewTierCtrl', ['$scope', 'AppSetting', AchieveNewTierCtrl]);
  angular.module('notification.newTier')
    .directive('notificationNewTier', NotificationNewTier);
}(window.angular));