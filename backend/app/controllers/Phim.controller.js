const PhimService = require("../services/Phim.service");
const moment = require("moment");

class PhimController {
  static async getAll(req, res) {
    try {
      const data = await PhimService.getAll();
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).send("Lỗi khi lấy danh sách phim");
    }
  }

  static async getSchedulesByDate(req, res) {
    try {
      const rawDate = req.params.date;
      const date = moment(rawDate, ["YYYY-MM-DD", "D-M-YYYY", "DD-MM-YYYY"]).format("YYYY-MM-DD");
      const data = await PhimService.getSchedulesByDate(date);
      res.json(data);
    } catch (err) {
      console.error("Lỗi khi lấy lịch chiếu theo ngày:", err);
      res.status(500).send("Lỗi server khi truy vấn lịch chiếu");
    }
  }
  static async getNowShowing(req, res) {
    try {
      const data = await PhimService.getNowShowing();
      res.json(data);
    } catch (err) {
      console.error("Lỗi khi lấy phim đang khởi chiếu:", err);
      res.status(500).send("Lỗi server khi lấy phim đang chiếu");
    }
  }

  static async create(req, res) {
    try {
      const { SuatChieu, ...phimData } = req.body;
      const result = await PhimService.create(phimData, SuatChieu);
      res.status(201).json({ message: "Thêm phim và suất chiếu thành công", MaPhim: result.MaPhim });
    } catch (err) {
      console.error("Lỗi khi thêm phim và suất chiếu:", err);
      res.status(500).send("Lỗi server khi thêm phim và suất chiếu");
    }
  }

  static async update(req, res) {
    try {
      const { SuatChieu, ...phimData } = req.body;
      await PhimService.update(phimData, SuatChieu);
      res.json({ message: "Cập nhật phim và suất chiếu thành công" });
    } catch (err) {
      console.error("Lỗi khi cập nhật phim và suất chiếu:", err);
      res.status(500).send("Lỗi server khi cập nhật phim và suất chiếu");
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const success = await PhimService.delete(id);
      if (success) {
        res.json({ message: "Xoá phim thành công (cập nhật trạng thái)" });
      } else {
        res.status(404).json({ message: "Không tìm thấy phim để xoá" });
      }
    } catch (err) {
      console.error("Lỗi khi xoá phim:", err);
      res.status(500).send("Lỗi server khi xoá phim");
    }
  }
  static async search(req, res) {
    try {
      const { TenPhim, TheLoai, DaoDien } = req.query;
      const data = await PhimService.search({ TenPhim, TheLoai, DaoDien });
      res.json(data);
    } catch (err) {
      console.error("Lỗi khi tìm kiếm phim:", err);
      res.status(500).send("Lỗi server khi tìm kiếm phim");
    }
  }
}

module.exports = PhimController;
