(function () {
  let code = "a9 01 8d 00 02";
  console.log(code);
  code = code.replace(/ /g, '').toLowerCase();

  let accumulator = '00';

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
    }
  }
})();
