(function (angular) {
  'use strict';

  function PlazaServices($http, $q, $localStorage, API) {
    var Services = {};

    Services.get = function () {
      var deferred = $q.defer();

      var authToken = $localStorage.auth.user.auth_token;
      $http.get(API + '/plaza_items?platform=web&localize=vi&auth_token=' + authToken)
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    /*
     * data = {base_item_id: , quantity: }
     */
    Services.buy = function (data) {
      var deferred = $q.defer();

      var authToken = $localStorage.auth.user.auth_token;

      data.auth_token = authToken;
      data.platform = 'web';
      data.localize = 'vi';

      $http.post(API + '/plaza_items/' + data.base_item_id + '/buy', data)
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    /*
     * data = {base_item_id: }
     */
    Services.use = function (data) {
      var deferred = $q.defer();

      var authToken = $localStorage.auth.user.auth_token;
      var userId = $localStorage.auth.user._id;

      data.auth_token = authToken;
      data.platform = 'web';
      data.localize = 'vi';

      $http.post(API + '/plaza_items/' + data.base_item_id + '/use', data)
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };
    return Services;
  }

  function PlazaFactory(PlazaServices, $localStorage) {
    var Plaza = {};

    Plaza.data = {};

    Plaza.get = function (data) {
      return PlazaServices.get(data).then(function (response) {
        Plaza.data = response.data;
      });
    };

    Plaza.buy = function (data) {
      return PlazaServices.buy(data)
        .then(function (response) {
          $localStorage.auth.profile_detail.virtual_money = response.data.virtual_money;
        })
        .then(Plaza.get);
    };

    Plaza.use = function (data) {
      return PlazaServices.use(data)
        .then(function (response) {});
    };

    return Plaza;
  }

  angular.module('plaza.services', [])
    .factory('Plaza', ['PlazaServices', '$localStorage', PlazaFactory])
    .factory('PlazaServices', ['$http', '$q', '$localStorage', 'API', PlazaServices]);

}(window.angular));