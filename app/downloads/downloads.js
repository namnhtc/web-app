(function (angular) {
  'use strict';

  function DownloadsConfig($routeProvider) {
    $routeProvider.when('/downloads', {
      templateUrl: 'downloads/_index.html',
      controller: 'DownloadCtrl'
    });
  }

  function DownloadCtrl($scope, $routeParams, $window, $timeout) {
    var redirect = $routeParams.redirect;
    $timeout(function () {
      $window.location = redirect;
    }, 1000);
  }

  angular.module('download', ['app.services'])
    .config(['$routeProvider', DownloadsConfig]);

  angular.module('download')
    .controller('DownloadCtrl', ['$scope', '$routeParams', '$window', '$timeout', DownloadCtrl]);
}(window.angular));