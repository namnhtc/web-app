(function (angular) {
  'use strict';

  function ProfileConfig($routeProvider) {
    $routeProvider.when('/profile/:id', {
      templateUrl: 'profile/_index.html',
      controller: 'ProfileFriendCtrl',
      resolve: {
        profileDetail: function ($route, ProfileServices) {
          return ProfileServices.profileDetail({
            'friend_id': $route.current.params.id
          });
        }
      }
    });

    $routeProvider.when('/profile', {
      templateUrl: 'profile/_index.html',
      controller: 'ProfileCtrl',
      resolve: {
        profile: function (Profile) {
          return Profile.getProfile();
        },
        profileDetail: function (Profile) {
          return Profile.getProfileDetail();
        }
      }
    });
  }

  function ProfileFriendCtrl($scope, profileDetail) {
    $scope.profileDetail = profileDetail.data;

    var ownedCourses = $scope.profileDetail.owned_courses;
    $scope.ownedCourses = [];

    var i = 0;
    for (i = 0; i < ownedCourses.length; i = i + 2) {
      $scope.ownedCourses.push([ownedCourses[i], ownedCourses[i + 1] || '']);
    }
  }

  function ProfileCtrl($scope, $routeParams, Profile) {
    $scope.profile = Profile.user;
    $scope.profileDetail = Profile.detail;

    var ownedCourses = $scope.profileDetail.owned_courses;
    $scope.ownedCourses = [];

    var i = 0;
    for (i = 0; i < ownedCourses.length; i = i + 2) {
      $scope.ownedCourses.push([ownedCourses[i], ownedCourses[i + 1] || '']);
    }
  }

  angular.module('profile', ['profile.services'])
    .controller('ProfileCtrl', ['$scope', '$routeParams', 'Profile', ProfileCtrl])
    .controller('ProfileFriendCtrl', ['$scope', 'profileDetail',
      ProfileFriendCtrl
    ])
    .config(['$routeProvider', ProfileConfig]);
}(window.angular));