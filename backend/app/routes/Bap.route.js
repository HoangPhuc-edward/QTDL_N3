const express = require("express");
const BapNuocController = require("../controllers/BapNuoc.controller");
const router = express.Router();

router.route("/").get(BapNuocController.getAll).post(BapNuocController.create);

router.route("/:id").put(BapNuocController.update).delete(BapNuocController.delete);

module.exports = router;
