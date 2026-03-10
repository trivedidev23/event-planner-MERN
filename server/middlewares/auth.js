const asyncHandler = require("../utils/asyncHandler");
const { verifyToken } = require("../utils/jwt");

const authMiddleware = asyncHandler((req, res, next) => {
  const token = req?.cookies?.token;
  if (!token)
    return res.status(400).json({ success: false, message: "Token not found" });

  const decoded = verifyToken(token, process.env.JWT_SECRET);
  if (!decoded)
    return res.status(400).json({ success: false, message: "Invalid Token" });

  req.user = decoded.user;
  next();
});

module.exports = authMiddleware;
