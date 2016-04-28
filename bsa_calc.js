/*
 * These constants are normally included in the parent application module which includes the various classes here as part of the application.
 * This keeps everything in the same "App" NameSpace so the "global" namespace remains clean of anything the application is doing.
 */
    const formulas = [];
    const BSA_Consts = {
        CAPPED:             "Capped",
        DUBOIS:             "DuBois",
        MOSTELLER:          "Mosteller",
        HAYCOCK:            "Haycock",
        GEHAN_GEORGE:       "Gehan George",
        BOYD:               "Boyd",
        ENGLISH_H:          { idx: 10, string: "IN"},
        ENGLISH_W:          { idx: 11, string: "LBS"},
        METRIC_CM:          { idx: 12, string: "CM"},
        METRIC_M:           { idx: 13, string: "M"},
        METRIC_KG:          { idx: 14, string: "KG"},
        MALE:               "M",
        FEMALE:             "F",
        UPPER_RIGHT_ARM:    { string: "Upper Right Arm", pct: 6 },
        LOWER_RIGHT_ARM:    { string: "Lower Right Arm", pct: 4 },
        RIGHT_HAND_FINGERS: { string: "Right Hand and Fingers", pct: 3 },
        RIGHT_THIGH:        { string: "Right Thigh", pct: 12 },
        LOWER_RIGHT_LEG:    { string: "Lower Right Leg", pct: 6 },
        RIGHT_FOOT:         { string: "Right Foot", pct: 3 },
        UPPER_LEFT_ARM:     { string: "Upper Left Arm", pct: 6 },
        LOWER_LEFT_ARM:     { string: "Lower Left Arm", pct: 4 },
        LEFT_HAND_FINGERS:  { string: "Left Hand and Fingers", pct: 3 },
        LEFT_THIGH:         { string: "Left Thigh", pct: 12 },
        LOWER_LEFT_LEG:     { string: "Lower Left Leg", pct: 6 },
        LEFT_FOOT:          { string: "Left Foot", pct: 3 }
    };

    const BSA_Types = [
      BSA_Consts.CAPPED
    , BSA_Consts.DUBOIS
    , BSA_Consts.MOSTELLER
    , BSA_Consts.HAYCOCK
    , BSA_Consts.GEHAN_GEORGE
    , BSA_Consts.BOYD
    ];



    formulas[BSA_Consts.CAPPED] = "Capped BSA";
    // http://www.medcalc.com;
    formulas[BSA_Consts.DUBOIS] = "0.20247 x height (m)<sup>0.725</sup> x weight (kg)<sup>0.425</sup>";
    formulas[BSA_Consts.MOSTELLER] = "<span style=\"white-space: nowrap; font-size:larger\">&radic;<span style=\"text-decoration:overline;\">&nbsp;(Height(cm) * Weight(kg))/3600 &nbsp;</span></span>";
    formulas[BSA_Consts.HAYCOCK] = "0.024265 x (Height(cm)<sup>0.3964</sup>) x (Weight(kg)<sup>0.5378</sup>)";
    formulas[BSA_Consts.GEHAN_GEORGE] = "0.0235 x (Height(cm)<sup>0.42246</sup>) x (Weight(kg)<sup>0.51456</sup>)";
    formulas[BSA_Consts.BOYD] = "0.0003207 * (Height(cm)<sup>0.3</sup>) * Weight(g) <sup>(0.7285-0.0188 log Weight(g))</sup>";


/* 
 * Constants for testing
 * Height: 70 in, 177.8 cm, 1.778 m
 * Weight: 250 lb, 113.398 kg
 */
const StdEngUnits = {
        gender: BSA_Consts.MALE, 
        height : { measure : 70, units:BSA_Consts.ENGLISH_H},
        weight : { measure : 230, units:BSA_Consts.ENGLISH_W}
    };
const StdMetCMUnits = {
        gender: BSA_Consts.MALE, 
        height : { measure : 177.8, units:BSA_Consts.METRIC_CM},
        weight : { measure : 230, units:BSA_Consts.ENGLISH_W}
    };

