(function(angular) {
  'use strict';

  function QuestionNameCtrl($scope) {
    $scope.question = $scope.$parent.question;
  }

  function QuestionNameDirective() {
    function directiveLink($scope, $element) {
      $element[0].querySelector('input[type="text"]').focus();
      $element.on('keydown', function(e) {
        if (e.keyCode === 13) {
          if ($scope.answer && $scope.answer.length > 0) {
            e.preventDefault();
            $element[0].querySelector('input[type="text"]').setAttribute('readonly', 'readonly');
          }
        }
      });
    }

    return {
      strict: 'EA',
      replace: true,
      scope: {
        answer: '='
      },
      controller: 'QuestionNameCtrl',
      link: directiveLink,
      templateUrl: 'components/question/_question-name.html'
    };
  }

  angular.module('question.name', []);
  angular.module('question.name')
    .controller('QuestionNameCtrl', ['$scope', QuestionNameCtrl])
    .directive('questionName', QuestionNameDirective);
}(window.angular));