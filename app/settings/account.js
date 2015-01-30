(function (angular) {
  'use strict';

  function AccountSetting($localStorage, Profile) {
    var User = {};
    User.setting = $localStorage.auth.accountSetting || {
      microEnabled: 1,
      speakerEnabled: 1,
      autoSoundEnabled: 1,
      soundEnabled: 1
    };

    $localStorage.auth.accountSetting = User.setting;

    User.saveChanges = function (data) {
      return Profile.update(data);
    };

    return User;
  }

  function AccountSettingCtrl($scope, $localStorage, AccountSetting) {
    $scope.user = $localStorage.auth.user;
    $scope.setting = AccountSetting.setting;

    $scope.saveChanges = function () {
      var data = {};

      if ($scope.password && $scope.rePassword && $scope.password === $scope.rePassword) {
        // data = {};
        data.password = $scope.password;
        // AccountSetting.saveChanges(data);
      }

      if ($scope.user.email && $scope.user.email.length > 0) {
        // data = {};
        data.email = $scope.user.email;
        // AccountSetting.saveChanges(data);
      }

      if ($scope.user.username && $scope.user.username.length > 0) {
        // data = {};
        data.username = $scope.user.username;
        // AccountSetting.saveChanges(data);
      }

      if ($scope.user.mobile && $scope.user.mobile.length > 0) {
        // data = {};
        data.mobile = $scope.user.mobile;
        // AccountSetting.saveChanges(data);
      }

      AccountSetting.saveChanges(data);
    };
  }

  angular.module('settings.account', [])
    .controller('AccountSettingCtrl', ['$scope', '$localStorage', 'AccountSetting',
      AccountSettingCtrl
    ])
    .factory('AccountSetting', ['$localStorage', 'Profile', AccountSetting]);

}(window.angular));