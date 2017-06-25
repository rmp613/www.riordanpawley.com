QUnit.test("interface exists", function (assert) {
   assert.notEqual(interface, undefined);
});

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
QUnit.test("can write to results div", function (assert) {
   var done = assert.async();
   setTimeout(function(){
     
   var correctString = "pish tegj glob glob is 42<br>glob prok Silver is 68 Credits<br>glob prok Gold is 57800 Credits<br>glob prok Iron is 782 Credits<br>I have no idea what you are talking about <br>"
   request("GET", "./test/input.txt")
      .then(function(e){
         interface.loadFile(e.target.response);
         var responseElementText = document.getElementById("results").innerHTML;
         console.log(responseElementText);
         console.log(correctString);
         
         assert.equal(responseElementText, correctString);
         done();
      }, function(e) {
         console.error("get request error");
         done();
      });
       
   });
});