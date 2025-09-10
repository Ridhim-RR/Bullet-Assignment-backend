// In file: routes/auth.js
const express = require("express");
const router = express.Router();
const mediaController = require("./media");
const authMiddleware = require("../../middleware/auth");

router.get("/list", authMiddleware, mediaController.getAllMedia);
router.get("/media/:id", authMiddleware, mediaController.getSingleMedia);
module.exports = router;
