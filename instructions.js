let common = require('./common');

exports.lda = loadImmediate;
exports.ldx = loadImmediate;
exports.ldy = loadImmediate;

function loadImmediate(pc, memory) {
  let valueAddress = common.incAddress(pc);
  return memory.get(valueAddress);
}

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
  return result;
}
