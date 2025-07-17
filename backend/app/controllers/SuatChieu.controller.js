const SuatChieuService = require("../services/SuatChieu.service");

class SuatChieuController {
  static async getByPhim(req, res) {
    try {
      const maPhim = req.params.maPhim;
      const data = await SuatChieuService.getByPhim(maPhim);
      res.json(data);
    } catch (err) {
      console.error("Lỗi khi lấy suất chiếu theo mã phim:", err);
      res.status(500).send("Lỗi server khi truy vấn suất chiếu");
    }
  }
  static async getAvailableAfter15Minutes(req, res) {
    try {
      const { ngay, gio } = req.query;
      const data = await SuatChieuService.getAvailableAfter15Minutes(ngay, gio);
      res.json(data);
    } catch (err) {
      console.error("Lỗi khi tìm suất chiếu sau 15 phút:", err);
      res.status(500).send("Lỗi server khi tìm suất chiếu");
    }
  }

  static async getAvailableShowtimes(req, res) {
    try {
      const maPhim = req.params.id;
      const data = await SuatChieuService.getSuatChieuConGhe(maPhim);
      res.json(data);
    } catch (err) {
      console.error("Lỗi khi lấy suất chiếu còn chỗ trống:", err);
      res.status(500).send("Lỗi server");
    }
  }
}

module.exports = SuatChieuController;
