(function (angular) {

  'use strict';

  function QuestionTranslateCtrl($scope, ngAudio, Words) {

    function tokenize(inputString) {
      var tokens = inputString.split(' ');
      return tokens.map(function (token) {
        var currentToken = token.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        // token = 'aString'
        var transformedToken = {
          text: currentToken
        };
        var objective = objectiveIds.filter(function (objective) {
          return objective.text === currentToken;
        })[0];

        var specialObjective = specialObjectiveIds.filter(function (objective) {
          return objective.text === currentToken;
        })[0];

        transformedToken.isObjective = !!objective;
        transformedToken.isSpecialObjective = !!specialObjective;

        if (transformedToken.isObjective) {
          transformedToken._id = objective._id;
        } else if (transformedToken.isSpecialObjective) {
          transformedToken._id = specialObjective._id;
        } else {
          transformedToken._id = '';
        }

        return transformedToken; // {_id:, text:, isObjective:, isSpecialObjective:}
      }).map(function (token) {
        // {_id:, text:, isObjective:, isSpecialObjective:, definitions,...}
        return Words.getWord(token);
      });
    }

    $scope.translate = $scope.$parent.question;
    var specialObjectiveIds = angular.copy($scope.translate.special_objective_ids) || [];
    var objectiveIds = angular.copy($scope.translate.objective_ids) || [];
    $scope.translate_tokens = tokenize($scope.translate.question);

    if ($scope.translate.normal_question_audio) {
      var normalFile = ngAudio.load($scope.translate.normal_question_audio);

      $scope.speaker = {
        play: function () {
          normalFile.play();
        }
      };
      $scope.speaker.play();
    }
  }

  function QuestionTranslateDirective($timeout, ngAudio, Words) {
    return {
      strict: 'EA',
      replace: true,
      scope: {
        answer: '='
      },
      link: function ($scope, $element) {
        $element.find('textarea').eq(0)[0].focus();
        $element.on('keydown', function (e) {
          if (e.keyCode === 13) {
            if ($scope.answer && $scope.answer.length > 0) {
              e.preventDefault();
              $element.find('textarea').eq(0).attr('readonly', 'readonly');
            }
          }
        });

        // FIXME: Good enough code
        $scope.showDefinitionDropdown = function (e) {
          var element = angular.element(e.target);

          $timeout(function () {
            element.triggerHandler('click');

            var wordSound = ngAudio.load(element.attr('data-sound'));
            wordSound.play();
            Words.revealWords({
              words: JSON.stringify([element.attr('data-word-id')])
            });
          }, 300);
        };

        $scope.closeDefinitionDropdown = function (e) {
          var element = angular.element(e.target);
          $timeout(function () {
            element.triggerHandler('click');
          }, 300);
        };
      },
      controller: 'QuestionTranslateCtrl',
      templateUrl: 'components/question/_question-translate.html'
    };
  }

  angular.module('question.translate', []);
  angular.module('question.translate')
    .controller('QuestionTranslateCtrl', ['$scope', 'ngAudio', 'Words', QuestionTranslateCtrl])
    .directive('questionTranslate', QuestionTranslateDirective);

}(window.angular));