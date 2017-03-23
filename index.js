var mocha = require('mocha');
var assert = require('assert');
var should = require('should');
let nesulator = require('./nesulator');

describe('Nesulator', function() {
  describe('#run', function() {
    it('should exist', function() {
      should.exist(nesulator.run);
    });
  });

  describe('#registers', function() {
    it('should exist', function() {
      should.exist(nesulator.registers);
    });

    it('should contain the X register', function() {
      should.exist(nesulator.registers.x);
    });

    it('should contain the accumulator', function() {
      should.exist(nesulator.registers.acc);
    });
  });
});
