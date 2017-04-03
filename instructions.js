let common = require('./common');

exports.lda = loadImmediate;
exports.ldxImmediate = loadImmediate;
exports.ldy = loadImmediate;

function loadImmediate(pc, memory) {
  let valueAddress = common.incAddress(pc);
  return memory.get(valueAddress);
}

exports.ldxZeroPage = function(pc, memory) {
  let memoryAddress = loadImmediate(pc, memory);
  return memory.get(memoryAddress);
};

exports.inx = increment;
exports.iny = increment;

function increment(val) {
  let result = common.hexToNum(val)+1,
      maxValue = 255;
  while (result > maxValue) {
    result = result % (maxValue + 1);
  }
  result = result.toString(16);
  if (result.length === 1) {
    result = '0'+result;
  }
  //console.log(`${val} ${result}`);
  return result;
}

exports.adc = function(programCounter, memory, accumulator) {
  let value = common.hexToNum(loadImmediate(programCounter, memory));
  return common.numToHexOneByte(common.hexToNum(accumulator) + value);
};

exports.jmp = function(programCounter, memory) {
  let value1Addr = common.incAddress(programCounter),
      value0Addr = common.incAddress(value1Addr);

  let address = `${memory.get(value0Addr)}${memory.get(value1Addr)}`;

  return address;
};

exports.txa = function(registerX) {
  // TODO: set zero and negative flags
  return registerX;
};

exports.tya = function(registerY) {
  // TODO: set zero and negative flags
  return registerY;
};
