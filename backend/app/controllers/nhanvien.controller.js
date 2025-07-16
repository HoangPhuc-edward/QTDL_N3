const NhanVienService = require("../services/nhanvien.service");
const NhanVien = require("../models/nhanvien.model");

class NhanVienController {
  static async dangKy(req, res) {
    try {
      const nhanVienData = req.body;

      if (
        !nhanVienData ||
        !nhanVienData.hoTenNV ||
        !nhanVienData.sdt ||
        !nhanVienData.matKhau
      ) {
        return res
          .status(400)
          .json({ error: "Thông tin đăng ký không đầy đủ" });
      }

      const nhanVien = new NhanVien(
        nhanVienData.hoTenNV,
        nhanVienData.sdt,
        nhanVienData.matKhau
      );
      const result = await NhanVienService.dangky(nhanVien);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Lỗi server" });
    }
  }

  static async dangNhap(req, res) {
    try {
      const nhanVienData = req.body;

      if (!nhanVienData || !nhanVienData.sdt || !nhanVienData.matKhau) {
        return res
          .status(400)
          .json({ error: "Thông tin đăng nhập không đầy đủ" });
      }

      const nhanVien = new NhanVien(
        null,
        nhanVienData.sdt,
        nhanVienData.matKhau
      );
      const result = await NhanVienService.dangnhap(nhanVien);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(401).json(result);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Lỗi server" });
    }
  }
}

module.exports = NhanVienController;
