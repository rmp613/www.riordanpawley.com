
QUnit.module("noteProcessor", function(hooks){
   hooks.beforeEach(function(){
      noteProcessor._charts.alien = {};
      noteProcessor._charts.goods = {};
   });

   QUnit.test("UNIT: noteProcessor exists", function(assert){
      assert.ok(noteProcessor);
   });

   QUnit.test("UNIT: processLine() returns an error message if the string is empty", function(assert){
      var result = noteProcessor._processLine("");
      var expectedResult = "I have no idea what you are talking about <br>";
     
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: processLine() returns an empty string if the input line was a valid statement rather than a question", function(assert){
      var result = noteProcessor._processLine("asdf is V");
      var expectedResult = "";
     
      assert.equal(result, expectedResult);
   });
   
   QUnit.test("UNIT: processLine() returns an error string if the input string tries to set an alien word to something other than a single roman numeral", function(assert){
      var result = noteProcessor._processLine("asdf is IV");
      var expectedResult = noteProcessor._alienChartErrorString;
     
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: respondToHowMuch() returns the roman numeral translation to the alien words", function(assert){
      noteProcessor._charts.alien = {
         asdf: "X",
         qwer: "L",
         poug: "I"
      }

      var ten = "asdf", fifty = "qwer", one = "poug";
      var wordsAfterIs = [ten, fifty, one]
      var result = noteProcessor._respondToHowMuch(wordsAfterIs);
      var expectedResult = wordsAfterIs.join(" ") + " is " + 41 + "<br>";
     
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: respondToHowMuch() returns the roman numeral translation to the alien words", function(assert){
      noteProcessor._charts.alien = {
         asdf: "X",
         qwer: "L",
         poug: "I"
      }

      var ten = "asdf", fifty = "qwer", one = "poug";
      var wordsAfterIs = [ten, fifty, one];
      var result = noteProcessor._respondToHowMuch(wordsAfterIs);
      var expectedResult = wordsAfterIs.join(" ") + " is " + 41 + "<br>";
     
      assert.equal(result, expectedResult);
   });

   
   QUnit.test("UNIT: respondToHowMuch() returns an error message if the string contains an invalid roman numeral string", function(assert){
      noteProcessor._charts.alien = {
         asdf: "X"
      }

      var ten = "asdf";
      var wordsAfterIs = [ten, ten, ten, ten];
      var result = noteProcessor._respondToHowMuch(wordsAfterIs);
      var expectedResult = wordsAfterIs.join(" ") + " is " + noteProcessor._romanToDecimalErrorString + "<br>";
     
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: respondToHowMuch() returns an error message when the input contains alien words that are not understood", function(assert){
      var invalidWord = "asdfa";
      var ten = "asdf";
      noteProcessor._charts.alien = {
         asdf: "X"
      }

      var wordsAfterIs = [invalidWord, invalidWord, ten, ten];
      var result = noteProcessor._respondToHowMuch(wordsAfterIs);
      var expectedResult = wordsAfterIs.join(" ") + " is " + noteProcessor._alienToRomanErrorString + "<br>";

      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: respondToHowMany() returns the correct response to a valid question", function(assert){
      var ten = "asdf";
      var iron = "Iron";
      noteProcessor._charts.goods = {
         Iron: "10"
      }
      noteProcessor._charts.alien = {
         asdf: "X"
      }
      var wordsAfterIs = [ten, ten, ten, iron];
      var result = noteProcessor._respondToHowMany(wordsAfterIs);
      var expectedResult = wordsAfterIs.join(" ") + " is " + 300 + " Credits<br>";
     
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: respondToHowMany() returns an error message if the input contains invalid alien words", function(assert){
      var ten = "fire";
      var iron = "Iron";
      noteProcessor._charts.goods = {
         Iron: "10"
      }
      noteProcessor._charts.alien = {
         asdf: "X"
      }
      var wordsAfterIs = [ten, iron];
      var result = noteProcessor._respondToHowMany(wordsAfterIs);
      var expectedResult = wordsAfterIs.join(" ") + " is " + noteProcessor._alienToRomanErrorString + "<br>";
     
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: respondToHowMany() returns an error message if the input contains an invalid roman numeral string", function(assert){
      var five = "qwer";
      var iron = "Iron";
      noteProcessor._charts.goods = {
         Iron: "20"
      }
      noteProcessor._charts.alien = {
         qwer: "V"
      }
      var wordsAfterIs = [five, five, five, five, iron];
      var result = noteProcessor._respondToHowMany(wordsAfterIs);
      var expectedResult = wordsAfterIs.join(" ") + " is " + noteProcessor._romanToDecimalErrorString + "<br>";
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: respondToHowMany() returns an error message if the input contains an invalid roman numeral string", function(assert){
      
      var wordsAfterIs = [];
      var result = noteProcessor._respondToHowMany(wordsAfterIs);
      var expectedResult = wordsAfterIs.join(" ") + " is " + noteProcessor._isBlankErrorString + "<br>";
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: determineGoodsValue() determines the value of goods based on input", function(assert){
     
      noteProcessor._charts.alien = {
         qwer: "V",
         asdf: "X"
      }
      
      var beforeIs = "asdf qwer Iron";
      var wordsAfterIs = [150, "Credits"];
      var result = noteProcessor._determineGoodsValue(beforeIs, wordsAfterIs);
      assert.equal(result, 10);
   });

   QUnit.test("UNIT: determineGoodsValue() returns an error message if the amount of goods is unreadable", function(assert){
     
      noteProcessor._charts.alien = {
         qwer: "V",
         asdf: "X"
      }
      
      var beforeIs = "fdas ghdf Iron";
      var wordsAfterIs = [150, "Credits"];
      var result = noteProcessor._determineGoodsValue(beforeIs, wordsAfterIs);
      
      var expectedResult = beforeIs.split(" ");
      expectedResult.pop();
      expectedResult = expectedResult.join(" ") + " is " + noteProcessor._alienToRomanErrorString;
     
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: determineGoodsValue() returns an error message if there is no input price for the goods", function(assert){
     
      noteProcessor._charts.alien = {
         qwer: "V",
         asdf: "X"
      }
      
      var beforeIs = "qwer asdf";
      var wordsAfterIs = ["Credits"];
      var result = noteProcessor._determineGoodsValue(beforeIs, wordsAfterIs);
      var expectedResult = noteProcessor._generalErrorString;
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: alienToRoman() the correct string of roman numerals corresponding to the alien words", function(assert){
     
      noteProcessor._charts.alien = {
         qwer: "V",
         asdf: "X"
      }
      var five = 'qwer', ten = 'asdf';
      var alienWords = [five, five, ten, ten, ten];
      var result = noteProcessor._alienToRoman(alienWords);
      var expectedResult = "VVXXX";
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: alienToRoman() returns alienToRomanErrorString if the alien words could not be understood", function(assert){
      noteProcessor._charts.alien = {
         qwer: "V",
         asdf: "X"
      }
      var nonsense = 'fdas', ten = 'asdf';
      var alienWords = [nonsense, nonsense, ten, ten, ten];
      var result = noteProcessor._alienToRoman(alienWords);
      var expectedResult = noteProcessor._alienToRomanErrorString;
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: romanToDecimal() returns the decimal value of the input roman numeral string", function(assert){
      var romanNumeralString = 'MMMCML';
      var result = noteProcessor._romanToDecimal(romanNumeralString);
      var expectedResult = 3950;
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: romanToDecimal() returns romanToDecimalErrorString if the input roman numeral string was invalid", function(assert){
      var romanNumeralString = 'XXXXLCM';
      var result = noteProcessor._romanToDecimal(romanNumeralString);
      var expectedResult = noteProcessor._romanToDecimalErrorString;
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: alienToDecimal() returns the decimal value of an alien string", function(assert){
      noteProcessor._charts.alien = {
         qwer: "I",
         zxcv: "V",
         asdf: "X"
      }
      var one = 'qwer', five = 'zxcv', ten = 'asdf';
      var alienWords = [ten, ten, ten, five, one, one, one];
      var result = noteProcessor._alienToDecimal(alienWords);
      var expectedResult = 38;
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: alienToDecimal() returns an error string if the input alien string turned into an invalid roman numeral string", function(assert){
      noteProcessor._charts.alien = {
         fdsa: "I",
         zxcv: "V",
         asdf: "X",
         qwer: "L"
      }
      var nonsense = 'nonsense', 
         one = "fdsa", 
         five = "zxcv", 
         ten = 'asdf',
         fifty = "qwer";

      var alienWords = [nonsense, nonsense, ten, ten, ten];
      var result = noteProcessor._alienToDecimal(alienWords);
      var expectedResult = noteProcessor._alienToRomanErrorString;
      assert.equal(result, expectedResult);

      var alienWords = [one, fifty];
      var result = noteProcessor._alienToDecimal(alienWords);
      var expectedResult = noteProcessor._romanToDecimalErrorString;
      assert.equal(result, expectedResult);

      var alienWords = [one, one, one, one];
      var result = noteProcessor._alienToDecimal(alienWords);
      var expectedResult = noteProcessor._romanToDecimalErrorString;
      assert.equal(result, expectedResult);
   });


   QUnit.test("UNIT: alienToDecimal() returns an error string if the input alien string resulted in invalid roman numerals", function(assert){
      noteProcessor._charts.alien = {
         asdf: "X"
      }
      var nonsense = 'fdas', ten = 'asdf';
      var alienWords = [ten, ten, ten, ten];
      var result = noteProcessor._alienToDecimal(alienWords);
      var expectedResult = noteProcessor._romanToDecimalErrorString;
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: isValidRomanNumeralString() returns true if the numeral string is valid", function(assert){
      var testNumeralString = "XXXD";
      var result = noteProcessor._isValidRomanNumeralString(testNumeralString);
      var expectedResult = true;
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: isValidRomanNumeralString() returns false if the numeral string is invalid", function(assert){
      var testNumeralString = "XXXDDDD";
      var result = noteProcessor._isValidRomanNumeralString(testNumeralString);
      var expectedResult = false;
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: inChart() returns true if the key is in the input subchart of charts", function(assert){
      var key = "X";
      var subchart = "romanNumerals";
      var result = noteProcessor._inChart(subchart, key);
      var expectedResult = true;
      assert.equal(result, expectedResult);
   });

    QUnit.test("UNIT: inChart() returns true if the key is in the input subchart of charts", function(assert){
      var key = "IX";
      var subchart = "romanNumerals";
      var result = noteProcessor._inChart(subchart, key);
      var expectedResult = false;
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: canBeSubtracted() returns a boolean which tells you if the first numeral can be subtracted from the second numeral", function(assert){
      var result = noteProcessor._canBeSubtracted(1, 5);
      assert.ok(result);
      result = noteProcessor._canBeSubtracted(1, 10);
      assert.ok(result)
      result = noteProcessor._canBeSubtracted(10, 100);
      assert.ok(result);
      result = noteProcessor._canBeSubtracted(50, 100);
      assert.notOk(result);
   });
});
