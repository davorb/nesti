let registerX,
    ac; // accumulator

let memory = require('./memory');

exports.reset = function() {
  accumulator = '00';
  ac = '00';
  registerX = '00';
};

exports.registers = function() {
  return {
    ac: ac,
    x: registerX
  };
};

exports.run = function(code) {
  memory.setCode(code);

  function getValue() {
    i += 2;
    return code[i] + code[i+1];
  }

  for (var i=0; i < code.length-1; i+=2) {
    let opcode = code[i] + code[i+1];

    let value;
    switch (opcode) {
    case '69': // ADC
      let value = getValue();
      adc(value);
    case 'a0':                  // LDY
      registerX = getValue();
      break;
    case 'a2':                  // load into x register
      registerX = getValue();
      break;
    case 'a9':                  // LDA
      ac = getValue();
      break;
    case '85':                  // store zero page
      i += 2;
      value = '00' + code[i] + code[i+1];
      // TODO: run same thing as for 0x8d
      report(`STA $${value}`);
      break;
    case '95':
      i += 2;
      report(`STA $${value},X`);
      // TODO: implement memory
      break;
    case '8d': // STA
      let address = code[i+4]+code[i+5]+code[i+2]+code[i+3];
      i += 4;
      memory.set(address, ac);
      break;
    case '9d':
      // TODO
      break;
    case '99':
      // TODO
      break;
    case '81':
      // TODO
      break;
    case '91':
      // TODO
      break;
    case 'aa':
      // Copy the contents of the accumulator into the X register
      // TODO: set zero and negative flags
      report('TAX');
      registerX = accumulator;
      break;
    case 'e8': // INX
      // Increment X register
      report('INX');
      inx();
      break;
    case '69':
      // Add with carry, immediate
      value = code[i+2] + code[i+3];
      i+=2;
      report(`ADC #$${value}`);
      addc(value);
      break;
    case '00':
      report('BRK');
      brk();
      break;
    default:
      report(`Unknown instruction ${opcode}.`);
    }
  }
};


/* Increment X register
 */
function inx() {
  let value = hexToNum(registerX);
  value += 1;
  registerX = numToHex(value);
}

/* Add to A register
 * TODO: carry
 */
function adc(value) {
  ac = numToHex(hexToNum(ac) + hexToNum(value));
}

/* This instruction adds the contents of a memory location to the
 * accumulator together with the carry bit. If overflow occurs the
 * carry bit is set, this enables multiple byte addition to be
 * performed.
 */
function addc(value) {
  // TODO
}

/* forces the generation of an interrupt request
 */
function brk() {
  // TODO
}

function report(message) {
  let debug = false;
  if (debug) {
    console.log(message);
  }
}
