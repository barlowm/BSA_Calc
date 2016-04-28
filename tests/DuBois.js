    describe("The Module - DuBois", function () {
        /* Via http://www.medcalc.com/body.html */
        /* Weight of 230 lbs and height of 70 inches should return 2.215 M^2
230 LBS = 104.3262, KG
70 IN = 1.77.8 M

Height =  1.778 M
(H ^ 0.725) =  1.5177509855711429066720555121286

Weight =  104.3262 KG
(W ^ 0.425) =  7.2080400368622059550540993780852

NH * NW = 10.940009869983870335618255528534
NH * NW * .20247 = 2.2150237983756342268526281968622

bsa =  2.215
*/

        var theModule, params, buf, str;
        theModule = new DuBois();

        it("The Module should return an object", function () {
            assert.equal(typeof theModule, "object");
        });

        it(`the Type should return the BSA Calc Type - ${BSA_Consts.DUBOIS}`, function () {
            assert.equal(theModule.type, BSA_Consts.DUBOIS);
        });

        it(`the formula string should return the DuBois Formula - ${formulas[BSA_Consts.DUBOIS]}`, function () {
            assert.equal(theModule.formula(), formulas[BSA_Consts.DUBOIS]);
        });

        params = StdMetMUnits;
        buf = theModule.calc(params);
        it(`BSA Formula Calculation Check Std Metric Units Meter 1 - (Std Values) ${buf}`, function () {
            assert.equal(typeof buf, "object");
        });

        str = "Height = " + params.height.measure + " - " + params.height.units.string + "; ";
        str += "Weight = " + params.weight.measure + " - " + params.weight.units.string + "; ";
        str += "BSA = " + buf.msg + " - M2";
        it(`BSA Formula Calculation Check Std Metric Units Meter 2 - ${str}` , function () {
            assert.equal(buf.msg, "2.215");
        });

        params = StdMetCMUnits;
        buf = theModule.calc(params);
        it(`BSA Formula Calculation Check Std Metric Units CM 1 - (Std Values) ${buf}`, function () {
            assert.equal(typeof buf, "object");
        });

        str = "Height = " + params.height.measure + " - " + params.height.units.string + "; ";
        str += "Weight = " + params.weight.measure + " - " + params.weight.units.string + "; ";
        str += "BSA = " + buf.msg + " - M2";
        it(`BSA Formula Calculation Check Std Metric Units CM 2 - ${str}`, function () {
            assert.equal(buf.msg, "2.215");
        });

        params = StdEngUnits;
        buf = theModule.calc(params);
        it(`BSA Formula Calculation Check Std English Units 1 - (Std Values) ${buf}`, function () {
            assert.equal(typeof buf, "object");
        });

        str = "Height = " + params.height.measure + " - " + params.height.units.string + "; ";
        str += "Weight = " + params.weight.measure + " - " + params.weight.units.string + "; ";
        str += "BSA = " + buf.msg + " - M2";
        it(`BSA Formula Calculation Check Std English Units 2 - ${str}`, function () {
            assert.equal(buf.msg, "2.215");
        });
    });

