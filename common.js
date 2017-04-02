
exports.hexToNum = function(hex) {
  return parseInt(hex, 16);
};

/* Returns two bytes */
exports.numToHex = function(num) {
  let result = num.toString(16);
  if (result.length === 1) {
    return '000'+result;
  } else if (result.length === 2) {
    return '00'+result;
  }
  return result;
};

/* Returns a single byte, i.e. 0x00
 */
exports.numToHexOneByte = function(num) {
  return exports.numToHex(num).substr(2, 2);
}

exports.incAddress = function(address) {
  return exports.numToHex(exports.hexToNum(address)+1);
};
