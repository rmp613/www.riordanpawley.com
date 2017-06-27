
var interface = (function(){
   
   window.onload = function(){
      var fileInput = document.getElementById("file-selector");

      fileInput.addEventListener('change', function(e){
         var file = fileInput.files[0];
         document.getElementById("file-selector").value = "";

         loadFile(file).then(function(fileString){
            var result = noteProcessor.processNotes(fileString);
            var elementID = 'results';

            clear(elementID)
            write(elementID, result);
         });
      });
   }


   /********** private methods **********/
   /*
    * function that writes a string to the results div on the page
    * takes [id]: a STRING which is used to get the element
    * takes [string]: a STRING which is written to the element
    */
   function write(id, string){
      document.getElementById(id).innerHTML += string;
   }

   /*
    * function that clears the innerHTML of the passed in div id
    * takes [id]: a STRING which is used to get the element
    */
   function clear(id){
      return document.getElementById(id).innerHTML = "";
   }

   /*
    * function that loads a .txt file 
    * takes [file]: a blob or file object
    */
   function loadFile(file){
      return new Promise(function(resolve, reject){
         var textType = /text.*/;

         if(file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
               resolve(reader.result);
            }
            reader.readAsText(file);
            
         } else {
            reject();
         }
      });
   }
   /********** end private methods **********/


   /********** public methods **********/
   
   /********** end public methods **********/

   var api = {
   }

   /* test code */
   /* exporting private methods/vars for unit tests */
   api._loadFile = loadFile;
   api._write = write;
   api._clear = clear;
   /* end test code */

   return api;
})();