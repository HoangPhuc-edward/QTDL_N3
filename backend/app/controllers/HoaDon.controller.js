const HoaDonService = require("../services/HoaDon.service");

class HoaDonController {
  static async getAll(req, res) {
    try {
      const data = await HoaDonService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).send("Lỗi khi lấy danh sách hóa đơn");
    }
  }

  static async create(req, res) {
    try {
      const { MaKH, TenKhachHang, SoDienThoai, MaCombo, SoLuongCombo } = req.body;
      const hoaDon = await HoaDonService.create({ MaKH, TenKhachHang, SoDienThoai, MaCombo, SoLuongCombo });
      res.status(201).json(hoaDon);
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi tạo hóa đơn");
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const { MaKH, MaNV, MaCombo, SoLuongCombo } = req.body;
      const success = await HoaDonService.update(id, { MaKH, MaNV, MaCombo, SoLuongCombo });

      if (success) {
        res.json({ message: "Cập nhật hóa đơn thành công" });
      } else {
        res.status(404).json({ message: "Không tìm thấy hóa đơn để cập nhật" });
      }
    } catch (err) {
      res.status(500).send("Lỗi khi cập nhật hóa đơn");
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const success = await HoaDonService.delete(id);

      if (success) {
        res.json({ message: "Xóa hóa đơn thành công" });
      } else {
        res.status(404).json({ message: "Không tìm thấy hóa đơn để xóa" });
      }
    } catch (err) {
      res.status(500).send("Lỗi khi xóa hóa đơn");
    }
  }
}

module.exports = HoaDonController;
