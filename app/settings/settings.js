(function (angular) {
  'use strict';

  function SettingConfig($routeProvider) {
    $routeProvider.when('/setting/account', {
      templateUrl: 'settings/_account.html',
      controller: 'AccountSettingCtrl'
    });
    $routeProvider.when('/setting/profile', {
      templateUrl: 'settings/_profile.html',
      controller: 'SettingProfileCtrl'
    });
    $routeProvider.when('/setting/direction', {
      templateUrl: 'settings/_languages.html',
      controller: 'SettingLanguageCtrl'
    });
    $routeProvider.when('/setting/notification', {
      templateUrl: 'settings/_notification.html',
      controller: 'SettingNotificationCtrl'
    });
  }

  angular.module('settings', [
    'settings.sidebar', 'settings.account', 'settings.profile',
    'settings.languages', 'settings.notification'
  ]).config(['$routeProvider', SettingConfig]);
}(window.angular));