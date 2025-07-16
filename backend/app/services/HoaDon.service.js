const pool = require("../utils/mysql.util");

class HoaDonService {
  // Lấy all
  static async getAll() {
    const [rows] = await pool.query(`SELECT * FROM HOA_DON`);
    return rows;
  }
  // Thêm hóa đơn mới
  static async create({ MaKH, MaNV, MaCombo, SoLuongCombo }) {
    const currentDate = new Date().toISOString().slice(0, 10);

    const [khach] = await pool.query(`SELECT 1 FROM KHACH_HANG WHERE MaKH = ?`, [MaKH]);
    if (khach.length === 0) {
      throw new Error(`MaKH ${MaKH} không tồn tại`);
    }

    const [nhanvien] = await pool.query(`SELECT 1 FROM NHAN_VIEN WHERE MaNV = ?`, [MaNV]);
    if (nhanvien.length === 0) {
      throw new Error(`MaNV ${MaNV} không tồn tại`);
    }

    const [combo] = await pool.query(`SELECT GiaCombo FROM BAP_NUOC WHERE MaCombo = ?`, [MaCombo]);
    if (combo.length === 0) {
      throw new Error(`MaCombo ${MaCombo} không tồn tại`);
    }

    const [result] = await pool.query(
      `INSERT INTO HOA_DON (MaKH, MaNV, MaCombo, SoLuongCombo, NgayMua)
     VALUES (?, ?, ?, ?, ?)`,
      [MaKH, MaNV, MaCombo, SoLuongCombo, currentDate]
    );

    const [rows] = await pool.query(`SELECT * FROM HOA_DON WHERE MaHD = ?`, [result.insertId]);
    return rows[0];
  }
  // Chỉnh sửa hóa đơn

  static async update(id, { MaKH, MaNV, MaCombo, SoLuongCombo }) {
    const [khach] = await pool.query(`SELECT 1 FROM KHACH_HANG WHERE MaKH = ?`, [MaKH]);
    if (khach.length === 0) throw new Error(`MaKH ${MaKH} không tồn tại`);

    const [nhanvien] = await pool.query(`SELECT 1 FROM NHAN_VIEN WHERE MaNV = ?`, [MaNV]);
    if (nhanvien.length === 0) throw new Error(`MaNV ${MaNV} không tồn tại`);

    const [combo] = await pool.query(`SELECT GiaCombo FROM BAP_NUOC WHERE MaCombo = ?`, [MaCombo]);
    if (combo.length === 0) throw new Error(`MaCombo ${MaCombo} không tồn tại`);

    const GiaCombo = combo[0].GiaCombo;
    const TongTien = GiaCombo * SoLuongCombo;

    const [result] = await pool.query(
      `UPDATE HOA_DON
     SET MaKH = ?, MaNV = ?, MaCombo = ?, SoLuongCombo = ?, TongTien = ?
     WHERE MaHD = ?`,
      [MaKH, MaNV, MaCombo, SoLuongCombo, TongTien, id]
    );

    return result.affectedRows > 0;
  }
  // Xóa

  static async delete(id) {
    const [result] = await pool.query(`DELETE FROM HOA_DON WHERE MaHD = ?`, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = HoaDonService;
