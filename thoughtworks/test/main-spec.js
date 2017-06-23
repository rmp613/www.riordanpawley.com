
// var expect = require('chai').expect;
var assert = require('assert');
var expect = require('chai').expect;

var main = require('../main.js');

describe('main', () => {
  it('should exist', () => {
        expect(main).to.not.be.undefined;
  });
  it('should contain a valid roman numerals chart', () => {
    expect(main._romanNumeralsChart.I).to.eql(10);
  });
  it('should work to spec', () => {
    
  });
  describe('', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});