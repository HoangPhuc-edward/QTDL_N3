const VeController = require("../controllers/Ve.controller.js");
const express = require("express");

const router = express.Router();

router.route("/").get(VeController.getAllVe);
router.route("/").post(VeController.createVe);
router.route("/:id").patch(VeController.updateVe);
router.route("/:id").delete(VeController.deleteVe);

module.exports = router;
