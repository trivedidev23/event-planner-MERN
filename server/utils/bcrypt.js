const bcrypt = require("bcryptjs");

const hashItem = async (pswd) => {
  const salt = await bcrypt.genSalt(10);
  const hashedItem = await bcrypt.hash(pswd, salt);
  return hashedItem;
};

module.exports = hashItem;
