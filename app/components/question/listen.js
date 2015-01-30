'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question.listen', [])
  .controller('QuestionListenCtrl', [
    '$scope',
    '$attrs',
    'ngAudio',
    function($scope, $attrs, ngAudio) {
      $scope.listen = $scope.$parent.question;
      var normalFile = ngAudio.load($scope.listen.normal_question_audio),
        slowFile = ngAudio.load($scope.listen.slow_question_audio);

      $scope.speaker = {
        play: function() {
          normalFile.play();
        },
        slowPlay: function() {
          slowFile.play();
        }
      };

      if ($scope.$parent.shouldPlaySlow) {
        $scope.speaker.slowPlay();
      } else {
        $scope.speaker.play();
      }
    }
  ])
  .directive('questionListen', function() {
    return {
      strict: 'EA',
      replace: true,
      scope: {
        answer: "=answer"
      },
      controller: 'QuestionListenCtrl',
      link: function($scope, $element) {
        $element[0].querySelector('input[type="text"]').focus();
        $element.on('keydown', function(e) {
          if (e.keyCode === 13) {
            if ($scope.answer && $scope.answer.length > 0) {
              e.preventDefault();
              $element[0].querySelector('input[type="text"]').setAttribute('readonly', 'readonly');
            }
          }
        });
      },
      templateUrl: 'components/question/_question-listen.html'
    };
  });