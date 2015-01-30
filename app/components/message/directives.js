(function(angular) {
  'use strict';
  function MessageListCtrl($scope, $localStorage, Message) {
    var messages = $localStorage.messages;
    if (messages) $scope.messages = messages;
    $scope.shouldOpen = messages && messages.message_ids && messages.message_ids.length > 0;
    $scope.openMessage = function(messages) {
      Message.open(messages);
    };
  }

  angular.module('message.directives', [])
    .directive('messageList', function() {
      return {
        strict: 'EA',
        scope: true,
        controller: 'MessageListCtrl',
        link: function($scope, $element, $attr) {
          $scope.closeMessageList = function() {
            $scope.shouldOpen = false;
            $scope.openMessage($scope.messages);
          }
        },
        templateUrl: 'components/message/_messages.html'
      };
    }).
  controller('MessageListCtrl', ['$scope', '$localStorage', 'Message', MessageListCtrl]);
}(window.angular));