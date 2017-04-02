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
