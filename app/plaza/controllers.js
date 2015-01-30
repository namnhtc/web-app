(function(angular) {
  'use strict';

  function PlazaCtrl($scope, Plaza, Profile) {
    $scope.profile = Profile.user;
    $scope.profileDetail = Profile.detail;
    $scope.expChart = {
      labels: $scope.profileDetail.exp_chart.days,
      datasets: [{
        label: "",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "#848484",
        pointColor: "#810c15",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: $scope.profileDetail.exp_chart.exp
      }]
    };

    // $rootScope.$broadcast('event-profileLoaded', Profile.detail);
      
    $scope.plaza = Plaza.data;

    $scope.buy = function(id) {
      var data = {};
      var item = $scope.plaza.items.filter(function(item) {
        return item._id === id;
      })[0];

      if (item) {
        data.base_item_id = id;
        data.quantity = 1;
        Plaza.buy(data).then(function() {
          $scope.plaza = Plaza.data;
        });
      }
    };
  }

  angular.module('plaza.controllers', [])
    .controller('PlazaCtrl', ['$scope', 'Plaza', 'Profile', PlazaCtrl]);

}(window.angular));