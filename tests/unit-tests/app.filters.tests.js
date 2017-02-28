describe('App Filters', function() {
    beforeEach(function() {
        module('app');
    });

    describe('BoolToString filter', function() {
        var filter;
        beforeEach(function() {
            inject(function($injector) {
                filter = $injector.get('$filter')('BoolToString');
            });
        });

        it("true boolean should return 'Yes'", function() {
            expect(filter(true)).toBe("Yes");
        });

        it("false boolean should return 'No'", function() {
            expect(filter(false)).toBe("No");
        });
    });
});