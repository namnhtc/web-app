'use strict';

angular.module('placement.directives', [])
    .directive('footerQuestion', function() {
	return {
	    strict: 'EA',
	    scope: true,
	    templateUrl: 'placement/_footer.html'
	};
    })
    .directive('footerFailure', function() {
	return {
	    strict: 'EA',
	    scope: true,
	    templateUrl: 'placement/_footer-failure.html'
	};
    })
    .directive('footerSuccess', function() {
	return {
	    strict: 'EA',
	    scope: true,
	    templateUrl: 'placement/_footer-success.html'
	};
    })
    .directive('footerResult', function() {
	return {
	    strict: 'EA',
	    scope: true,
	    templateUrl: 'placement/_footer-result.html'
	};
    });
