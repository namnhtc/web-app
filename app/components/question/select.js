(function (angular) {
  'use strict';

  //+ Jonas Raoni Soares Silva
  //@ http://jsfromhell.com/array/shuffle [v1.0]
  function shuffle(o) { //v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j],
      o[j] = x);
    return o;
  };

  function QuestionSelectCtrl($scope, $attrs) {
    $scope.question = $scope.$parent.question;
    $scope.options = [];
    var options = $scope.question.options.slice(0);
    var target = options.filter(function (option) {
      return option.text === $scope.question.hint;
    })[0];
    var idx = options.indexOf(target);
    options.splice(idx, 1);
    $scope.options = shuffle([].concat([target, options[0], options[1]]));

    $scope.select = {
      userAnswer: ''
    };
  }

  function QuestionSelectDirective(Words, ngAudio) {
    function linkFn($scope, $element) {
      $scope.selectAnswer = function (number) {
        // DOM manipulation

        angular.element(document.querySelectorAll('.selected')).removeClass('selected');
        angular.element(document.querySelector('.image.image-' + number)).addClass(
          'selected');

        // FIXME: No two-way binding
        $scope.select.userAnswer = $scope.options[number - 1].text;
        $scope.question.userAnswer = $scope.select.userAnswer;

        var option = $scope.options[number - 1];
        var word = Words.getWord(option);
        var soundFile;
        if (word && word.sound) {
          soundFile = ngAudio.load(word.sound);
          soundFile.play();
        }
      };

      $element.attr('tabindex', '0');
      $element[0].focus();

      $element.on('keydown', function (e) {
        if (e.keyCode === 8) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      });

      $element.on('keyup', function (e) {
        if (e.key == "1" || e.keyCode === 49) {
          $scope.selectAnswer(1);
        } else if (e.key == "2" || e.keyCode === 50) {
          $scope.selectAnswer(2);
        } else if (e.key == "3" || e.keyCode === 51) {
          $scope.selectAnswer(3);
        }
      });
    }

    return {
      strict: 'EA',
      replace: true,
      scope: {
        answer: "=answer"
      },
      controller: 'QuestionSelectCtrl',
      link: linkFn,
      templateUrl: 'components/question/_question-select.html'
    };
  }

  angular.module('question.select', [])
    .controller('QuestionSelectCtrl', ['$scope', '$attrs', QuestionSelectCtrl])
    .directive('questionSelect', ['Words', 'ngAudio', QuestionSelectDirective]);

}(window.angular));