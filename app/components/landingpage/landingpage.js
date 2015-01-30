'use strict';

// Bypass jslint
var angular = window.angular || angular;

angular.module('landingpage', [
    'landingpage.services',
    'landingpage.directives',
    'landingpage.controllers',
    'landingpage.login'
]);
