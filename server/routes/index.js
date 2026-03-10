const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/event", require("./event"));

module.exports = router;
