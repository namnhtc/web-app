(function (angular) {
  'use strict';

  function ReferralConfig($routeProvider) {
    $routeProvider
      .when('/referral/profile', {
        templateUrl: 'components/referral/_entercode.html',
        controller: 'ReferralEntercodeCtrl'
      })
      .when('/referral', {
        templateUrl: 'components/referral/_index.html',
        controller: 'ReferralCtrl',
        resolve: {
          joined: function (ReferralService) {
            return ReferralService.getStatus().then(function (res) {
              if (res.data.record.code) ReferralService.status = 1;
              else ReferralService.status = 0;
            }, function (res) {
              ReferralService.status = 0;
            });
          }
        }
      });
  }

  angular.module('referral', [
    'referral.directives',
    'referral.controllers',
    'referral.services',
    'referral.verifyReward'
  ]).config(['$routeProvider', ReferralConfig]);
})(window.angular);