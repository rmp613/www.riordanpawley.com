
QUnit.module("noteProcessor", function(hooks){
   hooks.beforeEach(function(){
      noteProcessor._charts.alien = {};
      noteProcessor._charts.goods = {};
   });

   QUnit.test("UNIT: noteProcessor exists", function(assert){
      assert.ok(noteProcessor);
   });

   QUnit.test("UNIT: noteProcessor exists", function(assert){
      console.log(noteProcessor);
   });

   QUnit.test("UNIT: processLine() returns an error message if the string is empty", function(assert){
      var result = noteProcessor._processLine("");
      var expectedResult = "I have no idea what you are talking about <br>";
     
      assert.equal(result, expectedResult);
   });

   QUnit.test("UNIT: processLine() returns an empty string if the input line was a valid statement rather than a question", function(assert){
      var result = noteProcessor._processLine("asdf is IV");
      var expectedResult = "";
     
      assert.equal(result, expectedResult);
   });
   //TODO WRTIE THIS TEST
   QUnit.test("UNIT: processLine() returns the correct response to the question on the line", function(assert){
      var result = noteProcessor._processLine("asdf is IV");
      var expectedResult = "";
     
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
      
      var beforeIs = "qwer asdf Iron";
      var wordsAfterIs = [150, "Credits"];
      var result = noteProcessor._determineGoodsValue(beforeIs, wordsAfterIs);
      assert.equal(result, 10);
   });
});
