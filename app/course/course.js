'use strict';

angular.module('course', [
    'course.services',
    'course.controllers'
]).config([
    '$routeProvider',
    '$locationProvider', CourseConfig]);

function CourseConfig($routeProvider, $locationProvider) {
    $routeProvider.when('/course', {
	templateUrl: 'course/_index.html',
	controller: 'CourseCtrl'
    });
}
