QUnit.module("utility", function(){

   QUnit.test("utility exists", function(assert){
      assert.ok(utility);
   });

   QUnit.test("UNIT: removeWhiteSpace(): returns the input string without any surrounding whitespace", function(assert){
      var result = utility.removeWhiteSpace(" word ");
      var expectedResult = "word";
      assert.equal(result, expectedResult)
   });

   QUnit.test("UNIT: getExtension(): returns extension of the input fileString", function(assert){
      var result = utility.getExtension("text.txt");
      var expectedResult = "txt";
      assert.equal(result, expectedResult)
   });

   QUnit.test("UNIT: wordCount(): returns the number of words in the input string", function(assert){
      var result = utility.wordCount("1 2 three four");
      var expectedResult = 4;
      assert.equal(result, expectedResult)
   });

   QUnit.test("UNIT: splitAndTrim(): returns an array of the words split by the input regex string", function(assert){
      var line = "poijf Iron is 42 Credits"
      var result = utility.splitAndTrim(line, /\s+/g);
      var expectedResult = ["poijf", "Iron", "is", "42", "Credits"];
      assert.deepEqual(result, expectedResult)
   });
});