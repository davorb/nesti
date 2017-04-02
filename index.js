var mocha = require('mocha');
var assert = require('assert');
var should = require('should');
let nesulator = require('./nesulator');
let memory = require('./memory');

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

    it('should contain the accumulator', function() {
      should.exist(nesulator.registers().ac);
    });

    it('contains a program counter', function() {
      should.equal(nesulator.registers().pc, '0000');
    });
  });

  describe('memory', function() {
    describe('#set', function() {
      it('exists', function() {
        should.exist(memory.set);
      });
    });

    describe('#get', function() {
      it('exists', function() {
        should.exist(memory.get);
      });
    });

    describe('#setCode', function() {
      it('loads code at memory address 0x0000', function() {
        let code = 'A9 01';
        memory.setCode(code);
        should.equal(memory.get('0000'), 'a9');
        should.equal(memory.get('0001'), '01');
      });
    });

    it('can be modified', function() {
      memory.set('00ff', 'ff');
      should.equal(memory.get('00ff'), 'ff');
    });
  });

  describe('instructions', function() {
    describe('LDA', function() {
      it('loads a value into the accumulator', function() {
        let code = "A9 01"; // LDA #$01
        nesulator.run(code);
        let result = nesulator.registers().ac;
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
        let result = nesulator.registers().y;
        should.equal(result, "08");
      });
    });

    // describe('STA', function() {
    //   it('supports zero-page addressing', function() {
    //     // LDA #$01
    //     // STA $0200
    //     let code = "a9 01 8d 00 02";
    //     nesulator.run(code);

    //     let registerA = nesulator.registers().ac;
    //     should.equal(registerA, '01');

    //     let memoryResult = memory.get('0200');
    //     should.equal(memoryResult, '01');
    //   });
    // });

    describe('INX', function() {
      // it('increments the value of the X register', function() {
      //   // LDX #$01
      //   // INX
      //   let code = "a2 01 e8";
      //   nesulator.run(code);
      //   let result = nesulator.registers().x;
      //   should.equal(result, "02");
      // });

      // TODO: 256+1

      it('increments the value of the X register', function() {
        // INX
        let code = "e8";
        nesulator.run(code);
        let result = nesulator.registers().x;
        should.equal(result, "01");
      });
    });

    // describe('ADC', function() {
    //   it('adds a hex value to the A register', function() {
    //     // ADC #$c4
    //     let code = "69 c4";
    //     nesulator.run(code);
    //     let result = nesulator.registers().ac;
    //     should.equal(result, "c4");
    //   });


    //   it('supports immidiate addressing', function() {
    //     // ADC #$c4
    //     let code = "69 c4";
    //     nesulator.run(code);
    //     let result = nesulator.registers().ac;
    //     should.equal(result, "c4");
    //   });
    //});
  });
});
