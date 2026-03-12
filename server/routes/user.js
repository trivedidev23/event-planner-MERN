const router = require("express").Router();
const { register, login } = require("../controllers/user");
const {
  validate,
  registerSchema,
  loginSchema,
} = require("../middlewares/validation");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
