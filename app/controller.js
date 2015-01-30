(function (angular) {
  'use strict';

  function AppCtrl($scope, $localStorage, $sessionStorage, $location, $window, EcoTracker,
    AuthService) {
    $scope.auth = $localStorage.auth || {
      loggedIn: false,
      trial: false
    };

    function loginConfirmed(e, data) {
      $scope.auth = {
        loggedIn: true,
        user: data.user,
        trial: data.is_trial
      };
      $localStorage.auth = $scope.auth;
    }

    function logoutConfirmed(e, data) {
      $localStorage.$reset();
      $sessionStorage.$reset();
      $scope.auth = {
        loggedIn: false,
        trial: false
      };
      $localStorage.auth = $scope.auth;
      $location.path('/');
    }

    $scope.chartOptions = {
      ///Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: true,

      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",

      //Number - Width of the grid lines
      scaleGridLineWidth: 1,

      //Boolean - Whether the line is curved between points
      bezierCurve: false,

      //Number - Tension of the bezier curve between points
      bezierCurveTension: 0.4,

      //Boolean - Whether to show a dot for each point
      pointDot: true,

      //Number - Radius of each point dot in pixels
      pointDotRadius: 4,

      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 1,

      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,

      //Boolean - Whether to show a stroke for datasets
      datasetStroke: true,

      //Number - Pixel width of dataset stroke
      datasetStrokeWidth: 2,

      //Boolean - Whether to fill the dataset with a colour
      datasetFill: false,

      tooltipTemplate: "<%= value %>",

      tooltipFillColor: "#810C15",

      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    };

    $scope.getNumber = function (num) {
      return new Array(num);
    };

    if (!$scope.auth.loggedIn) {
      var path = $location.path();
      if (path.indexOf('/referral') < 0) {
        logoutConfirmed();
      }
    }

    EcoTracker.init();
    $scope.$on('event:auth-loginConfirmed', loginConfirmed);
    $scope.$on('event:auth-logoutConfirmed', logoutConfirmed);
  }

  angular.module('app.controllers', ['ngStorage'])
    .controller('AppCtrl', ['$scope', '$localStorage', '$sessionStorage', '$location', '$window',
      'EcoTracking', 'AuthService', AppCtrl
    ]);
}(window.angular));