const express = require("express");
const router = express.Router();
const NhanVienController = require("../controllers/NhanVien.controller");

router.post("/dangky", NhanVienController.dangKy);
router.post("/dangnhap", NhanVienController.dangNhap);

module.exports = router;
