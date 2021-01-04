"use strict"

const express = require("express");

const router = express.Router();

router.use("/login",require('./login'));
router.use("/logout",require('./logout'));

router.use("/add_user",require("./add_user"));
router.use("/del_user",require("./del_user"));
router.use("/get_user",require("./get_user"));
router.use("/set_user",require("./set_user"));

router.use("/add_talk",require("./add_talk"));
router.use("/del_talk",require("./del_talk"));
router.use("/get_talk",require("./get_talk"));
router.use("/set_talk",require("./set_talk"));

module.exports = router;