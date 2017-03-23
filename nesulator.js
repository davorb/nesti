(function () {
  let code = "a9 c0 aa e8 69 c4 00";
  console.log(code);
  code = code.replace(/ /g, '').toLowerCase();

  let accumulator = '00';
  let registerX = '00';

  for (var i=0; i < code.length-1; i+=2) {
    //displayRegisters();
    let opcode = code[i] + code[i+1];

    let value;
    switch (opcode) {
    case 'a9':
      i += 2;
      value = code[i] + code[i+1];
      console.log(`LDA #$${value}`);
      accumulator = value;
      break;
    case '85':
      // TODO
      break;
    case '95':
      // TODO
      break;
    case '8d':
      value = code[i+2]+code[i+3]+code[i+4]+code[i+5];
      i += 4;
      console.log(`STA $${value[2]+value[3]+value[0]+value[1]}`);
      // TODO: implement memory
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
      console.log('TAX');
      registerX = accumulator;
      break;
    case 'e8':
      // Increment X register
      console.log('INX');
      inx();
      break;
    case '69':
      // Add with carry, immediate
      value = code[i+2] + code[i+3];
      i+=2;
      console.log(`ADC #$${value}`);
      addc(value);
      break;
    case '00':
      console.log('BRK');
      brk();
      break;
    default:
      console.log(`Unknown instruction ${opcode}.`);
    }
  }

  /* Increment X register
   */
  function inx() {
    let value = hexToNum(registerX);
    value += 1;
    registerX = numToHex(value);
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

  function hexToNum(hex) {
    return parseInt(hex, 16);
  }

  function numToHex(num) {
    return num.toString(16);
  }

  function displayRegisters() {
    // TODO: add more registers
    console.log('-------');
    console.log(`ACC: ${accumulator}`);
    console.log(`X: ${registerX}`);
    console.log('-------');
  }
})();
