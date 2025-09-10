// In file: routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("./auth");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);


module.exports = router;
