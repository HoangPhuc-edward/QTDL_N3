const express = require("express");
const nhanVienRoutes = require("./dsnhanvien.route.js");
const phongRoutes = require("./dsphong.route.js");
const gheRoutes = require("./dsdsghe.route.js");

const VeRoutes = require("./Ve.route");
const BapNuocRoutes = require("./Bap.route");
const HoaDonRoutes = require("./HoaDon.route");
const PhimRoutes = require("./dsphim.route.js");
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
