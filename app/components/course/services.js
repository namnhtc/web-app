(function (angular) {
  'use strict';

  function CourseServices($http, $q, $location, $localStorage, API, API_PHP) {
    var Services = {};

    Services.listCourses = function () {
      var deferred = $q.defer();
      var userId = $localStorage.auth.user._id;
      var authToken = $localStorage.auth.user.auth_token;

      $http.get(API + '/users/' + userId + '/available_courses?auth_token=' + authToken)
        .then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    Services.listUserCourses = function () {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;
      var userId = $localStorage.auth.user._id;
      $http.get(API + '/users/' + userId + '/owned_courses?auth_token=' + authToken)
        .then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    Services.selectCourse = function (data) {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;
      var userId = $localStorage.auth.user._id;

      // data = {base_course_id: 1254}
      data.auth_token = authToken;

      $http.post(API + '/users/' + userId + '/select_course', data)
        .error(function (data, status, headers, config) {
          if (status === 400) {
            $location.path('/course');
          }
        }).then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    return Services;
  }

  function CourseFactory(CourseServices, $localStorage) {
    var Course = {};

    Course.listCourses = function () {
      return CourseServices.listCourses()
        .then(function (response) {
          Course.courses = response.data.users;
        });
    };

    Course.listUserCourses = function () {
      return CourseServices.listUserCourses()
        .then(function (response) {
          Course.userCourses = $localStorage.auth.user.list_courses || response.data.users;
        });
    };

    Course.selectCourse = function (data) {
      return CourseServices.selectCourse(data)
        .then(function (response) {
          Course.course = response.data.current_course;
          $localStorage.auth.current_course = Course.course;
        });
    };

    Course.getCurrentCourse = function () {
      return $localStorage.auth.user.current_course_id;
    };

    return Course;
  }

  angular.module('course.services', [])
    .factory('Course', ['CourseServices', '$localStorage', CourseFactory])
    .factory('CourseServices', ['$http', '$q', '$location', '$localStorage', 'API', 'API_PHP',
      CourseServices
    ]);
}(window.angular));