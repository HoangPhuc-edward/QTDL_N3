const express = require("express");
const HoaDonController = require("../controllers/HoaDon.controller");
const router = express.Router();

router.route("/").get(HoaDonController.getAll).post(HoaDonController.create);

router.route("/:id").put(HoaDonController.update).delete(HoaDonController.delete);

module.exports = router;
