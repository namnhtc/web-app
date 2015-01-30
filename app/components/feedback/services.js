(function (angular) {
  'use strict';

  function FeedbackServices($http, $q, $localStorage, API_PHP) {
    var Services = {};

    Services.create = function (data) {
      var auth_token = $localStorage.auth.user.auth_token;
      data.auth_token = auth_token;
      // data = {auth_token, feedbacks: [{
      // "question_log_id":"544f488248177e4c0c8b456f",
      // "user_input":"Test thoi nhe!",
      // "is_auto":true}]}
      var deferred = $q.defer();

      $http.post(API_PHP + '/feedback/create', data)
        .then(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    return Services;
  }

  function FeedbackFactory(FeedbackServices) {
    var Feedback = {};

    /* A feedback is like {
          question_log_id: $scope.question.question_log_id,
          user_answer: $scope.question.userAnswer || '',
          user_note: userNote,
          feedback_type_ids: feedbackTypeIds,
          auto_feedback: false
      } */
    Feedback.list = [];

    Feedback.create = function () {
      var data = {
        feedbacks: JSON.stringify(Feedback.list)
      };
      return FeedbackServices.create(data);
    };

    return Feedback;
  }

  angular.module('feedback.services', []);
  angular.module('feedback.services')
    .factory('FeedbackServices', ['$http', '$q', '$localStorage', 'API_PHP', FeedbackServices])
    .factory('Feedback', ['FeedbackServices', FeedbackFactory]);
}(window.angular));