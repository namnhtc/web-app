'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question.form', [])
    .controller('QuestionFormCtrl', [
	'$scope',
	'$attrs',
	function($scope, $attrs) {
	    // FIXME: Better code logic
	    $scope.tokens = angular.fromJson(angular.toJson($scope.$parent.question.tokens));
	    $scope.tokens.some(function(token, i) {
		$scope.position = i;
		$scope.options = token;
		return (token instanceof Array);
	    });

	    $scope.tokens[$scope.position] = "";

	    $scope.answer = {
		selected: $scope.options[0]
	    };
	    $scope.$watch('answer.selected', function() {
		$scope.$parent.question.userAnswer = $scope.answer.selected;
	    });}
    ])
    .directive('questionForm', function() {
	return {
	    strict: 'EA',
	    scope: {},
	    controller: 'QuestionFormCtrl',
	    templateUrl: 'components/question/_question-form.html'
	};
    });
