const { Router } = require("express");
const { login, register } = require("../controllers/userController.js");
const router = Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;
