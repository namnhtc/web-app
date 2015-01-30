(function (angular) {
  'use strict';

  function VerifyRewardModalCtrl($scope, $modal, ReferralService) {
    $scope.verifyRewards = function () {
      ReferralService.verifyRewards().then(function (res) {
        (function () {
          var modalInstance = $modal.open({
            // template: '<div verifyRewards-modal></div>',
            windowClass: 'verify-rewards-modal',
            templateUrl: 'components/referral/_verify_Rewards.html',
            controller: 'ReferralRewardsCtrl',
            resolve: {
              getRewardsCode: function () {
                return res.data;
              }
            }
          });

          modalInstance.result.then(function (msg) {
            if ($scope[msg] instanceof Function) $scope[msg]();
          });
        })();
      }, function (res) {
        (function () {
          var modalInstance = $modal.open({
            windowClass: 'verify-rewards-modal',
            templateUrl: 'components/referral/_verify_Rewards_Error.html',
            controller: 'ReferralRewardsCtrl',
            resolve: {
              getRewardsCode: function () {
                return res.data.message;
              }
            }
          });

          modalInstance.result.then(function (msg) {
            if ($scope[msg] instanceof Function) $scope[msg]();
          });
        })();
      });
    };
  }

  function ReferralRewardsCtrl($scope, data, modalInstance, ReferralService) {
    var ctrl = this;
    $scope.user = {
      mobile: ''
    };
    $scope.rewards_info = data;
    $scope.user.mobile = data.mobile || '';
    $scope.error = '';
    $scope.success = '';

    ctrl.validateMobile = function (mobile) {
      // Regex 10-digit phone
      var tenDigitPhoneRegex = /09[0-9]{8}/;
      // Regex 11-digit phone
      var elevenDigitPhoneRegex = /01[0-9]{9}/;
      return ((mobile.length === 10 && mobile.match(tenDigitPhoneRegex)) || (mobile.length ===
        11 && mobile.match(elevenDigitPhoneRegex)));
    }

    $scope.verifyMobile = function () {
      $scope.user.mobile = $scope.user.mobile.replace(/ /g, '');
      if (ctrl.validateMobile($scope.user.mobile)) {
        ReferralService.verifyMobile({
            mobile: $scope.user.mobile
          })
          .then(function (response) {
            $scope.success = 'Memo đã ghi nhận số điện thoại của bạn.';
            console.log($scope.success);
          }, function (response) {
            $scope.error = response.error;
          });
      } else {
        $scope.error = 'Số điện thoại không hợp lệ. Vui lòng nhập lại!';
      }
    };

    $scope.close = function () {
      modalInstance.close();
    };
  }

  angular.module('referral.verifyReward', [])
    .controller('VerifyRewardModalCtrl', ['$scope', '$modal', 'ReferralService',
      VerifyRewardModalCtrl
    ])
    .controller('ReferralRewardsCtrl', ['$scope', 'getRewardsCode', '$modalInstance',
      'ReferralService',
      ReferralRewardsCtrl
    ]);
}(window.angular));