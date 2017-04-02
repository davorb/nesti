let memory = [];

/* Memory addresses need to be in 16-bit format
 */
exports.get = function(address) {
  if (!memory[address]) {
    memory[address] = '00';
  }
  return memory[address];
};

exports.set = function(address, value) {
  memory[address] = value;
};

/* Place code at memory location 0x0000
 */
exports.setCode = function(code) {
  code = code.replace(/ /g, '').toLowerCase();

  let memLocation = '0000';
  for (var i=0; i < code.length-1; i+=2) {
    exports.set(memLocation, code.substr(i,2));
    memLocation = numToHex(hexToNum(memLocation)+1);
  }
};

function hexToNum(hex) {
  return parseInt(hex, 16);
}

function numToHex(num) {
  let result = num.toString(16);
  if (result.length === 1) {
    return '000'+result;
  } else if (result.length === 2) {
    return '00'+result;
  }
  return result;
}
