const pool = require("../utils/mysql.util");

class SuatChieuService {
  static async getByPhim(maPhim) {
    const [rows] = await pool.query(`CALL GetSuatChieuTheoPhim(?)`, [maPhim]);
    return rows[0]; // Vì CALL trả về [data, meta]
  }

  static async getAvailableAfter15Minutes(ngay, gio) {
    const [rows] = await pool.query(`CALL TimSuatChieuSau15Phut(?, ?)`, [ngay, gio]);
    return rows[0]; // vì CALL trả về [rows, metadata]
  }
  static async getSuatChieuConGhe(maPhim) {
    const [rows] = await pool.query(`CALL GetSuatChieuConGhe(?)`, [maPhim]);
    return rows[0];
  }
}

module.exports = SuatChieuService;
