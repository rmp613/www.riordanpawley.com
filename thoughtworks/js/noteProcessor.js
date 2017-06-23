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

   var errorString = "I have no idea what you are talking about <br>";
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
         charts.alien[beforeIs] = afterIs;
      } else if(afterIs) {
         var wordsAfterIs = utility.splitAndTrim(
               afterIs.replace(" ?", ""), 
               whiteSpaceRegex);

         if(beforeIs.match("how much")) {
            return respondToHowMuch(wordsAfterIs);
         } else if(beforeIs.match("how many")) {
            return respondToHowMany(wordsAfterIs)
         } else {
            return determineGoodsValue(beforeIs, wordsAfterIs);
         }
      } else {
         return errorString;
      }

      return "";
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
      var amount = alienToDecimal(wordsAfterIs);
      var type = wordsAfterIs[wordsAfterIs.length - 1];
      var credits = amount * charts.goods[type];
      return wordsAfterIs.join(" ") + " is " + credits + " Credits" + "<br>";
   }

   /*
    * returns a STRING which should be empty unless there is an error
    * takes [beforeIs]: a STRING of words from before the word "is"
    *       [wordsAfterIs]: an array of words from after the word "is"
    */
   function determineGoodsValue(beforeIs, wordsAfterIs){
      var wordsBeforeIs = utility.splitAndTrim(beforeIs, whiteSpaceRegex);
      var type = beforeIs.match(capitalWordRegex);
      var quantity = alienToDecimal(wordsBeforeIs);
      if(wordsAfterIs.length == 2){
         var value = wordsAfterIs[0];
         charts.goods[type] = value/quantity;
      } else {
         return errorString;
      }
      return "";
   }

   /*
    * returns a STRING of roman numerals which equal the alien words
    * takes [words]: an ARRAY of words that should be keys within 
    * the object charts.alien
    */
   function alienToRoman(words){
      var numerals = "";
      words.forEach(word => {
         if(!charts.alien.hasOwnProperty(word)){
            return numerals;
         }
         numerals += charts.alien[word];
      });
      return numerals;
   }

   /*
    * returns an INT equal to the input alien words
    * takes [words]: an ARRAY of alien words
    */
   function alienToDecimal(words){
      return romanToDecimal(alienToRoman(words));
   }

   /*
    * returns an INT equal to the input roman numerals
    * takes [numerals]: a STRING of roman numerals
    */
   function romanToDecimal(numerals){
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
   /* end-test-code */
   ('loaded');
   return api;
})();

