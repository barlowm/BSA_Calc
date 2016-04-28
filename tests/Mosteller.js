    describe("The Module - Mosteller", function () {
        /* Via http://www.medcalc.com/body.html */
        /* Weight of 230 lbs and height of 70 inches should return 2.27 M^2
230 LBS = 104.3262, KG
70 IN = 177.8 CM

Height =  177.8 CM
Weight =  104.3262 KG
Height * Weight = 18549.19836
(H*W)/3600 = 5.1525551
SQRT((H*W)/3600) = 2.2699240295657473831429117618427
bsa =  2.27
*/

        var theModule, params, buf, str;
        theModule = new Mosteller();

        it("The Module should return an object", function () {
            assert.equal(typeof theModule, "object");
        });

        it("the Type should return the BSA Calc Type", function () {
            assert.equal(theModule.type, BSA_Consts.MOSTELLER);
        });

        it("the formula string should return the Mosteller Formula - " + formulas[BSA_Consts.MOSTELLER], function () {
            assert.equal(theModule.formula(), formulas[BSA_Consts.MOSTELLER]);
        });
        params = {gender : "", 
            height : {measure: "70", units : BSA_Consts.ENGLISH_H}, 
            weight : {measure: "230", units : BSA_Consts.ENGLISH_W} };
        buf = theModule.calc(params);
        it("BSA Formula Calculation Check 1 - (Std Values) " + buf, function () {
            assert.equal(typeof buf, "object");
        });

        str = "Height = " + params.height.measure + " - " + params.height.units.string + "; ";
        str += "Weight = " + params.weight.measure + " - " + params.weight.units.string + "; ";
        str += "BSA = " + buf.msg + " - M2";
        it("BSA Formula Calculation Check 2 - " + str , function () {
            assert.equal(buf.msg, "2.27");
        });
    });

