
var utility = (function(){
   
   function removeWhiteSpace(word){
      return str.replace(/\s+/g, '');
   }

   function wordCount(words){
      return words
            .split(" ")
            .filter(function(n) { return n != '' })
            .length;
   }

   function splitAndTrim(line, regexString){
      return line.trim()
            .split(regexString)
            .map(words => {
            return words.trim();
            });
   }


   var api = {
      removeWhiteSpace: removeWhiteSpace,
      wordCount: wordCount,
      splitAndTrim: splitAndTrim
   }

   return api;
})();
