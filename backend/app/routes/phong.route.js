const PhongController = require("../controllers/phong.controller");

const express = require("express");
const router = express.Router();

router.get("/", PhongController.getAll);
router.get("/:maPhong", PhongController.getById);
router.post("/", PhongController.create);
router.post("/auto", PhongController.taoGheTuDong);
router.put("/:maPhong", PhongController.update);
router.delete("/:maPhong", PhongController.delete);
module.exports = router;
