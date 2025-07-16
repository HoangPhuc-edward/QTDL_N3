const pool = require("../utils/mysql.util");
class BapNuocService {
  // Lấy tất cả combo
  static async getAll() {
    const [rows] = await pool.query(`SELECT * FROM BAP_NUOC`);
    return rows;
  }

  // Thêm combo mới
  static async create({ TenCombo, GiaCombo, MoTa }) {
    const [result] = await pool.query(`INSERT INTO BAP_NUOC (TenCombo, GiaCombo, MoTa) VALUES (?, ?, ?)`, [
      TenCombo,
      GiaCombo,
      MoTa,
    ]);
    return { MaCombo: result.insertId, TenCombo, GiaCombo, MoTa };
  }

  // Cập nhật combo
  static async update(id, { TenCombo, GiaCombo, MoTa }) {
    const [result] = await pool.query(`UPDATE BAP_NUOC SET TenCombo = ?, GiaCombo = ?, MoTa = ? WHERE MaCombo = ?`, [
      TenCombo,
      GiaCombo,
      MoTa,
      id,
    ]);
    return result.affectedRows > 0;
  }

  // Xóa combo
  static async delete(id) {
    const [result] = await pool.query(`DELETE FROM BAP_NUOC WHERE MaCombo = ?`, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = BapNuocService;
