QUnit.test("interface exists", function(assert){
  assert.notEqual(interface, undefined);
})

QUnit.test("can write to results div", function(assert){
  var xhr = new XMLHttpRequest();
   xhr.open('GET', 'input.txt', true);

   xhr.responseType = 'blob';

   xhr.onload = function(e) {
      if (this.status == 200) {
         var blob = this.response;
         console.log(blob);
  assert.equal(blob, 1);
      }
   };

})