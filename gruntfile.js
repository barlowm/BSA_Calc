var mode = "Dev";
// mode = "Prod";

module.exports = function exports(grunt) {
    var eslint_config = ".eslintrc";
    if ("Dev" === mode) {
        eslint_config = ".eslintrcDev";
    }

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    src: {
        files: [
            "./decimal.js",
            "./bsa_calc.js"
        ]
    },


    babel: {
        options: {
            filename: "Babel_Errors",
            presets: "es2015",
            sourceMap: true
        },
        dist: {
            files: [
                {
                    expand: true,
                    src: ["<%= src.files %>"],
                    dest: "dist/"
                }
            ]
        }
    },

    eslint: {
        target: "./bsa_calc.js",
        options: {
            "ecmaVersion": 6,
            config:     eslint_config,
            format:     require("eslint-html-reporter"),
            outputFile: "./reports/output/eslint-output.html"
        }
    },

    mocha_config: {
        reporter: "./node_modules/good-mocha-html-reporter",
        timeout: 15000,
        bail: false,
        savePath: "",
        filename: "report.html",
        mode: "Verbose"
    },

    mocha: {
      all: {
        src: ["tests/testrunner.html"]
      },
      options: {
        dest: "./reports/output/mocha.html",
        run: true
      }
    }
  });

  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-mocha");
  grunt.loadNpmTasks("grunt-babel");

  grunt.registerTask("default", ["babel"]);
  grunt.registerTask("Check", ["eslint", "babel", "mocha"]);
};