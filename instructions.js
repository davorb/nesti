let common = require('./common');

exports.lda = loadImmediate;
exports.ldx = loadImmediate;
exports.ldy = loadImmediate;

function loadImmediate(pc, memory) {
  let valueAddress = common.incAddress(pc);
  return memory.get(valueAddress);
}

exports.inx = function(x) {
  console.log(x);
  let result = common.hexToNum(x)+1;
  while (result > 256) {
    result -= 256;
  }
  result = result.toString(16);
  if (result.length === 1) {
    result = '0'+result;
  }
  return result;
};
