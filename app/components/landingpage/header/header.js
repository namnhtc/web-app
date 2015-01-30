(function (angular) {
  'use strict';

  function LoginModalDirective() {
    function linkFn($scope, $element) {
      $element.bind('keypress', function (e) {
        if (e.keyCode === 13) {
          $scope.login();
        }
      });
    }
    return {
      restrict: 'EA',
      scope: true,
      replace: true,
      link: linkFn,
      templateUrl: 'components/landingpage/header/_login-modal.html'
    };
  }

  function RegisterModalDirective() {
    function linkFn($scope, $element) {
      $element.bind('keypress', function (e) {
        if (e.keyCode === 13) {
          $scope.register();
        }
      });
    }

    return {
      restrict: 'EA',
      scope: true,
      replace: true,
      link: linkFn,
      templateUrl: 'components/landingpage/header/_register-modal.html'
    };
  }

  function ForgetPasswordModalDirective() {
    function linkFn($scope, $element) {
      $element.bind('keypress', function (e) {
        if (e.keyCode === 13) {
          $scope.forgetPassword();
        }
      });
    }
    return {
      restrict: 'EA',
      scope: true,
      replace: true,
      link: linkFn,
      templateUrl: 'components/landingpage/header/_forget-modal.html'
    };
  }

  function LoginModalCtrl($scope, $rootScope, $modal) {
    $scope.open = function () {
      var modalInstance = $modal.open({
        template: '<div login-modal></div>',
        controller: 'LoginModalInstanceCtrl',
        windowClass: 'login-modal'
      });

      modalInstance.result.then(function (msg) {
        if ($scope[msg] instanceof Function) $scope[msg]();
      });
    };

    $scope.openRegister = function () {
      var modalInstance = $modal.open({
        template: '<div register-modal></div>',
        controller: 'LoginModalInstanceCtrl',
        windowClass: 'register-modal'
      });

      modalInstance.result.then(function (msg) {
        if ($scope[msg] instanceof Function) $scope[msg]();
      });
    };

    $scope.openForgetPassword = function () {
      var modalInstance = $modal.open({
        template: '<div forget-modal></div>',
        controller: 'ForgetPasswordModalInstanceCtrl',
        windowClass: 'forget-modal'
      });

      modalInstance.result.then(function (msg) {
        if ($scope[msg] instanceof Function) $scope[msg]();
      });
    };

  }

  function LoginModalInstanceCtrl($scope, $location, $timeout, $modalInstance, $routeParams,
    AuthService) {
    $scope.user = {};
    $scope.error = '';
    $scope.hideAnt = ($location.path().indexOf('/referral') >= 0);

    $scope.registerModal = function () {
      $modalInstance.close('openRegister');
    };

    $scope.loginModal = function () {
      $modalInstance.close('open');
    };

    $scope.forgetModal = function () {
      $modalInstance.close('openForgetPassword');
    };

    $scope.FbLogin = function () {
      AuthService.FbLogin()
        .then(function (response) {
          AuthService.login(response)
            .then(closeModal, displayMessageOnFail);
        }, displayMessageOnFail);
    };

    $scope.GLogin = function () {
      AuthService.GLogin().then(closeModal, displayMessageOnFail);
    };

    $scope.register = function () {
      var user = angular.fromJson(angular.toJson($scope.user));
      delete user.password;
      if (user.referral_code && user.referral_code !== "") {
        AuthService.checkCode({
            referral_code: user.referral_code
          })
          .then(function () {
            delete $scope.user.referral_code;
            AuthService.register($scope.user)
              .then(closeModal, displayMessageOnFail)
              .then(function () {
                AuthService.submitReferralCode({
                  referral_code: user.referral_code
                });
              }, displayMessageOnFail);
          }, displayMessageOnFail);
      } else {
        delete $scope.user.referral_code;
        AuthService.register($scope.user)
          .then(closeModal, displayMessageOnFail);
      }
    };

    $scope.login = function () {
      var user = angular.fromJson(angular.toJson($scope.user));
      delete user.password;
      if (user.referral_code && user.referral_code !== "") {
        AuthService.checkCode({
            referral_code: user.referral_code
          })
          .then(function () {
            delete $scope.user.referral_code;
            AuthService.login($scope.user)
              .then(closeModal, displayMessageOnFail)
              .then(function () {
                AuthService.submitReferralCode({
                  referral_code: user.referral_code
                });
              }, displayMessageOnFail);
          }, displayMessageOnFail);
      } else {
        delete $scope.user.referral_code;
        AuthService.login($scope.user)
          .then(closeModal, displayMessageOnFail);
      }
    };

    $scope.showReferralInput = function () {
      return ($routeParams.code_chanel && $routeParams.code_chanel === 'REF001');
    };

    function closeModal(data) {
      if ($modalInstance) {
        $modalInstance.close();
      }
    }

    function displayMessageOnFail(response) {
      if (response.data) {
        $scope.error = response.data.error || response.data.message;
      }
    }

  }

  function ForgetPasswordModalInstanceCtrl($scope, $rootScope, $timeout, $modalInstance,
    $routeParams,
    AuthService) {
    $scope.user = {};
    $scope.error = '';

    $scope.forgetPassword = function () {
      var user = angular.fromJson(angular.toJson($scope.user));

      AuthService.forgetPassword($scope.user)
        .then(closeModal, displayMessageOnFail);
    };

    function closeModal(data) {
      if ($modalInstance) {
        $modalInstance.close();
      }
    }

    function displayMessageOnFail(response) {
      if (response.data) {
        $scope.error = response.data.error || response.data.message;
      }
    }
  }
  angular.module('landingpage.login', [])
    .directive('loginModal', LoginModalDirective)
    .directive('registerModal', RegisterModalDirective)
    .directive('forgetModal', ForgetPasswordModalDirective)
    .controller('LoginModalCtrl', ['$scope', '$rootScope', '$modal', '$routeParams',
      LoginModalCtrl
    ])
    .controller('LoginModalInstanceCtrl', ['$scope', '$location', '$timeout', '$modalInstance',
      '$routeParams', 'AuthService', LoginModalInstanceCtrl
    ])
    .controller('ForgetPasswordModalInstanceCtrl', ['$scope', '$rootScope', '$timeout',
      '$modalInstance',
      '$routeParams', 'AuthService', ForgetPasswordModalInstanceCtrl
    ]);
}(window.angular));