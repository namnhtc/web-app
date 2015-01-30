(function (angular) {

  'use strict';

  function PlacementTestFactory(PlacementServices, Mixpanel, MemoTracker) {
    var PlacementTest = {};

    PlacementTest.start = function (data) {
      return PlacementServices.start(data)
        .then(function (response) {
          PlacementTest.question = response.data;
          MemoTracker.track('start exam placement test');
        });
    };

    PlacementTest.skip = function (data) {
      return PlacementServices.submitAnswer(data)
        .then(function (response) {
          PlacementTest.question = response.data;
        });
    };

    PlacementTest.submitAnswer = function (data) {
      return PlacementServices.submitAnswer(data)
        .then(function (response) {
          PlacementTest.question = response.data;
          if (PlacementTest.question.exp_chart) {
            MemoTracker.track('finish exam placement test')
          } else {
            MemoTracker.track('quit exam placement test');
          }
          // question = {
          //     "finish_exam_bonus_exp": 0,
          //     "leveled_up": false,
          //     "heart_bonus_exp": 3,
          //     "exp_chart": {
          //  "days": ["Sa","Su","Mo","Tu","We","Th","Fr"],
          //  "exp": [0,0,0,0,1010,0,0]
          //     },
          //     "combo_days": 1,
          //     "affected_skill": {
          //  "_id": "en-vi_dai_tu_quan_he",
          //  "order": 1,
          //  "title": "Đại từ quan hệ",
          //  "slug": "Đại từ Q.hệ",
          //  "theme_color": "#99cc00"
          //     },
          //     "num_affected_skills": 37,
          //     "bonus_coin": 2
          // };
        });
    }

    return PlacementTest;
  }

  function PlacementTestServices($http, $q, API_PHP) {
    return {
      start: function (data) {
        var deferred = $q.defer();

        var requestData = {
          device: 'web',
          auth_token: data.auth_token,
          speak_enabled: false
        };

        $http.post(API_PHP + '/placement_test/start', requestData)
          .then(function (response) {
            deferred.resolve(response);
          });

        return deferred.promise;
      },
      submitAnswer: function (data) {
        var deferred = $q.defer();

        data.device = 'web';
        data.speak_enabled = false;

        $http.post(API_PHP + '/placement_test/submit_answer', data)
          .then(function (response) {
            deferred.resolve(response);
          });

        return deferred.promise;
      }
    };
  }

  angular.module('placement.services', [])
  angular.module('placement.services')
    .factory('PlacementTestFactory', ['PlacementTestServices', 'Mixpanel', 'MemoTracking',
      PlacementTestFactory
    ])
    .factory('PlacementTestServices', ['$http', '$q', 'API_PHP', PlacementTestServices]);

}(window.angular));