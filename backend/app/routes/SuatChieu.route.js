const express = require("express");
const SuatChieuController = require("../controllers/SuatChieu.controller");
const router = express.Router();

// tìm theo mã phim
router.get("/phim/:maPhim", SuatChieuController.getByPhim);

// trong ngày
router.get("/tim-suat-chieu", SuatChieuController.getAvailableAfter15Minutes);

// lấy suất chiếu còn ghế trống của phim cụ thể
router.get("/phim/:id/suatchieu-con-ghe", SuatChieuController.getAvailableShowtimes);

module.exports = router;
