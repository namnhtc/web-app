'use strict';

angular.module('placement', [
    'placement.controllers',
    'placement.services',
    'placement.directives',
    'question'
]).config(['$routeProvider', '$locationProvider', PlacementConfig]);


function PlacementConfig($routeProvider, $locationProvider) {
    $routeProvider.when('/placement/:id', {
	templateUrl: 'placement/_index.html',
	controller: 'PlacementCtrl'
    });
}
