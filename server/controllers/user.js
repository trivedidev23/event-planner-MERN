const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const hashItem = require("../utils/bcrypt");
const { setCookies } = require("../utils/cookies");
const { generateAccessToken } = require("../utils/jwt");
const bcrypt = require("bcryptjs");

const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  let user = await User.findOne({
    $or: [{ email }, { phone }],
  });
  if (user)
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  user = new User({
    name,
    email,
    phone,
    password,
  });

  const hashedPassword = await hashItem(password);
  user.password = hashedPassword;
  await user.save();
  const token = generateAccessToken(user, process.env.JWT_SECRET, "24h");
  setCookies(res, token);
  return res
    .status(201)
    .json({ success: true, message: "User created successfully" });
});
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(404)
      .json({ message: "Invalid credentials", success: false });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res
      .status(404)
      .json({ message: "Invalid credentials", success: false });

  const token = generateAccessToken(user, process.env.JWT_SECRET, "24h");
  setCookies(res, token);
  return res
    .status(200)
    .json({ success: true, message: "User logged in successfully" });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
  });
  return res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
});

module.exports = { register, login, logout };
