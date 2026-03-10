const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const hashItem = require("../utils/bcrypt");
const { setCookies } = require("../utils/cookies");
const { generateAccessToken } = require("../utils/jwt");

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
  const token = generateAccessToken(user, process.env.JWT_SECRET, "15m");
  setCookies(res, token);
  return res
    .status(201)
    .json({ success: true, message: "User created successfully" });
});
const login = asyncHandler(async (req, res) => {});

module.exports = { register, login };
