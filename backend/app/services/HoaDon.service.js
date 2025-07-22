const pool = require("../utils/mysql.util");

class HoaDonService {
  // Lấy all
  static async getAll() {
    const [rows] = await pool.query(`
    SELECT 
      HD.MaHD,
      HD.MaKH,
      HD.MaNV,
      HD.MaCombo,
      HD.SoLuongCombo,
      HD.NgayMua,
      HD.TongTien,

      KH.TenKH,
      KH.SDT AS SDT_KH,
      KH.Email,

      NV.HoTenNV,
      BN.GiaCombo,

      COUNT(VE.MaVe) AS SoLuongVe,
      SUM(VE.GiaVe) AS TongTienVe

    FROM HOA_DON HD
    JOIN KHACH_HANG KH ON HD.MaKH = KH.MaKH
    JOIN NHAN_VIEN NV ON HD.MaNV = NV.MaNV
    JOIN BAP_NUOC BN ON HD.MaCombo = BN.MaCombo
    LEFT JOIN VE ON VE.MaKH = KH.MaKH

    GROUP BY HD.MaHD
     ORDER BY HD.MaHD ASC
  `);
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
