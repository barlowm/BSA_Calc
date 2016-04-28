describe("Body Surface Area Calculations", function () {
    var theModule, params, buf;
    describe("Base Module", function () {
        it("should exist as a closure function", function () {
            assert.equal(typeof BSA, "function");
        });
        theModule = new BSA();
        it("should return an object", function () {
            assert.equal(typeof theModule, "object");
        });

        it("formula should return a string - " + theModule.formula(), function () {
            assert.equal(typeof theModule.formula(), "string");
        });

        buf = theModule.standardizeH_W();
        it("standardizeH_W Parameter Check 1 - (No Params) " + buf, function () {
            assert.equal(typeof buf, "string");
        });

        params = {};
        buf = theModule.standardizeH_W(params);
        it("standardizeH_W Parameter Check 2 - (Empty Params) " + buf, function () {
            assert.equal(typeof buf, "string");
        });
        params = {gender : ""};
        buf = theModule.standardizeH_W(params);
        it("standardizeH_W Parameter Check 3 - (Empty Gender Param) " + buf, function () {
            assert.equal(typeof buf, "string");
        });

        params = {gender : "", height : {} };
        buf = theModule.standardizeH_W(params);
        it("standardizeH_W Parameter Check 4 - (Empty Gender, Height Params) " + buf, function () {
            assert.equal(typeof buf, "string");
        });

        params = {gender : "", height : {}, weight : {} };
        buf = theModule.standardizeH_W(params);
        it("standardizeH_W Parameter Check 5 - (Empty Gender, Height, Weight Params) " + buf, function () {
            assert.equal(typeof buf, "string");
        });


        params = {gender : "", height : {measure: "", units : ""}, weight : {measure: "", units : ""} };
        buf = theModule.standardizeH_W(params);
        it("standardizeH_W Parameter Check 6 - (Full Params but all Empty) " + buf, function () {
            assert.equal(typeof buf, "string");
        });


        params = {gender : "", 
            height : {measure: "32", units : BSA_Consts.ENGLISH_H}, 
            weight : {measure: "", units : ""} };
        buf = theModule.standardizeH_W(params);
        it("standardizeH_W Parameter Check 7 - (Valid Height, Empty Weight) " + buf, function () {
            assert.equal(typeof buf, "string");
        });


        params = {gender : "", 
            height : {measure: "50", units : BSA_Consts.METRIC_M}, 
            weight : {measure: "40", units : BSA_Consts.METRIC_KG} };
        var buf1 = theModule.standardizeH_W(params);
        it("standardizeH_W Parameter Check 8 - (Valid Height, Valid Weight) " + buf1, function () {
            assert.equal(typeof buf1, "object");
        });
        it("standardizeH_W Parameter Check 8a - (Valid Height, Valid Weight) Height Same Math Check", function () {
            assert.equal(buf1.height.measure, 50);
        });
        it("standardizeH_W Parameter Check 8b - (Valid Height, Valid Weight) Weight Same Math Check", function () {
            assert.equal(buf1.weight.measure, 40);
        });

        params = {gender : "", 
            height : {measure: "39.3700787", units : BSA_Consts.ENGLISH_H}, 
            weight : {measure: "40", units : BSA_Consts.METRIC_KG} };
        var buf2 = theModule.standardizeH_W(params);
        it("standardizeH_W Parameter Check 9 - (Valid Height, Valid Weight) " + buf2, function () {
            assert.equal(typeof buf2, "object");
        });
        it("standardizeH_W Parameter Check 9a - (Valid Height, Valid Weight) Height Conversion Math Check", function () {
            assert.equal(buf2.height.measure, 1);
        });
        it("standardizeH_W Parameter Check 9b - (Valid Height, Valid Weight) Weight Same Math Check", function () {
            assert.equal(buf2.weight.measure, 40);
        });

        params = {gender : "", 
            height : {measure: "39.3700787", units : BSA_Consts.ENGLISH_H}, 
            weight : {measure: "2.20462", units : BSA_Consts.ENGLISH_W} };
        var buf3 = theModule.standardizeH_W(params);
        it("standardizeH_W Parameter Check 10 - (Valid Height, Valid Weight) " + buf3, function () {
            assert.equal(typeof buf3, "object");
        });
        it("standardizeH_W Parameter Check 10a - (Valid Height, Valid Weight) Height Conversion Math Check", function () {
            assert.equal(buf3.height.measure, 1);
        });
        it("standardizeH_W Parameter Check 10b - (Valid Height, Valid Weight) Weight Conversion Math Check", function () {
            assert.equal(buf3.weight.measure, 1);
        });

        params = {gender : "", 
            height : {measure: "50", units : BSA_Consts.METRIC_CM}, 
            weight : {measure: "40", units : BSA_Consts.METRIC_KG} };
        var buf4 = theModule.standardizeH_W(params);
        it("standardizeH_W Parameter Check 11 - (Valid Height, Valid Weight) " + buf4, function () {
            assert.equal(typeof buf4, "object");
        });
        it("standardizeH_W Parameter Check 11a - (Valid Height, Valid Weight) Height Convert Math Check (CM-M)", function () {
            assert.equal(buf4.height.measure, 0.5);
        });
        it("standardizeH_W Parameter Check 11b - (Valid Height, Valid Weight) Weight Same Math Check", function () {
            assert.equal(buf4.weight.measure, 40);
        });
    });
});