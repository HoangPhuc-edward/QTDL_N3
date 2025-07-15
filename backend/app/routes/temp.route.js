const TempController = require("../controllers/temp.controller");
const express = require("express");

const router = express.Router();

router.route("/").get(TempController.getAllTempes);

module.exports = router;
