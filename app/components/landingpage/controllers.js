'use strict';

// Bypass jslint
var angular = window.angular || angular;

angular.module('landingpage.controllers', [])
  .controller('LpCtrl', [
    '$scope',
    '$modal',
    function ($scope, $modal) {
      $scope.courseModal = function () {
        var modalInstance = $modal.open({
          template: '<div courses-modal></div>',
          controller: 'CourseModalInstanceCtrl',
          windowClass: 'course-modal'
        });
      };
    }
  ])
  .controller('CourseModalInstanceCtrl', [
    '$scope',
    function ($scope, $modalInstance) {

    }
  ])
  .controller('LpHeaderCtrl', [
    '$scope', '$routeParams',
    'MolServices',
    function ($scope, $routeParams, MolServices) {
      var data = $routeParams;
      data.preview = '1';
      MolServices.saveC2(data);
      $scope.showLoginCTA = function () {
        return data.code_chanel && data.code_chanel === 'REF001'
      };
    }
  ])
  .controller('LpHeadCtrl', [
    '$scope', '$window',
    'Mixpanel',
    function ($scope, $window, Mixpanel) {
      $scope.toAppStore = function () {
        $window.location.href =
          'https://itunes.apple.com/us/app/topica-memo-hoc-ngoai-ngu/id932238745?ls=1&mt=8';
      };

      $scope.toPlayStore = function () {
        $window.location.href = 'https://play.google.com/store/apps/details?id=vn.topica.memo';
      };
    }
  ])
  .controller('LpInfoCtrl', ['$scope', '$window', 'Mixpanel', function ($scope, $window, Mixpanel) {
    $scope.toAppStore1 = function () {
      $window.location.href =
        'https://itunes.apple.com/us/app/topica-memo-hoc-ngoai-ngu/id932238745?ls=1&mt=8';
    };

    $scope.toPlayStore1 = function () {
      $window.location.href = 'https://play.google.com/store/apps/details?id=vn.topica.memo';
    };
  }])
  .controller('LpStatCtrl', [
    '$scope',
    function ($scope) {}
  ])
  .controller('LpCommentsCtrl', [
    '$scope',
    function ($scope) {
      $scope.comment = {
        user: 'Phương Nguyễn',
        content: 'Ứng dụng quá cool! Ngay cả bé nhà mình cũng thích chơi với kiến Memo :D'
      };
    }
  ])
  .controller('LpFooterCtrl', ['$scope', '$window', 'Mixpanel', function ($scope, $window, Mixpanel) {
    $scope.toAppStore2 = function () {
      $window.location.href =
        'https://itunes.apple.com/us/app/topica-memo-hoc-ngoai-ngu/id932238745?ls=1&mt=8';
    };
    $scope.toWP2 = function () {
      $window.location.href =
        'http://cleverstore.vn/ung-dung/topica-memo-hoc-ngoai-ngu-mien-phi-81580.html';
    };

    $scope.toPlayStore2 = function () {
      $window.location.href = 'https://play.google.com/store/apps/details?id=vn.topica.memo';
    };
  }]);
