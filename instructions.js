let common = require('./common');

exports.lda = loadImmediate;
exports.ldx = loadImmediate;
exports.ldy = loadImmediate;

function loadImmediate(pc, memory) {
  let valueAddress = common.incAddress(pc);
  return memory.get(valueAddress);
}
