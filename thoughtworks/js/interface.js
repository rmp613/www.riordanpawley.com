
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

// Do the request
   window.onload = function(){
   request('GET', './test/input.txt')
    .then(function (e) {
        console.log(e.target.response);
        console.log(e);
    }, function (e) {
        console.error("get request failed");
    });


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