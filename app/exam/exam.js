(function(angular) {
  'use strict';

  function ExamConfig($routeProvider) {
    $routeProvider.when('/checkpoint/:checkpoint_position', {
      templateUrl: 'exam/_index.html',
      controller: 'ExamCtrl'
    });
    $routeProvider.when('/shortcut/:id', {
      templateUrl: 'exam/_index.html',
      controller: 'ExamCtrl'
    });
    $routeProvider.when('/skill/:id/:lesson_number', {
      templateUrl: 'exam/_index.html',
      controller: 'ExamCtrl'
    });
  }

  angular.module('exam', ['exam.controllers', 'exam.services'])
    .config(['$routeProvider', ExamConfig]);
}(window.angular));