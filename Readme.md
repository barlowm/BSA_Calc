npm install - Makes sure all the dependancies are in place
grunt Check - Runs Lint on the code (with EcmaScript 6 enabled), 
              Builds the code (transpiles with Babel),
              Runs Mocha using the Testrunner file to check for defects

BSA_Calc.js is the main code base (Decimal.js is an assistant library for math calculations).
After making changes to BSA_Calc.js, run grunt from the command line:

D:\\WebRoot\\_CODE_\\BSA_Calc>grunt

This will build the actual code modules by running the babel transpiler on the BSA_Calc.js code modules
The resulting runnable code will be deposited into the DIST folder.

To test any changes from a web browser run:

file:///D:/WebRoot/_CODE_/BSA_Calc/tests/testrunner.html
