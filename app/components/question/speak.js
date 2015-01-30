'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question.speak', [])
    .controller('QuestionSpeakCtrl', [
        '$scope',
        '$attrs',
	'ExamSharedData',
        function($scope, $attrs, ExamSharedData) {
	    $scope.question = $scope.$parent.exam.currentQuestion.question;
        }
    ])
    .directive('questionSpeak', function() {
        return {
            strict: 'EA',
            replace: true,
	    scope: {
		answer: "=answer"
	    },
            controller: 'QuestionSpeakCtrl',
            templateUrl: 'skill/lesson/question/question_speak.html'
        };
    });
