const router = require("express").Router();
const { register, login } = require("../controllers/user");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validation");

router.get("/register", validateRegister, register);
router.get("/login", validateLogin, login);

module.exports = router;
