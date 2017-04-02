let registerX,
    registerY,
    programCounter,
    ac; // accumulator

let memory = require('./memory'),
    common = require('./common'),
    instructions = require('./instructions');

exports.reset = function() {
  ac = '00';
  registerX = '00';
  registerY = '00';
  programCounter = '0000';
};

exports.registers = function() {
  return {
    ac: ac,
    x: registerX,
    y: registerY,
    pc: programCounter
  };
};

function incrementPC() {
  programCounter = common.incAddress(programCounter);
}

exports.run = function(code) {
  memory.setCode(code);

  while (true) {
    let opcode = memory.get(programCounter);

    switch (opcode) {
    case 'a9':                  // LDA
      ac = instructions.lda(programCounter, memory);
      break;
    case 'a2':                  // LDX
      registerX = instructions.ldx(programCounter, memory);
      break;
    case 'a0':                  // LDY
      registerY = instructions.ldx(programCounter, memory);
      break;
    case 'e8':                  // INX
      registerX = instructions.inx(programCounter, memory);
      break;
    case 'ea':                  // NOP
      break;
    default:
      break;
    }

    incrementPC();
    if (programCounter === 'ffff') {
      break;
    }
  }
};
