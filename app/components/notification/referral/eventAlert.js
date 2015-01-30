(function (angular) {
  'use strict';

  function NotificationEventAlertItem() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        content: '@',
        timeAgo: '='
      },
      templateUrl: 'components/notification/referral/_event-alert-item.html',
      controller: 'EventAlertCtrl'
    };
  }

  function EventAlertCtrl($scope, AppSetting) {
    $scope.iconUrl = AppSetting.sharedSettings.notification_icon_urls.referral;
    $scope.message = $scope.content;
    $scope.FBShare = {
      shareType: 'referral-code',
      shareData: 'a'
    }
  }

  angular.module('notification.eventAlert', []);
  angular.module('notification.eventAlert')
    .controller('EventAlertCtrl', ['$scope', 'AppSetting', EventAlertCtrl]);
  angular.module('notification.eventAlert')
    .directive('notificationEventAlertItem', NotificationEventAlertItem);
}(window.angular));