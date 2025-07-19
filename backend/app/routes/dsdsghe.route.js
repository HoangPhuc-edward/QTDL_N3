const GheController = require("../controllers/ssghe.controller");

const express = require("express");
const router = express.Router();

router.get("/:maPhong", GheController.getAllGheByMaPhong);
router.get("/info/:maGhePhong", GheController.getGheByMaGhe);
router.get("/empty/:maPhong", GheController.layGheTrong);
router.post("/", GheController.createGhe);
router.put("/:maGhePhong", GheController.updateGhe);
router.delete("/:maGhePhong", GheController.deleteGhe);

module.exports = router;
