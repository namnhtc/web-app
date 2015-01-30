'use strict';

angular.module('skill.services', [])
  .factory('Skill', [
    '$localStorage', 'Mixpanel', 'MemoTracking',
    function($localStorage, Mixpanel, MemoTracker) {
      var Skill = {};

      Skill.skills = function() {
        MemoTracker.track('start exam lesson');
        return $localStorage.auth.skills;
      };
      Skill.skill = function(skillId) {
        MemoTracker.track('lessons list');
        return $localStorage.auth.skills.filter(function(skill) {
          return skill._id === skillId;
        })[0];
      };

      return Skill;
    }
  ]);