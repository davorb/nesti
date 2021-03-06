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
  memory.reset();
};

exports.registers = function() {
  return {
    ac: ac,
    x: registerX,
    y: registerY,
    pc: programCounter
  };
};

function incrementPC(ticks) {
  if (!ticks) {
    ticks = 1;
  }
  for (var i=0; i < ticks; i++) {
    programCounter = common.incAddress(programCounter);
  }
}

exports.run = function(code) {
  memory.setCode(code);

  let running = true;
  while (running) {
    let opcode = memory.get(programCounter);

    //console.log(`-->${programCounter}: ${memory.get(programCounter)}`);
    switch (opcode) {
    case 'a9':                  // LDA
      ac = instructions.lda(programCounter, memory);
      incrementPC();
      break;
    case 'a2':                  // LDX, immediate
      registerX = instructions.ldxImmediate(programCounter, memory);
      incrementPC();
      break;
    case 'a5':                  // LDX, zero page
      registerX = instructions.ldxZeroPage(programCounter, memory);
      incrementPC();
      break;
    case 'a0':                  // LDY
      registerY = instructions.ldy(programCounter, memory);
      incrementPC();
      break;
    case 'e8':                  // INX
      registerX = instructions.inx(registerX);
      break;
    case 'c8':                  // INY
      registerY = instructions.iny(registerY);
      break;
    case 'ea':                  // NOP
      incrementPC();
      break;
    case '4c':                  // JMP
      programCounter = instructions.jmp(programCounter, memory);
      break;
    case '69':                  // ADC, immediate
      ac = instructions
        .adc(programCounter, memory, ac);
      incrementPC();
      break;
    case '8a':                  // TXA
      ac = instructions.txa(registerX);
      break;
    case '98':                  // TYA
      ac = instructions.tya(registerY);
      break;
    case '00':                  // BRK
      running = false;
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
