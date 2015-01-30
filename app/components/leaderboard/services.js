(function (angular) {
  'use strict';

  function LeaderboardServices($http, $q, $localStorage, API) {
    var Services = {};

    Services.fbFriends = function () {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;
      var userId = $localStorage.auth.user._id;
      var fbAccessToken = $localStorage.auth.facebook.accessToken;

      var data = {
        auth_token: authToken,
        fb_access_token: fbAccessToken
      };
      $http.post(API + '/users/' + userId + '/search_facebook_friends', data)
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    Services.friends = function (data) {
      // data = {keywords:, page:}
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;
      var userId = $localStorage.auth.user._id;

      data.auth_token = authToken;
      data.page = data.page || 1;

      $http.post(API + '/users/' + userId + '/search_friends', data)
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    /*
     * data = {friend_id:}
     */
    Services.follow = function (data) {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;
      var userId = $localStorage.auth.user._id;

      data.auth_token = authToken;

      $http.post(API + '/users/' + userId + '/follow_friend', data)
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    /*
     * data = {friend_id:}
     */
    Services.unfollow = function (data) {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;
      var userId = $localStorage.auth.user._id;
      data.auth_token = authToken;

      $http.post(API + '/users/' + userId + '/unfollow_friend', data)
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    Services.inviteMail = function (data) {
      // data = {email: 'aoesnuth'}
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;
      data.auth_token = authToken;

      $http.post(API + '/users/invite_by_email', data)
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    return Services;
  }

  function LeaderboardFactory($q, $localStorage, LeaderboardServices, Facebook) {
    var Leaderboard = {};

    Leaderboard.fbFriends = function (data) {
      return Leaderboard.fbLogin()
        .then(LeaderboardServices.fbFriends);
    };

    Leaderboard.friends = function (data) {
      return LeaderboardServices.friends(data);
    };

    Leaderboard.follow = function (data) {
      return LeaderboardServices.follow(data)
        .then(function (response) {
          $localStorage.auth.profile_detail.following_user_ids = response.data.following_user_ids;
        });
    };

    Leaderboard.unfollow = function (data) {
      return LeaderboardServices.unfollow(data);
    };

    Leaderboard.inviteMail = function (data) {
      return LeaderboardServices.inviteMail(data);
    };

    Leaderboard.fbLogin = function () {
      var deferred = $q.defer();

      Facebook.getLoginStatus(facebookLoginStatusReceived);

      function facebookLoginStatusReceived(response) {
        if (response.status === 'connected') {
          $localStorage.auth.facebook = response.authResponse;
          deferred.resolve(response);
        } else {
          Facebook.login(facebookLoginCallback)
        }
      }

      function facebookLoginCallback(response) {
        if (response.status != 'unknown' || response.status != 'not_authorized') {
          $localStorage.auth.facebook = response.authResponse.accessToken;
          deferred.resolve(response);
        } else {
          deferred.reject(response);
        }
      }

      return deferred.promise;
    };

    return Leaderboard;
  }

  angular.module('leaderboard.services', [])
    .factory('Leaderboard', ['$q', '$localStorage', 'LeaderboardServices', 'Facebook',
      LeaderboardFactory
    ])
    .factory('LeaderboardServices', ['$http', '$q', '$localStorage', 'API',
      LeaderboardServices
    ]);

}(window.angular));