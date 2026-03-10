const jwt = require("jsonwebtoken");
const generateAccessToken = (user, secret, expiresIn) => {
  const payload = {
    user: {
      id: user.id,
      email: user.email,
    },
  };
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token, secret) => jwt.verify(token, secret);

module.exports = {
  generateAccessToken,
  verifyToken,
};
