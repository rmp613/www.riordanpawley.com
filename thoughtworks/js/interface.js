
var interface = (function(){
   function request(method, url) {
      return new Promise(function (resolve, reject) {
         var xhr = new XMLHttpRequest();
         xhr.responseType = "blob";
         xhr.open(method, url);
         xhr.onload = resolve;
         xhr.onerror = reject;
         xhr.send();
      });
   }  
   window.onload = function(){
      var fileInput = document.getElementById("file-selector");

      fileInput.addEventListener('change', function(e){
         var file = fileInput.files[0];
         loadFile(file);
        
      });

      request("GET", "./test/input.txt")
      .then(function(e){
         interface.loadFile(e.target.response);
         var responseElementText = document.getElementById("results").innerHTML;
         console.log(responseElementText);
         console.log(correctString);
         setTimeout(function(){
            assert.equal(responseElementText, correctString);
            
         }, 1000);
      }, function(e) {
         console.error("get request error");
         done();
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