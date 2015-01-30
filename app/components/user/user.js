(function (angular) {
  'use strict';

  function UserServices($http, $q, $localStorage) {
    var Services = this;

    var apiEndpoint = 'http://staging.memo.edu.vn/v2/api/users';

    Services.create = function (data) {
      if (!data) return false;

      return $http.post(apiEndpoint, data)
        .success(function (data, status, headers, config) {
          return data;
        }).error(function (data, status, headers, config) {
          return data;
        });
    };

    return Services;
  }

  angular.module('user', []);
  angular.module('user')
    .factory('UserServices', ['$http', '$q', '$localStorage', UserServices]);
}(window.angular));