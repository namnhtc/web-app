'use strict';

angular.module('diff-match-patch', [])
    .factory('dmp', ['$window', function($window) {
	var diff_match_patch = diff_match_patch || $window.diff_match_patch;
	var dmp = new diff_match_patch();
	dmp.DIFF_EQUAL = 0;
	dmp.DIFF_INSERT = 1;
	dmp.DIFF_DELETE = -1;
	return dmp;
    }]);
