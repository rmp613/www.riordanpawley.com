
var interface = (function(){
   function doGET(path, callback) {
      var xhr = new XMLHttpRequest();
      
      xhr.responseType = 'blob';
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // The request is done; did it work?
            if (xhr.status == 200) {
                // ***Yes, use `xhr.responseText` here***
                callback(xhr.response);
            } else {
                // ***No, tell the callback the call failed***
                callback(null);
            }
        }
      };
      xhr.open("GET", path);
      xhr.send();
   }

   function handleFileData(fileData) {
      if (!fileData) {
         console.log("error");
         return;
      }
      var blob = this.response;
      console.log(JSON.stringify(fileData));
   }

// Do the request
   window.onload = function(){
   
      doGET("./test/input.txt", handleFileData);
      console.log("do");


      var fileInput = document.getElementById("file-selector");

      fileInput.addEventListener('change', function(e){
         var file = fileInput.files[0];
         var textType = /text.*/;

         if(file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
               clear();
               write(noteProcessor.processNotes(reader.result));
            }

            reader.readAsText(file);
         } else {
            clear();
            fileDiplayArea.innerText = "Please submit a .txt file";
         }
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
    * function that loads and processes a .txt file 
    * takes [file]: a STRING like file:///C:/input.txt
    */
   
   /********** end public methods **********/

   var api = {
   }

   /* test code */
   /* exporting private methods/vars for unit tests */
   api._write = write;
   /* end test code */

   return api;
})();