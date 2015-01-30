(function (angular) {

  'use strict';

  function ExamFactory($localStorage, $window, ExamServices, Feedback, PlazaServices, Mixpanel, MemoTracker) {
    var exam, questions, answered, wrongAnswers, question, questionPosition,
        hearts, availableItems, examToken, answersLog;

      function start(data) {
        return ExamServices.start(data)
          .then(function(response) {
            init(response.data);
          }, function(response) {
            if (response.status == 422) {
              $window.location = "/";
            }
          });
      }

      function init(data) {
        // questions = data.questions.filter(function(q) {return q.type === 'translate';});
        questions = data.questions;
        hearts = {
          remaining: data.max_hearts_count,
          lost: 0
        };
        availableItems = data.available_items;
        examToken = data.exam_token;
        answered = 0;
        questionPosition = 0;
        question = questions[questionPosition];
        answersLog = {};
        Feedback.list = [];

        Mixpanel.track('screen Exam');
        MemoTracker.track('start exam lesson')
      }

      function getQuestions() {
        return questions;
      }

      function getQuestion() {
        return question;
      }

      function getQuestionPosition() {
        return questionPosition;
      }

      function getWrongAnswers() {
        return wrongAnswers;
      }

      function getAnswered() {
        return answered;
      }

      function getHearts() {
        return hearts;
      }

      function getIsAutoFeedback() {
        if ($localStorage.appSetting.auto_feedback_types.indexOf(question.type) >= 0) {
          return true;
        }

        return false;
      }

      function getAvailableItems() {
        return availableItems;
      }

      function check(isCorrect) {
        answered += 1;
        var log = {};
        log[question.question_log_id] = true;
        answersLog[question.question_log_id] = true;
      }

      function next() {
        questionPosition += 1;
        question = questions[questionPosition];
      }

      function skip() {
        hearts.remaining = hearts.remaining - 1;
        hearts.lost += 1;
        answered += 1;

        var log = {};
        log[question.question_log_id] = false;
        answersLog[question.question_log_id] = false;
      }

      function logFeedback(data) {
        // data = {question_log_id, user_input, is_auto=true}
        Feedback.list.push(data);
      }

      function sendFeedbackLogs() {
        Feedback.create();
      }

      function useItem(item) {
        var requestData = {
          'base_item_id': item
        };

        if (item === 'health_potion') {
          if (hearts.lost > 0) {
            hearts.lost = hearts.lost - 1;
            hearts.remaining = hearts.remaining + 1;
            PlazaServices.use(requestData)
              .then(function(response) {
                delete availableItems[item];
              });
          }
        }
      }

      function checkState() {
        if (hearts.remaining < 0) {
          Mixpanel.track('screen FailLesson');
          MemoTracker.track('fail exam lesson')
          return {
            isFinished: true,
            isFail: true
          };
        }

        if (answered === questions.length) return {
          isFinished: true,
          isFail: false
        };

        return {
          isFinished: false,
          isFail: false
        };
      }

      function finish(data) {
        MemoTracker.track('finish exam lesson')
        data.examToken = examToken;
        data.logs = JSON.stringify(answersLog);
        return ExamServices.finish(data).then(function(response) {
          question = response.data;
        });
      }

      function fail(data) {
        data.examToken = examToken;
        data.logs = JSON.stringify(answersLog);
        return ExamServices.fail(data);
      }

      return {
        start: start,
        skip: skip,
        finish: finish,
        fail: fail,
        next: next,
        check: check,
        answered: getAnswered,
        wrongAnswers: getWrongAnswers,
        questions: getQuestions,
        question: getQuestion,
        questionPosition: getQuestionPosition,
        hearts: getHearts,
        checkState: checkState,
        logFeedback: logFeedback,
        sendFeedbackLogs: sendFeedbackLogs,
        isAutoFeedback: getIsAutoFeedback,
        availableItems: getAvailableItems,
        useItem: useItem
      };
  }

  function ExamServices($http, $q, $localStorage, API_PHP) {
    var Services = {};

    Services.start = function(data) {
      var deferred = $q.defer();
      var auth_token = $localStorage.auth.user.auth_token;

      var requestData = {
        type: data.type,
        auth_token: auth_token,
        device: 'web'
      };

      if (data.type === "lesson") {
        requestData.lesson_number = data.lesson_number;
        requestData.skill_id = data.skill_id;
      } else if (data.type === "checkpoint") {
        requestData.checkpoint_position = data.checkpoint_position;
      } else if (data.type === 'shortcut') {
        requestData.skill_id = data.skill_id;
      }

      $http.post(API_PHP + '/exam/start', requestData)
        .then(function(response) {
          deferred.resolve(response);
        }, function(response) {
          deferred.reject(response);
        });

      // $http.get('/assets/data/exam_1.json').then(function(response) {
      //     deferred.resolve(response);
      // });

      return deferred.promise;
    };

    Services.finish = function(data) {
      var deferred = $q.defer();
      var auth_token = $localStorage.auth.user.auth_token;

      var requestData = {
        type: data.type,
        auth_token: auth_token,
        exam_token: data.examToken,
        device: 'web',
        answers: data.logs
      };

      if (data.type === "lesson") {
        requestData.lesson_number = data.lesson_number;
        requestData.skill_id = data.skill_id;
      } else if (data.type === "checkpoint") {
        requestData.checkpoint_position = data.checkpoint_position;
      } else if (data.type === 'shortcut') {
        requestData.skill_id = data.skill_id;
      }

      $http.post(API_PHP + '/exam/finish', requestData)
        .then(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;

    };

    Services.fail = function(data) {
      var deferred = $q.defer();
      var auth_token = $localStorage.auth.user.auth_token;

      var requestData = {
        type: data.type,
        auth_token: auth_token,
        exam_token: data.examToken,
        device: 'web',
        answers: data.logs,
        checkpoint_position: data.checkpoint_position
      };

      $http.post(API_PHP + '/exam/fail', requestData)
        .then(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    return Services;
  }

  angular.module('exam.services', []);
  angular.module('exam.services')
    .factory('Exam', ['$localStorage', '$window', 
      'ExamServices', 'Feedback', 'PlazaServices', 'Mixpanel', 'MemoTracking', ExamFactory])
    .factory('ExamServices', ['$http', '$q', '$localStorage', 'API_PHP', ExamServices]);
}(window.angular));