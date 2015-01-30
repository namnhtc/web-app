(function (angular) {
  'use strict';

  function SkillConfig($routeProvider, $locationProvider) {
    $routeProvider.when('/skill/:id', {
      templateUrl: 'skill/_skill.html',
      controller: 'SkillCtrl',
      resolve: {
        User: function (Profile) {
          return Profile.getProfile().then(Profile.getProfileDetail).then(Profile.getUser);
        }
      }
    });
  };

  angular.module('skill', ['skill.services', 'skill.directives', 'skill.controllers',
      'skill.tree'
    ])
    .config(['$routeProvider', '$locationProvider', SkillConfig]);

}(window.angular));