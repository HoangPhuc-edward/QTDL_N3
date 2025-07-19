const express = require("express");
const nhanVienRoutes = require("./NhanVien.route.js");
const phongRoutes = require("./Phong.route.js");
const gheRoutes = require("./Ghe.route.js");

const VeRoutes = require("./Ve.route");
const BapNuocRoutes = require("./Bap.route");
const HoaDonRoutes = require("./HoaDon.route");
const PhimRoutes = require("./Phim.route.js");
const SuatChieuRoutes = require("./SuatChieu.route");

const router = express.Router();

router.use("/phong", phongRoutes);
router.use("/ghe", gheRoutes);
router.use("/nhanvien", nhanVienRoutes);

router.use("/ve", VeRoutes);
router.use("/bap-nuoc", BapNuocRoutes);
router.use("/hoa-don", HoaDonRoutes);
router.use("/phim", PhimRoutes);
router.use("/suatchieu", SuatChieuRoutes);

module.exports = router;
