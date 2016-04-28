    describe("The Module - Haycock", function () {
        /* Via http://www.medcalc.com/body.html */
        /* Weight of 230 lbs and height of 70 inches should return 2.303 M^2
230 LBS = 104.3262, KG
70 IN = 177.8 CM

Height =  177.8 CM
(H ^ 0.3964) = 

Weight =  104.3262 KG
(W ^ 0.5378) = 

NH * NW = 
NH * NW * .024265  = 

bsa =  2.303 m2
*/

        var theModule, params, buf, str;
        theModule = new Haycock();

        it("The Module should return an object", function () {
            assert.equal(typeof theModule, "object");
        });

        it("the Type should return the BSA Calc Type", function () {
            assert.equal(theModule.type, BSA_Consts.HAYCOCK);
        });

        it("the formula string should return the Haycock Formula - " + formulas[BSA_Consts.HAYCOCK], function () {
            assert.equal(theModule.formula(), formulas[BSA_Consts.HAYCOCK]);
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
            assert.equal(buf.msg, "2.303");
        });
    });

