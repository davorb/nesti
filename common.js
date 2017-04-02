
exports.hexToNum = function(hex) {
  return parseInt(hex, 16);
};

exports.numToHex = function(num) {
  let result = num.toString(16);
  if (result.length === 1) {
    return '000'+result;
  } else if (result.length === 2) {
    return '00'+result;
  }
  return result;
};

exports.incAddress = function(address) {
  return exports.numToHex(exports.hexToNum(address)+1);
};
