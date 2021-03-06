
var noteProcessor = (function(){
   /********** private variables **********/
   // charts including romanNumerals - decimal, alien - romanNumerals 
   charts = {
      romanNumerals: {
         M: 1000,
         D: 500,
         C: 100,
         L: 50,
         X: 10,
         V: 5,
         I: 1
      },
      alien: {},
      goods: {}
   }

   var generalErrorString = "I have no idea what you are talking about <br>";
   var alienToRomanErrorString = "a string containing words that cannot be understood <br>";
   var romanToDecimalErrorString = "a string containing an invalid roman numeral or an invalid roman numeral chain <br>";
   var alienChartErrorString = "each alien word must be equal to a single roman numeral e.g. pish is L <br>";
   var isBlankErrorString = "blank<br>"
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

      if(afterIs){
         if(utility.wordCount(beforeIs) == 1){
            if(inChart("romanNumerals", afterIs)){
               charts.alien[beforeIs] = afterIs;
               return "";
            } else {
              return alienChartErrorString;
            }
         }else {
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
      }
      
      return generalErrorString;
   }

   /*
    * returns a STRING containing the converted alien roman numerals to a decimal value
    * takes [wordsAfterIs]: an array of words from after the word "is"
    */
   function respondToHowMuch(wordsAfterIs){
      var amount = alienToDecimal(wordsAfterIs);
      if(!isNaN(amount)) amount += "<br>";
      return wordsAfterIs.join(" ") + " is " + amount;
   }

   /*
    * returns a STRING containing the answer to a question of how many Credits
    * equals an amount of a good contained within [wordsAfterIs]
    * takes [wordsAfterIs]: an array of words from after the word "is"
    */
   function respondToHowMany(wordsAfterIs){
      var type = wordsAfterIs[wordsAfterIs.length - 1];
      var alienWords = wordsAfterIs.slice(); // clone array
      alienWords.pop(); // remove the type from the array of words
      var alienToDecimalResult = alienToDecimal(alienWords);
      var message = "";
      if(isNaN(alienToDecimalResult)){
         message = alienToDecimalResult;
      }else {
         message = alienToDecimalResult * charts.goods[type] + " Credits<br>";
      }
      return wordsAfterIs.join(" ") + " is " + message;
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
      if(isNaN(quantity)){
         return alienWords.join(" ") + " is " + quantity;
      }
      if(wordsAfterIs.length == 2){
         var price = wordsAfterIs[0];
         return price/quantity;
      } else {
         return generalErrorString;
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
      var total = 0;
      var current, next;

      for(var i = 0; i < numerals.length; i++){
         current = charts.romanNumerals[numerals.charAt(i)];
         next = charts.romanNumerals[numerals.charAt(i+1)];
         
         if(current < next){ 
            if(canBeSubtracted(current, next)){
               total += next - current;
               i++;
            } else {
               return romanToDecimalErrorString;
            }
         } else if(current === next) {
            while(current === next){
               total += current;
               i++;
               current = charts.romanNumerals[numerals.charAt(i)];
               next = charts.romanNumerals[numerals.charAt(i+1)];
            }

            if(current > next || next === undefined) total += current;
         } else { // current >= next
            total += current;
         }
      }
      return total;
   }

   /*
    * returns a BOOLEAN of true if [numeral1Val] can be subtracted from 
    * [numeral2Val]
    * takes [numeral1Val]: an INT, the value of the smaller numeral
    *       [numeral2Val]: an INT
    */
   function canBeSubtracted(numeral1Val, numeral2Val){
      if(!numeral2Val) return false;
      switch(numeral1Val){
         case 1:
            return numeral2Val <= 10;
         case 10:
            return numeral2Val <= 100;
         case 100:
            return numeral2Val <= 1000;
      }
   
      return false;
   }

   /*
    * returns a BOOLEAN of true if [string] is (on the surface) a valid roman numeral string
    * takes [string]: an STRING of roman numerals
    */
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
    /*
    * returns a BOOLEAN of true if [key] is in [subchart]
    * takes [key]: a STRING which is the key for [subchart]
    *       [subchart]: a STRING which is the key for a subchart of charts
    */
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
      processNotes: processNotes
   }

   /* test-code */
   /* exporting private methods/vars for unit tests */
   api._charts = charts;
   api._generalErrorString = generalErrorString;
   api._isBlankErrorString = isBlankErrorString;
   api._alienChartErrorString = alienChartErrorString;
   api._romanToDecimalErrorString = romanToDecimalErrorString;
   api._alienToRomanErrorString = alienToRomanErrorString;

   api._processLine = processLine;
   api._respondToHowMuch = respondToHowMuch;
   api._respondToHowMany = respondToHowMany;
   api._determineGoodsValue = determineGoodsValue;
   api._alienToDecimal = alienToDecimal;
   api._alienToRoman = alienToRoman;
   api._romanToDecimal = romanToDecimal;
   api._isValidRomanNumeralString = isValidRomanNumeralString;
   api._inChart = inChart;
   api._canBeSubtracted = canBeSubtracted;
   /* end-test-code */

   return api;
})();

