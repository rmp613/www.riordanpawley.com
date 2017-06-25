
var interface = (function(){
// Do the request
   window.onload = function(){
      var fileInput = document.getElementById("file-selector");

      fileInput.addEventListener('change', function(e){
         var file = fileInput.files[0];
         loadFile(file);
        
      });
   }
   /********** private methods **********/
   /*
    * function that writes a string to the results div on the page
    * takes [string]: a STRING
    */
   function write(string){
      document.getElementById("results").innerHTML += string;
   }

   /*
    * function that clears the results div
    */
   function clear(){
      document.getElementById("results").innerHTML = "";
   }
   /********** end private methods **********/


   /********** public methods **********/
   /*
    * function that loads a .txt file 
    * takes [file]: a blob object
    */
   function loadFile(file){
      var textType = /text.*/;
      if(file.type.match(textType)) {
         var reader = new FileReader();

         reader.onload = function(e) {
            clear();
            noteProcessor.processNotes(reader.result)
         }

         reader.readAsText(file);
      } else {
         clear();
         fileDiplayArea.innerText = "Please submit a .txt file";
      }
   }
   /********** end public methods **********/

   var api = {
      loadFile: loadFile
   }

   /* test code */
   /* exporting private methods/vars for unit tests */
   api._write = write;
   /* end test code */

   return api;
})();