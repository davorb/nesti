var mocha = require('mocha');
var assert = require('assert');
var should = require('should');
let nesulator = require('./nesulator');

describe('Nesulator', function() {
  beforeEach(function() {
    nesulator.reset();
  });

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

    it('should contain the A register', function() {
      should.exist(nesulator.registers().a);
    });

    it('should contain the accumulator', function() {
      should.exist(nesulator.registers().acc);
    });
  });

  describe('instructions', function() {
    describe('LDA', function() {
      it('loads 01 into the accumulator', function() {
        let code = "A9 01"; // LDA #$01
        nesulator.run(code);
        let result = nesulator.registers().acc;
        should.equal(result, "01");
      });
    });

    describe('LDX', function() {
      it('loads a value into the X register', function() {
        // LDX #$08
        let code = "a2 08";
        nesulator.run(code);
        let result = nesulator.registers().x;
        should.equal(result, "08");
      });
    });

    describe('LDY', function() {
      it('loads a value into the Y register', function() {
        // LDY #$08
        let code = "a0 08";
        nesulator.run(code);
        let result = nesulator.registers().x;
        should.equal(result, "08");
      });
    });

    describe('STA', function() {
      // TODO
    });

    describe('INX', function() {
      it('increments the value of the X register', function() {
        // LDX #$01
        // INX
        let code = "a2 01 e8";
        nesulator.run(code);
        let result = nesulator.registers().x;
        should.equal(result, "02");
      });
    });

    describe('ADC', function() {
      it('adds a hex value to the A register', function() {
        // ADC #$c4
        let code = "69 c4";
        nesulator.run(code);
        let result = nesulator.registers().a;
        should.equal(result, "c4");
      });
    });
  });
});
