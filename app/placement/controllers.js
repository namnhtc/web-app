(function (angular) {
  'use strict';

  function PlacementTestCtrl($scope, $location, PlacementTest, Question, Sound) {
    $scope.questionTpl = '';
    $scope.footerTpl = 'footer';

    var questionTplId = {
      form: 'questionForm',
      judge: 'questionJudge',
      listen: 'questionListen',
      name: 'questionName',
      select: 'questionSelect',
      speak: 'questionSpeak',
      translate: 'questionTranslate',
      failure: 'questionFailure',
      success: 'questionSuccess'
    };

    var footerTplId = {
      footer: 'footer',
      failure: 'footerFailure',
      success: 'footerSuccess',
      result: 'footerResult'
    };

    $scope.question = {};
    $scope.result = {};
    $scope.userAnswer = '';
    $scope.exam_token = '';

    $scope.quit = function () {
      delete $scope.question;
      $location.url('/');
    };

    $scope.skip = function () {
      Sound.playHeartLostSound();
      $scope.result = Question.skip($scope.question, '');
      $scope.questionState = 'answered';
      $scope.footerTpl = "footerResult";
    };

    $scope.check = function () {
      if ($scope.question.userAnswer && $scope.question.userAnswer.length > 0) {
        $scope.result = Question.check($scope.question, $scope.question.userAnswer);
        $scope.footerTpl = "footerResult";
        if ($scope.result.result) {
          Sound.playCorrectSound();
        } else {
          Sound.playHeartLostSound();
        }
        $scope.questionState = 'answered';
      }
    };

    $scope.nextQuestion = function () {

      var requestData = {
        auth_token: $scope.auth.user.auth_token,
        exam_token: $scope.exam_token
      };

      var tmp = {};
      tmp[$scope.question.question_log_id] = $scope.result.result;
      requestData.answer = angular.toJson(tmp);

      $scope.footerTpl = "footer";
      $scope.questionTpl = "";

      PlacementTest.submitAnswer(requestData)
        .then(function () {
          var responseData = PlacementTest.question;
          $scope.questionState = '';
          if (responseData.question) {
            $scope.question = responseData.question;
            $scope.question.userAnswer = "";
            $scope.questionTpl = questionTplId[$scope.question.type];
            $scope.num_questions = responseData.num_questions;
            $scope.result = {};
          } else {
            $scope.question = responseData;
            if ($scope.question.finish_exam_bonus_exp === 0 &&
              $scope.question.num_affected_skills.length === 0) {

              Sound.playFailSound();
              $scope.questionTpl = 'questionFailure';
              $scope.footerTpl = 'footerFailure';
            } else {
              Sound.playFinishSound();
              $scope.questionTpl = 'questionSuccess';
              $scope.footerTpl = 'footerSuccess';
              $scope.expChart = {
                labels: $scope.question.exp_chart.days,
                datasets: [{
                  label: "",
                  fillColor: "rgba(220,220,220,0.2)",
                  strokeColor: "#848484",
                  pointColor: "#810c15",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(220,220,220,1)",
                  data: $scope.question.exp_chart.exp
                }]
              };
              $scope.result = {};
            }
          }
        });
    };

    PlacementTest.start($scope.auth.user)
      .then(function () {
        $scope.question = PlacementTest.question.question;
        $scope.exam_token = PlacementTest.question.exam_token;
        $scope.num_questions = PlacementTest.question.num_questions;
        $scope.total_num_questions = PlacementTest.question.total_num_questions;
        $scope.question.userAnswer = "";
        $scope.questionTpl = questionTplId[$scope.question.type];
      });

    $scope.keyUpHandler = function (e) {
      if (e.keyCode === 8) {
        return false;
      }

      if (e.keyCode === 13) {
        if ($scope.question.userAnswer && $scope.question.userAnswer.length > 0) {
          if ($scope.questionState && $scope.questionState === 'answered') {
            // $scope.check();
            $scope.nextQuestion();
          } else {
            $scope.check();
          }
        }
      }
    };
  }

  angular.module('placement.controllers', [])
    .controller('PlacementCtrl', [
      '$scope', '$location', 'PlacementTestFactory', 'Question', 'Sound', PlacementTestCtrl
    ]);

}(window.angular));