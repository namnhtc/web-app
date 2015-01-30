'use strict';

// Bypass jslint
var angular = window.angular || angular;

angular.module('landingpage.directives', [])
  .directive('landingHeader', function() {
    return {
      strict: 'EA',
      controller: 'LpHeaderCtrl',
      templateUrl: 'components/landingpage/_header.html'
    };
  })
  .directive('landingHead', function() {
    return {
      strict: 'EA',
      scope: true,
      controller: 'LpHeadCtrl',
      templateUrl: 'components/landingpage/_head.html'
    };
  })
  .directive('landingInfo', function() {
    return {
      strict: 'EA',
      controller: 'LpInfoCtrl',
      link: function($scope, $element, $attr) {},
      templateUrl: 'components/landingpage/_info.html'
    };
  })
  .directive('landingSb', function() {
    return {
      strict: 'EA',
      templateUrl: 'components/landingpage/_sb.html'
    };
  })
  .directive('landingStatistic', ['$interval', function($interval) {
    return {
      strict: 'EA',
      controller: 'LpStatCtrl',
      templateUrl: 'components/landingpage/_statistic.html'
    };
  }])
  .directive('landingSlogan', function() {
    return {
      strict: 'EA',
      templateUrl: 'components/landingpage/_slogan.html'
    };
  })
  .directive('landingComments', function() {
    return {
      strict: 'EA',
      controller: 'LpCommentsCtrl',
      templateUrl: 'components/landingpage/_comment.html'
    };
  })
  .directive('landingFooter', function() {
    return {
      strict: 'EA',
      controller: 'LpFooterCtrl',
      templateUrl: 'components/landingpage/_footer.html'
    };
  })
  .directive('coursesModal', function() {
    return {
      strict: 'EA',
      scope: true,
      templateUrl: 'components/landingpage/_courses-modal.html'
    };
  });