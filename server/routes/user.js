const router = require("express").Router();
const { register, login, logout } = require("../controllers/user");
const {
  validate,
  registerSchema,
  loginSchema,
} = require("../middlewares/validation");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

module.exports = router;
