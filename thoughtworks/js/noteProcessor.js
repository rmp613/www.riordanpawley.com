
var noteProcessor = (function(){
   /********** private variables **********/
   // charts including romanNumerals - decimal, alien - romanNumerals 
   charts = {
      romanNumerals: {
         M: 1000,
         CM: 900,
         D: 500,
         CD: 400,
         C: 100,
         XC: 90,
         L: 50,
         XL: 40,
         X: 10,
         IX: 9,
         V: 5,
         IV: 4,
         I: 1
      },
      alien: {},
      goods: {}
   }

   var generalErrorString = "I have no idea what you are talking about <br>";
   var alienToRomanErrorString = "a string containing words that cannot be understood";
   var romanToDecimalErrorString = "a string containing an invalid roman numeral or an invalid roman numeral chain";
   var isBlankErrorString = "blank"
   var whiteSpaceRegex = /\s+/g;
   var capitalWordRegex = /[A-Z]\w+/g;
   /********** end private variables **********/

   
   /********** private methods **********/
   /*
    * returns a STRING which can be empty if the input line was not a question
    * OR can be the correct response to the question within the input line,
    * OR an error string
    * takes [line]: a STRING containing one line of notes
    */
   function processLine(line){
      // split the line around the word "is"
      var split = utility.splitAndTrim(line, /(?:^|\b)(is)(?=\b|$)/);
      var beforeIs = split[0],
         afterIs = split[2];
      
      if(utility.wordCount(beforeIs) == 1 && charts.romanNumerals[afterIs]){
         if(inChart("romanNumerals", afterIs)){
            charts.alien[beforeIs] = afterIs;
            return "";
         } else {
            return "please make sure your input text file has correclty stated the value of each alien word. e.g. pish is L";
         }
      } else if(afterIs) {
         var wordsAfterIs = utility.splitAndTrim(
               afterIs.replace(" ?", ""), 
               whiteSpaceRegex);

         if(beforeIs.match("how much")) {
            return respondToHowMuch(wordsAfterIs);
         } else if(beforeIs.match("how many")) {
            return respondToHowMany(wordsAfterIs)
         } else {
            var goodsValue = determineGoodsValue(beforeIs, wordsAfterIs);
            if(typeof goodsValue !== "number"){
               return goodsValue;
            } else {
               var type = beforeIs.match(capitalWordRegex);
               charts.goods[type] = goodsValue;
               return "";
            }
         }
      }
      
      return generalErrorString;
   }

   /*
    * returns a STRING containing the converted alien roman numerals to a decimal value
    * takes [wordsAfterIs]: an array of words from after the word "is"
    */
   function respondToHowMuch(wordsAfterIs){
      var amount = alienToDecimal(wordsAfterIs);
      return wordsAfterIs.join(" ") + " is " + amount + "<br>";
   }

   /*
    * returns a STRING containing the answer to a question of how many Credits
    * equals an amount of a good contained within [wordsAfterIs]
    * takes [wordsAfterIs]: an array of words from after the word "is"
    */
   function respondToHowMany(wordsAfterIs){
      console.log(wordsAfterIs);
      var type = wordsAfterIs[wordsAfterIs.length - 1];
      var alienWords = wordsAfterIs.slice(); // clone array
      alienWords.pop(); // remove the type from the array of words
      console.log(alienWords);
      var alienToDecimalResult = alienToDecimal(alienWords);
      var message = "";
      if(isNaN(alienToDecimalResult)){
         message = alienToDecimalResult;
      }else {
         message = alienToDecimalResult * charts.goods[type] + " Credits";
      }
      return wordsAfterIs.join(" ") + " is " + message + "<br>";
   }

   /*
    * returns an INT containing the value of the good 
    * OR a STRING containing an error message
    * takes [beforeIs]: a STRING of words from before the word "is"
    *       [wordsAfterIs]: an array of words from after the word "is"
    */
   function determineGoodsValue(beforeIs, wordsAfterIs){
      var wordsBeforeIs = utility.splitAndTrim(beforeIs, whiteSpaceRegex);
      var alienWords = wordsBeforeIs.slice(); // clone array
      alienWords.pop(); // remove the type from the array of words
      var quantity = alienToDecimal(alienWords);
      console.log("quantity: " + quantity);
      if(isNaN(quantity)){
         return alienWords.join("") + " is " + quantity;
      }
      if(wordsAfterIs.length == 2){
         var price = wordsAfterIs[0];
         console.log("PRICE: " + price);
         return price/quantity;
      } else {
         return goodsValueErrorString;
      }
   }

   /*
    * returns a STRING of roman numerals which equal the alien words
    * OR a BOOLEAN false meaning the input was invalid
    * takes [words]: an ARRAY of words that should be keys within 
    * the object charts.alien
    */
   function alienToRoman(words){
      if(words.length <= 0) return isBlankErrorString;
      var numerals = "";
      for(var i = 0; i < words.length; i++){
         var word = words[i];
         if(!charts.alien.hasOwnProperty(word)){
            return alienToRomanErrorString;
         }
         numerals += charts.alien[word];
      }
      return numerals;
   }

   /*
    * returns an INT equal to the input alien words
    * OR a BOOLEAN false meaning the input was invalid
    * takes [words]: an ARRAY of alien words
    */
   function alienToDecimal(words){
      if(words.length <= 0) return isBlankErrorString;
      var result = "";
      var alienToRomanResult = alienToRoman(words);
      if(alienToRomanResult === alienToRomanErrorString){
         return alienToRomanResult;
      } else return romanToDecimal(alienToRomanResult);
   }

   /*
    * returns an INT equal to the input roman numerals
    * OR a STRING containing an invalid input error message
    * takes [numerals]: a STRING of roman numerals
    */
   function romanToDecimal(numerals){
      if(!isValidRomanNumeralString(numerals)){
         return romanToDecimalErrorString;
      }
      var keys = Object.keys(charts.romanNumerals);
      var total = 0;
      while(numerals.length > 0){
         keys.forEach(key => {
            if(numerals.indexOf(key) == 0){
               total += charts.romanNumerals[key];
               numerals = numerals.replace(key, "");
            }
         });
      }
      return total;
   }

   function isValidRomanNumeralString(string){
      if(string.length <= 0) return false;
      var moreThanThreeDuplicatesInARowRegex = /(.)\1{3,}/
      if(string.match(moreThanThreeDuplicatesInARowRegex)){
         return false;
      } 
      for(var i = 0; i < string.length; i++){
         if(!inChart("romanNumerals", string[i])){
            return false;
         }
      }
      return true;
   }
   function inChart(subchart, key){
      if(charts[subchart].hasOwnProperty(key)){
         return true;
      }
      return false;
   }
   /********** end private methods **********/
   

   /********** public methods **********/
   /* 
    * returns a STRING containing lines of answers to questions within
    * the input notes.
    * takes [notes]: a STRING containing lines of notes
    */
   function processNotes(notes) {
      // put every line into an array
      var linesFromFile = notes.match(/[^\r\n]+/g);
      var output = "";
      linesFromFile.forEach((line) => {
         output += processLine(line);
      });

      return output;
   }
   /********** end public methods **********/

   var api = {
      processNotes: processNotes,
      _generalErrorString: generalErrorString
   }

   /* test-code */
   /* exporting private methods/vars for unit tests */
   api._charts = charts;
   // api._generalErrorString = generalErrorString;
   api._isBlankErrorString = isBlankErrorString;
   api._romanToDecimalErrorString = romanToDecimalErrorString;
   api._alienToRomanErrorString = alienToRomanErrorString;

   api._processLine = processLine;
   api._respondToHowMuch = respondToHowMuch;
   api._respondToHowMany = respondToHowMany;
   api._determineGoodsValue = determineGoodsValue;
   api._alienToDecimal = alienToDecimal;
   api._alienToRoman = alienToRoman;
   api._romanToDecimal = romanToDecimal;
   /* end-test-code */

   return api;
})();

