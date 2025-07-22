const GheController = require("../controllers/Ghe.controller");

const express = require("express");
const router = express.Router();

router.get("/:maPhong", GheController.getAllGheByMaPhong);
router.get("/sc/:maSC", GheController.getAllGheByMaSC);
router.get("/info/:maGhePhong", GheController.getGheByMaGhe);
router.get("/empty/:maSC", GheController.layGheTrong);
router.get("/check/:maGhe/:maSC", GheController.kiemTraGheTrong);
router.post("/", GheController.createGhe);
router.put("/:maGhePhong", GheController.updateGhe);
router.delete("/:maGhePhong", GheController.deleteGhe);

module.exports = router;
