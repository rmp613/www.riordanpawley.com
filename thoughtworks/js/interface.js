var interface = (function(){

   function write(string){
      document.getElementById("results").innerHTML += string;
   }

   function loadFile(file){
      var fr = new FileReader();
      fr.onload = function(event){
         var notes = event.target.result;
         write(noteProcessor.processNotes(notes));
      }
      fr.readAsText(file.files[0]);
   }

   var api = {
      loadFile: loadFile
   }

   return api;
})();
