const phoneRegExp = /^[6-9]\d{9}$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;

module.exports = {
  phoneRegExp,
  passwordRegExp,
};
