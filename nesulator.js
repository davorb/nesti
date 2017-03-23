(function () {
  let code = "a9 c0 aa e8 69 c4 00";
  console.log(code);
  code = code.replace(/ /g, '').toLowerCase();

  let accumulator = '00';
  let registerX = '00';

  for (var i=0; i < code.length-1; i+=2) {
    let opcode = code[i] + code[i+1];

    let value;
    switch (opcode) {
    case 'a9':
      i += 2;
      value = code[i] + code[i+1];
      console.log(`LDA #$${value}`);
      accumulator = value;
      break;
    case '8d':
      value = code[i+2]+code[i+3]+code[i+4]+code[i+5];
      i += 4;
      console.log(`STA $${value[2]+value[3]+value[0]+value[1]}`);
      // TODO: implement memory
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

  function inx() {
    // TODO: Increment X register
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
})();
