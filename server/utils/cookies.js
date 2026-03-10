const setCookies = (res, token) => {
  res.cookie("token", token, {
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

module.exports = { setCookies };
