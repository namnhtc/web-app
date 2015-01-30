'use strict';

angular.module('feedback.reportModal', [])
  .directive('reportDropdown', ['$localStorage', '$document', function($localStorage, $document) {
    return {
      restrict: 'EA',
      scope: true,
      controller: function($scope) {
        var userNote = '';
        var options = $localStorage.appSetting.feedback_types[$scope.question.type];
        $scope.options = options.map(function(option) {
          return {
            id: option.id,
            name: option.name,
            checked: false
          };
        });

        $scope.send = function() {
          var checkedOptions = $scope.options.filter(function(option) {
            if (option.text) {
              userNote = option.text
            };
            return option.checked === true;
          }).map(function(option) {
            return option.id;
          });

          $scope.$parent.userFeedback(userNote, checkedOptions);
        };
      },
      templateUrl: 'components/feedback/_report-dropdown.html'
    };
  }]);