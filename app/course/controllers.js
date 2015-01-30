(function (angular) {
  'use strict';

  function CourseCtrl($scope, $window, Course) {

    Course.listCourses().then(function () {
      $scope.courses = Course.courses;
    });

    $scope.selectCourse = function (courseId) {
      var requestData = { base_course_id: courseId };
      Course.selectCourse(requestData)
        .then(function () {
          $window.location.href = '/';
        });
    };
  }

  angular.module('course.controllers', [])
    .controller('CourseCtrl', ['$scope', '$window', 'Course', CourseCtrl]);
}(window.angular));