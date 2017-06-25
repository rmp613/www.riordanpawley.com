var utility = (function(){
   
   /********** public methods **********/
   function removeWhiteSpace(word){
      return str.replace(/\s+/g, '');
   }

   function getExtension(filename) {
      var parts = filename.split('.');
      return parts[parts.length - 1];
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
   /********** end public methods **********/


   var api = {
      removeWhiteSpace: removeWhiteSpace,
      getExtension: getExtension,
      wordCount: wordCount,
      splitAndTrim: splitAndTrim
   }

   return api;
})();
