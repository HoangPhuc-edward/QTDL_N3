const pool = require("../utils/mysql.util");
const NhanVien = require("../models/nhanvien.model");

class NhanVienService {
  /**
   * @param {NhanVien} nhanVien
   */

  static async dangky(nhanVien) {
    try {
      const [rows] = await pool.query("CALL sp_dang_ky(?, ?, ?)", [
        nhanVien.hoTenNV,
        nhanVien.sdt,
        nhanVien.matKhau,
      ]);

      // Do CALL trả về mảng kết quả (mảng 2 chiều), lấy dòng đầu tiên từ kết quả đầu
      const message = rows[0][0]?.ThongBao;

      if (message === "Đăng ký thành công") {
        return { success: true, message };
      } else {
        return { success: false, message };
      }
    } catch (err) {
      throw err;
    }
  }

  static async dangnhap(nhanVien) {
    try {
      const { sdt, matKhau } = nhanVien;
      const [[result]] = await pool.query(
        "SELECT fn_dang_nhap(?, ?) AS hop_le",
        [sdt, matKhau]
      );

      if (result.hop_le === 1) {
        return { success: true, message: "Đăng nhập thành công" };
      } else {
        return { success: false, message: "Sai số điện thoại hoặc mật khẩu" };
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = NhanVienService;
