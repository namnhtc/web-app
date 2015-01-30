(function(angular) {
  'use strict';

  function LeaderboardHomeDirective() {
    return {
      restrict: 'EA',
      scope: true,
      link: function($scope, $element, $attrs) {},
      controller: 'LeaderboardHomeCtrl',
      templateUrl: 'leaderboard/_leaderboard.html'
    };
  }

  function LeaderboardFbFriendsDirective() {
    return {
      restrict: 'EA',
      link: function($scope, $element) {},
      scope: true,
      controller: 'LeaderboardFbFriendsCtrl',
      templateUrl: 'leaderboard/_search-facebook.html'
    };
  }

  function LeaderboardFriendsDirective() {
    return {
      restrict: 'EA',
      link: function($scope) {},
      scope: true,
      controller: 'LeaderboardFriendsCtrl',
      templateUrl: 'leaderboard/_search.html'
    };
  }

  function LeaderboardEmailInviteDirective() {
    return {
      restrict: 'EA',
      scope: true,
      controller: 'LeaderboardEmailInviteCtrl',
      templateUrl: 'leaderboard/_email-invite.html'
    };
  }

  //DANG SUA
  function LeaderboardFbShareContent() {
    return {
      restrict: 'EA',
      scope: true,
      //controller: 'LeaderboardEmailInviteCtrl',
      templateUrl: 'leaderboard/_search-facebook.html'
    };
  }

  //
  function LeaderboardEmailInviteDirective() {
    return {
      restrict: 'EA',
      scope: true,
      controller: 'LeaderboardEmailInviteCtrl',
      templateUrl: 'leaderboard/_email-invite.html'
    };
  }

  //
  angular.module('leaderboard.directives', [])
    .directive('leaderboardHome', LeaderboardHomeDirective)
    .directive('leaderboardFbFriends', LeaderboardFbFriendsDirective)
    .directive('leaderboardFriends', LeaderboardFriendsDirective)
    .directive('leaderboardEmailInvite', LeaderboardEmailInviteDirective)
    .directive('leaderboardFbShareContent', LeaderboardFbShareContent);
}(window.angular));