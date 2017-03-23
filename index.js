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
      should.exist(nesulator.registers().x);
    });

    it('should contain the accumulator', function() {
      should.exist(nesulator.registers().acc);
    });
  });

  describe('instructions', function() {
    describe('LDA', function() {
      it('should run', function() {
        let code = "A9 01"; // LDA #$01
        nesulator.run(code);
        let result = nesulator.registers().acc;
        should.equal(result, "01");
      });
    });

    describe('STA', function() {
      // TODO
    });
  });
});
