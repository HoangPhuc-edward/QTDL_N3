const Phong = require("../models/phong.model");
const pool = require("../utils/mysql.util");

class PhongService {
  static async getAll() {
    try {
      const [rows] = await pool.query("SELECT * FROM PHONG_CHIEU");
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async getByAttribute(attribute, value) {
    try {
      const [rows] = await pool.query(`SELECT * FROM PHONG_CHIEU WHERE ${attribute} = ?`, [value]);
      if (rows.length === 0) {
        throw new Error("Phong not found");
      }
      return rows.map((row) => new Phong(row.TenPhong, row.SoGhe, row.LoaiPhong, row.TrangThai));
    } catch (err) {
      throw err;
    }
  }

  static async taoGheTuDong(maPhong, soCotToiDa) {
    try {
      const [result] = await pool.query(`CALL sp_them_ghe_tu_dong(?, ?)`, [maPhong, soCotToiDa]);
      return {
        success: true,
        message: "Them ghe tu dong thanh cong",
      };
    } catch (err) {
      throw err;
    }
  }

  static async getById(maPhong) {
    try {
      const [rows] = await pool.query("SELECT * FROM PHONG_CHIEU WHERE MaPhong = ?", [maPhong]);
      if (rows.length === 0) {
        throw new Error("Phong not found");
      }
      const row = rows[0];
      return row;
    } catch (err) {
      throw err;
    }
  }
  /**
   * @param {Phong} phong
   */

  static async create(phong) {
    try {
      const [result] = await pool.query("INSERT INTO PHONG_CHIEU (TenPhong, SoGhe, LoaiPhong) VALUES (?, ?, ?)", [
        phong.tenPhong,
        phong.soGhe,
        phong.LoaiPhong,
      ]);
      return {
        success: true,
        message: "Phong created successfully",
        id: result.insertId,
      };
    } catch (err) {
      throw err;
    }
  }

  static async update(maPhong, phong) {
    try {
      const [result] = await pool.query(
        "UPDATE PHONG_CHIEU SET TenPhong = ?, SoGhe = ?, LoaiPhong = ?, TrangThai = ? WHERE MaPhong = ?",
        [phong.tenPhong, phong.soGhe, phong.loaiPhong, phong.trangThai, maPhong]
      );
      if (result.affectedRows === 0) {
        throw new Error("Phong not found");
      }
      return { success: true, message: "Phong updated successfully" };
    } catch (err) {
      throw err;
    }
  }

  static async delete(maPhong) {
    try {
      const [result] = await pool.query("UPDATE PHONG_CHIEU SET TrangThai = 0 WHERE MaPhong = ?", [maPhong]);
      if (result.affectedRows === 0) {
        throw new Error("Phong not found");
      }
      return { success: true, message: "Phong deleted successfully" };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PhongService;
