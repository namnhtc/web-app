'use strict';

angular.module('home.directives', [])
  .directive('appMain', function () {
    return {
      strict: 'EA',
      scope: true,
      controller: 'HomeMainCtrl',
      templateUrl: 'home/_main.html'
    };
  })
  .directive('mainLeft', function () {
    return {
      strict: 'EA',
      scope: true,
      templateUrl: 'home/_main-left.html'
    };
  })
  .directive('mainCenter', function () {
    return {
      strict: 'EA',
      scope: true,
      templateUrl: 'home/_main-center.html'
    };
  })
  .directive('mainRight', function () {
    return {
      strict: 'EA',
      scope: true,
      templateUrl: 'home/_main-right.html'
    };
  })
  .directive('placementTestModal', function () {
    return {
      strict: 'EA',
      controller: 'PlacementTestModalCtrl'
    };
  })
  .directive('leaderboard', function () {
    return {
      restrict: 'EA',
      scope: true,
      controller: 'LeaderboardCtrl',
      templateUrl: 'leaderboard/_index.html'
    };
  })
  .directive('campaignRight', function () {
    return {
      restrict: 'EA',
      templateUrl: 'home/_campaign-right.html'
    };
  })
  .directive('referralFbShareTooltip', ['$sessionStorage', function ($sessionStorage) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        viralLevel: "=",
        showOn: "@"
      },
      link: function ($scope, $element) {
        $scope.$watch('viralLevel', function () {
          if ($scope.viralLevel && angular.fromJson($scope.showOn).indexOf($scope.viralLevel) >
            -1) {
            if ($scope.viralLevel !== "v6" && !$sessionStorage.fbShareTooltip) {
              $element.css({
                display: "block"
              });
              $scope.content =
                'Bạn có cơ hội nhận được học bổng <span class="referral-highlight">900,000 VNĐ</span> của <span class="referral-highlight">TOPICA Native.</span> Chương trình chỉ áp dụng đến ngày <span class="referral-highlight">20-01-2015</span>. Click nút <span class="referral-highlight">Share</span> ngay để nhận học bổng.';
            }

            if ($scope.viralLevel === "v6" && !$sessionStorage.verifyTooltip) {
              $element.css({
                display: "block"
              });
              $scope.content =
                'Bạn có thể bấm <span class="referral-highlight">Xác minh</span> để nhận được học bổng ngay';
            }
          }
        });

        $scope.close = function () {
          if ($scope.viralLevel !== "v6") {
            $sessionStorage.fbShareTooltip = true;
          } else {
            $sessionStorage.verifyTooltip = true;
          }

          $element.css({
            display: "none"
          });
        }
      },
      templateUrl: 'home/_referral-tooltip.html'
    };
  }]);