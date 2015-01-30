(function(angular) {

  'use strict';

  function questionFailure() {
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: 'components/question/_question-failure.html'
    };
  }

  function questionSuccess() {
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: 'components/question/_question-success.html'
    };
  }

  angular.module('question', [
      'question.select',
      'question.translate',
      'question.judge',
      'question.name',
      'question.listen',
      'question.form',
      'question.speak',
      'question.services'
    ]);
  angular.module('question')
    .directive('questionFailure', questionFailure)
    .directive('questionSuccess', questionSuccess);
  

}(window.angular));