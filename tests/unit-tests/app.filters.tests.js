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

        it("should return 'Yes' for true", function() {
            expect(filter(true)).toBe("Yes");
        });

        it("should return 'No' for false", function() {
            expect(filter(false)).toBe("No");
        });
    });

    describe('ConvertDistanceCategoryToString filter', function() {
        var filter;
        beforeEach(function () {
            inject(function ($injector) {
                filter = $injector.get('$filter')('ConvertDistanceCategoryToString');
            });
        });

        it("should return 'One-Way' for int 0", function() {
            expect(filter(0)).toBe("One-Way");
        });

        it("should return 'Round-Trip' for int 1", function() {
            expect(filter(1)).toBe("Round-Trip");
        });
    });

    describe('HumanizeDifficulty filter', function() {
        var filter;
        beforeEach(function() {
            inject(function($injector) {
                filter = $injector.get('$filter')('HumanizeDifficulty');
            });
        });

        it("should return string 'Easy' when int is 0", function() {
            expect(filter(0)).toBe("Easy");
        });

        it("should return string 'Moderate' when int is 1", function() {
            expect(filter(1)).toBe("Moderate");
        });

        it("should return string 'Hard' when int is 2", function() {
            expect(filter(2)).toBe("Hard");
        });

        it("should return string 'Very Hard' when int is 3", function() {
            expect(filter(3)).toBe("Very Hard");
        });
    });

    describe('HumanizeSeason filter', function() {
        var filter;
        beforeEach(function () {
            inject(function ($injector) {
                filter = $injector.get('$filter')('HumanizeSeason');
            });
        });

        it("should return January - January for '1-1'", function() {
            expect(filter("1-1")).toBe("January - January");
        });

        it("should return January - November for '1-11", function() {
            expect(filter("1-11")).toBe("January - November");
        });

        it("should return November - January for '11-1", function() {
            expect(filter("11-1")).toBe("November - January");
        });

        it("should return May - June for '5-6'", function() {
            expect(filter("5-6")).toBe("May - June");
        });

        it("should show 'Year-round' for ranges that include all months", function() {
            const YEAR_ROUND = "Year-round";
            expect(filter("1-12")).toBe(YEAR_ROUND);
            expect(filter("12-11")).toBe(YEAR_ROUND);
            expect(filter("2-1")).toBe(YEAR_ROUND);
            expect(filter("6-5")).toBe(YEAR_ROUND);
        });
    });

    describe('ProcessElevationToString filter', function() {
        var filter;
        beforeEach(function () {
            inject(function ($injector) {
                filter = $injector.get('$filter')('ProcessElevationToString');
            });
        });

        it("should return 'minimal' for less than 100 elevation", function() {
            expect(filter(0)).toBe("minimal");
            expect(filter(99)).toBe("minimal");
            expect(filter(-99)).toBe("minimal");
        });

        it("should return '_m' for 100 or greater metres", function() {
            expect(filter(100)).toBe("100m");
            expect(filter(1000)).toBe("1000m");
            expect(filter(-100)).toBe("100m");
        });
    });
});