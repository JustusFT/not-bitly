const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const linksRouter = require("./links");

router.use("/auth", authRouter);
router.use("/links", linksRouter);

module.exports = router;
