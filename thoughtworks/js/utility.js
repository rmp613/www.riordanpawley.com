
var utility = (function(){
   
   /********** public methods **********/
   /* 
    * returns a STRING without surrounding white space
    * takes [str]: a STRING
    */
   function removeWhiteSpace(str){
      return str.replace(/\s+/g, '');
   }

   /* 
    * returns a STRING containing the file extension of the input fileString
    * takes [fileString]: a STRING that has a file extension on the end
    */
   function getExtension(fileString) {
      var parts = fileString.split('.');
      return parts[parts.length - 1];
   }

   /* 
    * returns a STRING without surrounding white space
    * takes [str]: a STRING
    */
   function wordCount(words){
      return words
            .split(" ")
            .filter(function(n) { return n != '' })
            .length;
   }

   /* 
    * returns a STRING that has been split around the input regex
    * takes [line]: a STRING to split and trim
    *       [regexString]: a STRING that is used to split the [line]
    */
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
