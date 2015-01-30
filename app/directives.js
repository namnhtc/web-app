'use strict';

// Bypass jslint
var angular = window.angular;

angular.module('app.directives', [])
  .directive('home', function () {
    return {
      restrict: 'EA',
      controller: 'HomeCtrl',
      templateUrl: 'home/_index.html'
    };
  })
  .directive('appHeader', function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: true,
      controller: 'HeaderCtrl',
      templateUrl: 'components/header/_header.html'
    };
  })
  .directive('facebookShareButton', function (AppSetting, MemoTracking) {
    function displayFeedDialog(response, trackingData) {
      var trackingData = angular.fromJson(trackingData);
      var data = response.data;
      data.method = 'feed';

      FB.ui(data, function (response) {
        if (response.post_id) {
          MemoTracking.track(trackingData.eventName);
        }
      });
    }

    function displayDefaultFeedDialog() {
      FB.ui({
        method: 'share',
        href: 'http://memo.edu.vn'
      }, function (response) {
        if (response.post_id) {
          MemoTracking.track(trackingData.eventName);
        }
      });
    }

    return {
      restrict: 'EA',
      scope: {
        shareType: '@',
        shareData: '@',
        trackingData: '@'
      },
      link: function ($scope, $element, $attr) {
        $element.bind('click', function () {
          if ($scope.shareType === "level-up") {
            AppSetting.getLevelUpFacebookContent()
              .then(displayFeedDialog, displayDefaultFeedDialog);
          } else if ($scope.shareType === "finish-skill") {
            AppSetting.getFinishSkillFacebookContent($scope.shareData)
              .then(displayFeedDialog, displayDefaultFeedDialog);
          } else if ($scope.shareType === "referral-code") {
            AppSetting.getReferralShareFacebookContent($scope.shareData)
              .then(function (response) {
                displayFeedDialog(response, $scope.trackingData);
              }, displayDefaultFeedDialog);
          } else {
            displayDefaultFeedDialog();
          }
        })
      }
    };
  })
  .directive('facebookLoginButton', function () {
    return {
      strict: 'EA',
      link: function ($scope, $element) {
        $element.bind('click', function () {
          $scope.FbLogin();
        });
      }
    };
  })
  .directive('landingpage', function () {
    return {
      restrict: 'EA',
      controller: 'LpCtrl',
      templateUrl: 'components/landingpage/_index.html'
    };
  });