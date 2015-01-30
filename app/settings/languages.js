(function (angular) {

  'use strict';

  function SettingLanguageCtrl($scope, Course) {

    Course.listUserCourses().then(function () {
      $scope.userCourses = Course.userCourses;
      $scope.course = $scope.userCourses.filter(function (course) {
        return Course.getCurrentCourse() === course._id;
      })[0] || {};
    });

    $scope.saveChanges = function() {
      Course.selectCourse({base_course_id: $scope.course._id});
      //alert('Bạn đã thay đổi thành công !!!');
    };
  }

  angular.module('settings.languages', [])
    .controller('SettingLanguageCtrl', ['$scope', 'Course', SettingLanguageCtrl]);

}(window.angular));