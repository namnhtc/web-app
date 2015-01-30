(function(angular) {
  'use strict';

  function HeaderCtrl($scope, $rootScope, $location, AuthService, $modal) {
    $scope.$on('$routeChangeSuccess', function() {
      $scope.path = $location.path();
    });

    $scope.logout = function() {
      AuthService.logout();
    };

    $scope.menus = [{
        'title': 'Trang chủ',
        'link': '/'
      },
      // {'title': 'Thảo luận', 'link': '/discussion'}
    ];

    $scope.showShortcutPopup = function() {
      var modalInstance = $modal.open({
        templateUrl: 'components/header/_keyboard.html',
        controller: 'ModalInstanceCtrl',
        windowClass: 'box-shortcuts"'
      });

      modalInstance.result.then(function(msg) {
        if ($scope[msg] instanceof Function) $scope[msg]();
      });
    };
  }


  angular.module('header', []);
  angular.module('header').controller('HeaderCtrl', ['$rootScope', '$scope', '$location', 'AuthService', '$modal', HeaderCtrl])
  .controller('ModalInstanceCtrl', ['$scope','$modalInstance', function($scope, $modalInstance) {
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);

}(window.angular));