const StdMetMUnits = {
        gender: BSA_Consts.MALE, 
        height : { measure : 1.778, units:BSA_Consts.METRIC_M},
        weight : { measure : 230, units:BSA_Consts.ENGLISH_W}
    };

class BSA {
    constructor (type) {
        this.formulaStr = "BSA Calculation Formula Type unknown";
        this.type = type;
        if (formulas.hasOwnProperty(type)) {
            this.formulaStr = formulas[type];
        }
    }

    formula() {
        return this.formulaStr;
    }

    multiply(x, y) {
        var m = Decimal(x);
        return Number(m.times(y).toFixed(4).valueOf());
    }

    pow(x,y) {
        var m = Decimal(x);
        return Number(m.pow(y).valueOf());
    }

    stdFracFixed(x) {
        return Number(Decimal(x).toFixed(3).valueOf());
    }

/*
 * Because of known limitations in javascript math capabilities the "big.js" library is used
 * to perform accurate math calculations (see: https://github.com/MikeMcl/big.js)
 */


    English2Metric_HeightM(measure) {
        // 1 inch == 0.0254 m
        return this.multiply(measure, 0.0254);
    }

    English2Metric_HeightCM(measure) {
        // 1 inch == 2.54 cm
        return this.multiply(measure, 2.54);
    }

    English2Metric_Weight(measure) {
        // 1 pound == 0.453592 kg
        return this.multiply(measure, 0.45359237);
    }

    MetricM2MetricCM_Height(measure) {
        return this.multiply(measure, 100);
    }

    validNumCk(num) {
        let tmp = parseInt(num, 10);
        if (isNaN(tmp)) {
            return false;
        }
        if (tmp <= 0) {
            return false;
        }
        return true;
    }

    validAge(obj) {
        if (validNumCk(obj.age) && (obj.age < 110)) {
            return obj;
        }
        return `INValid Age - ${obj.age}`;
    }


    ck4GenderParam(obj) {
        if ("undefined" === typeof obj) {
            return "Missing parameter object";
        }
        if ("undefined" === typeof obj.gender) {
            return "Missing gender parameter";
        }
        if (obj.gender !== "" && obj.gender !== BSA_Consts.MALE && obj.gender !== BSA_Consts.FEMALE) {
            return "Invalid gender specified";
        }
        return obj;
    }

    ck4HeightParam(obj) {
        if ("undefined" === typeof obj) {
            return "Missing parameter object";
        }
        if ("undefined" === typeof obj.height) {
            return "Missing height parameter";
        }
        if ("undefined" === typeof obj.height.measure) {
            return "Missing height measurements parameter";
        }
        if (!this.validNumCk(obj.height.measure)) {
            return "Invalid height measurements parameter";
        }

        if ("undefined" === typeof obj.height.units) {
            return "Missing height units parameter";
        }
        if (obj.height.units !== BSA_Consts.ENGLISH_H && 
            obj.height.units !== BSA_Consts.METRIC_CM && 
            obj.height.units !== BSA_Consts.METRIC_M) {
            return "Invalid height units parameter specified";
        }
        return obj;
    }

    ck4WeightParam(obj) {
        if ("undefined" === typeof obj) {
            return "Missing parameter object";
        }
        if ("undefined" === typeof obj.weight) {
            return "Missing weight parameter";
        }
        if ("undefined" === typeof obj.weight.measure) {
            return "Missing weight measurements parameter";
        }
        if (!this.validNumCk(obj.weight.measure)) {
            return "Invalid weight measurements parameter";
        }

        if ("undefined" === typeof obj.weight.units) {
            return "Missing weight units parameter";
        }
        if (obj.weight.units !== BSA_Consts.ENGLISH_W && obj.weight.units !== BSA_Consts.METRIC_KG) {
            return "Invalid weight units parameter specified";
        }
        return obj;
    }


