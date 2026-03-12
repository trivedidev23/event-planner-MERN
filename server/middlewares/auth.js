const asyncHandler = require("../utils/asyncHandler");
const { verifyToken } = require("../utils/jwt");

const authMiddleware = asyncHandler((req, res, next) => {
  const token = req?.cookies?.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Token not found" });

  const decoded = verifyToken(token, process.env.JWT_SECRET);
  if (!decoded)
    return res.status(401).json({
      success: false,
      message: "Unauthorized access, please login again.",
    });

  req.user = decoded.user;
  next();
});

module.exports = authMiddleware;
