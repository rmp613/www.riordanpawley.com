
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

QUnit.module("interface", function(){

   // FUNCTIONAL TESTS:
   QUnit.test("FUNCTIONAL: The load and process functions work as per test data", function (assert) {
      var done = assert.async();

      var correctString = "pish tegj glob glob is 42<br>glob prok Silver is 68 Credits<br>glob prok Gold is 57800 Credits<br>glob prok Iron is 782 Credits<br>I have no idea what you are talking about <br>"
      request("GET", "./test/input.txt")
         .then(function(e){
            interface.loadFile(e.target.response).then(function(fileString){
               var responseString = noteProcessor.processNotes(fileString);
               assert.equal(responseString, correctString);
               done();
            });
         }, function(e) {
            assert.ok(false, "Short version: run the page on a server.\nLong Version: Couldn't get the test input.txt file likely due to browser security.\nIn order to run this test the app needs to be run on a server e.g. \nwww.riordanpawley.com/thoughtworks/test.html");
            done();
         }
      );
   });
   // END FUNCTIONAL TESTS

   // UNIT TESTS:
   QUnit.test("UNIT: Interface exists", function (assert) {
      assert.ok(interface);
   });

   QUnit.test("UNIT: loadFile(): Loads a text file into a string", function (assert) {
      var done = assert.async();

      request("GET", "./test/smallString.txt")
         .then(function(e){
            interface.loadFile(e.target.response).then(function(fileString){
               var expectedString = "smallString";
               assert.equal(fileString, expectedString);
               done();
            });
         }, function(e) {
            assert.ok(false, "Short version: run the page on a server.\nLong Version: Couldn't get the test input.txt file likely due to browser security.\nIn order to run this test the app needs to be run on a server e.g. \nwww.riordanpawley.com/thoughtworks/test.html");
            done();
         }
      );
   });

   QUnit.test("UNIT: write(): Writes to the specified div", function (assert) {
      var ID = "mockElement";
      var mockElement = document.createElement('div');
      var string = "string";

      mockElement.id = ID;
      document.body.appendChild(mockElement);

      interface._write(ID, string);
      assert.equal(mockElement.innerHTML, string);
      document.body.removeChild(mockElement);
   });

   QUnit.test("UNIT: clear(): Clears the specified div's innerHTML", function (assert) {
      var ID = "mockElement";
      var mockElement = document.createElement('div');
      var string = "string";

      mockElement.id = ID;
      mockElement.innerHTML = string;
      document.body.appendChild(mockElement);

      interface._clear(ID);
      assert.equal(mockElement.innerHTML, "");

      document.body.removeChild(mockElement);
   });
   // END UNIT TESTS
});