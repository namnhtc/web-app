'use strict';

describe('Service', function() {
    // load modules
    beforeEach(module('diff-match-patch'));

    describe('dmp', function() {
	var Dmp, scope;

	beforeEach(inject(function($rootScope, dmp) {
	    scope = $rootScope.$new();
	    Dmp = dmp;
	}));

	it('check if dmp exists', function() {
	    expect(Dmp).toBeDefined();
	});

	it('check if diff_main exists', function() {
	    expect(Dmp.diff_main).toBeDefined();
	});

	it('should have default values', function() {
	    expect(Dmp.DIFF_INSERT).toEqual(1);
	    expect(Dmp.DIFF_EQUAL).toEqual(0);
	    expect(Dmp.DIFF_DELETE).toEqual(-1);
	});

	it('check output format', function() {
	    var diffs = Dmp.diff_main('fundamental', 'fandemetel');
	});
    });
});