    /**
     *  Convert any height/weight into standardized Metric units (m/kg).
     *  BSA calculation formulas will convert from m/kg to cm/g as necessary.
     */
    standardizeH_W(obj) {
        let ck = this.ck4HeightParam(obj);
        if ("string" === typeof ck) {
            return ck;
        }
        ck = this.ck4WeightParam(obj);
        if ("string" === typeof ck) {
            return ck;
        }

        let sObj = (JSON.parse(JSON.stringify(obj)));   // We want to leave the original "obj" intact, so here's a simple/fast deep clone method for a JSON object
        let h = sObj.height.measure;
        let u = sObj.height.units.idx;
        let w = sObj.weight.measure;
        let h1 = h;
        let w1 = w;

        if (BSA_Consts.ENGLISH_H.idx === u) {
            h1 = this.English2Metric_HeightM(h);
        }
        else if (BSA_Consts.METRIC_CM.idx === u) {
            h1 = this.multiply(h, 0.01);
        }

        u = sObj.weight.units.idx;
        if (BSA_Consts.ENGLISH_W.idx === u) {
            w1 = this.English2Metric_Weight(w);
        }

        sObj.height.measure = h1;
        sObj.height.units = BSA_Consts.METRIC_M;
        sObj.weight.measure = w1;
        sObj.weight.units = BSA_Consts.METRIC_KG;
        return sObj;
    }


    calc ( { 
        height = { }, 
        weight = { }
    } ) {
        let rslt;
        let bmi = "";
        let obj = { height: height, weight: weight };
        let BMI_Std = this.standardizeH_W(obj);
        if ("string" === typeof BMI_Std) {
            return { success: false, msg: BMI_Std };
        }
        let BMI_Height = BMI_Std.height.measure;
        let BMI_Weight = BMI_Std.weight.measure;

        return { success: true, msg: "We Passed", BMI : bmi };
    };
}


/**
 *  Requires only height (in KG) and weight (in M)
 *  http://www.medcalc.com/body.html
 *  0.20247 x height (m)<sup>0.725</sup> x weight (kg)<sup>0.425</sup>;
 ****/

class DuBois extends BSA {
    constructor() {
        super(BSA_Consts.DUBOIS);
    }

    calc(obj) {
        let rslt, h, w, bsa, sObj;
        rslt = super.calc(obj);
        if (!rslt.success) {
            return rslt;
        }
        sObj = this.standardizeH_W(obj);

        h = sObj.height.measure;
        h = this.pow(h, 0.725);

        w = sObj.weight.measure;
        w = this.pow(w, 0.425);

        bsa = Decimal(h).times(Decimal(w));
        bsa = bsa.times(0.20247);
        bsa = this.stdFracFixed(bsa);
        rslt.msg = bsa;
        return rslt;
    }
}


/**
 *  Requires only height (in KG) and weight (in CM)
 *  http://www.medcalc.com/body.html
 *  sqrt((height (cm) x weight (kg))/3600)
 ****/
class Mosteller extends BSA {
    constructor() {
        super(BSA_Consts.MOSTELLER);
    }

    calc(obj) {
        let rslt, h, w, x, bsa, sObj;
        rslt = super.calc(obj);
        if (!rslt.success) {
            return rslt;
        }
        sObj = this.standardizeH_W(obj);
        h = sObj.height.measure;
        h = this.MetricM2MetricCM_Height(h);
        w = sObj.weight.measure;
        x = Decimal(h).times(Decimal(w));
        x = Decimal(x).div(3600);
        bsa = x.sqrt();
        bsa = this.stdFracFixed(bsa);
        rslt.msg = bsa;
        return rslt;
    }
}

/**
 *  Requires only height (in KG) and weight (in CM)
 *  http://www.medcalc.com/body.html
 *  0.024265 x height (cm)0.3964 x weight (kg)0.5378
 ****/
class Haycock extends BSA {
    constructor() {
        super(BSA_Consts.HAYCOCK);
    }

    calc(obj) {
        let rslt, h, w, x, bsa, sObj;
        rslt = super.calc(obj);
        if (!rslt.success) {
            return rslt;
        }
        sObj = this.standardizeH_W(obj);
        h = sObj.height.measure;
        h = this.MetricM2MetricCM_Height(h);
        h = this.pow(h, 0.3964);

        w = sObj.weight.measure;
        w = this.pow(w, 0.5378);

        x = Decimal(h).times(Decimal(w));
        bsa = Decimal(x).times(.024265);
        bsa = this.stdFracFixed(bsa);

        rslt.msg = bsa;
        return rslt;
    }
}

