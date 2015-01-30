(function(angular) {

  'use strict';

  function WelcomeConfig($routeProvider) {
    $routeProvider.when('/welcome', {
      templateUrl: 'welcome/_index.html',
      controller: 'WelcomeCtrl'
    });
  }

  function WelcomeCtrl($scope) {}

  function PlayerCarouselCtrl($scope, $location, AppSetting, MemoTracker) {
    var trackingText = 'take a tour v{0} slide {1}';
    $scope.slideIndex = 0;

    function init() {
      $scope.slides = AppSetting.sharedSettings.take_a_tour.images;
      $scope.slide = $scope.slides[$scope.slideIndex];
      trackingText = trackingText.replace('{0}', AppSetting.sharedSettings.take_a_tour.version);
      MemoTracker.track(trackingText.replace('{1}', 1));
    }

    if (AppSetting.sharedSettings) {
      init();
    } else {
      AppSetting.getSharedSettings()
        .then(init);
    }

    function goToSlide(index) {
      $scope.slideIndex = index;
      $scope.slide = $scope.slides[$scope.slideIndex];
      if ($scope.slideIndex < ($scope.slides.length - 1)) {
        MemoTracker.track(trackingText.replace('{1}', $scope.slide.order));
      } else {
        MemoTracker.track(trackingText.replace('{1}', '9999'));
      }
    }

    function next() {
      if ($scope.slideIndex < $scope.slides.length - 1) {
        goToSlide($scope.slideIndex + 1);
      } else {
        AppSetting.disableTour();
        $location.path('/');
      }
    }

    function previous() {
      goToSlide($scope.slideIndex - 1);
    }

    function skip() {
      AppSetting.disableTour();
      MemoTracker.track('skip ' + trackingText.replace('{1}', $scope.slide.order));
      $location.path('/');
    }

    $scope.control = {
      next: next,
      previous: previous,
      skip: skip,
      goToSlide: goToSlide
    };
  }

  angular.module('welcome', ['app.services']).config(['$routeProvider', WelcomeConfig]);
  angular.module('welcome')
    .controller('WelcomeCtrl', ['$scope', WelcomeCtrl])
    .controller('PlayerCarouselCtrl', ['$scope', '$location', 'AppSetting', 'MemoTracking', PlayerCarouselCtrl]);
  angular.module('welcome')
    .directive('playerContainerWelcome', function() {
      return {
        strict: 'EA',
        scope: true,
        templateUrl: 'components/player/_player-container.html'
      };
    })
    .directive('playerHeader', function() {
      return {
        strict: 'EA',
        scope: true,
        templateUrl: 'components/player/_player-header.html'
      };
    })
    .directive('playerFooter', function() {
      return {
        strict: 'EA',
        scope: true,
        templateUrl: 'components/player/_player-header.html'
      };
    });
  angular.module('welcome')
    .directive('playerContainerCarousel', function() {
      return {
        strict: 'EA',
        scope: true,
        controller: 'PlayerCarouselCtrl',
        link: function($scope, $element, $attr) {
          $element[0].focus();
          $element.bind('keyup', function (e) {
            if (e.keyCode === 13) {
              $scope.control.next();
              $scope.$apply();
            }
          });
        },
        templateUrl: 'components/player/_player-container-carousel.html'
      };
    });
}(window.angular));