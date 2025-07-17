const pool = require("../utils/mysql.util");

class PhimService {
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT *
      FROM PHIM
      WHERE TrangThai = 1
      ORDER BY NgayKhoiChieu DESC
    `);
    return rows;
  }

  static async getSchedulesByDate(date) {
    const [rows] = await pool.query(`CALL GetSuatChieuTheoNgay(?)`, [date]);
    return rows[0];
  }

  static async getNowShowing() {
    const [rows] = await pool.query(`
      SELECT *
      FROM PHIM
      WHERE CURDATE() BETWEEN NgayKhoiChieu AND NgayKetThuc
        AND TrangThai = 1
      ORDER BY NgayKhoiChieu DESC
    `);
    return rows;
  }

  static async create(phimData, suatChieuList) {
    const conn = await pool.getConnection();

    const [phimResult] = await conn.query(
      `INSERT INTO PHIM (TenPhim, TheLoai, DaoDien, ThoiLuong, NgayKhoiChieu, NgayKetThuc, DoTuoi)
       VALUES (?, ?, ?, ?, ?, DATE_ADD(?, INTERVAL 30 DAY), ?)`,
      [
        phimData.TenPhim,
        phimData.TheLoai,
        phimData.DaoDien,
        phimData.ThoiLuong,
        phimData.NgayKhoiChieu,
        phimData.NgayKhoiChieu,
        phimData.DoTuoi,
      ]
    );

    const maPhim = phimResult.insertId;

    for (const sc of suatChieuList) {
      await conn.query(
        `INSERT INTO SUAT_CHIEU (MaPhim, MaPhong, NgayChieu, GioChieu, GiaNguoiLon, GiaTreEm)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [maPhim, sc.MaPhong, sc.NgayChieu, sc.GioChieu, sc.GiaNguoiLon, sc.GiaTreEm]
      );
    }

    conn.release();
    return { MaPhim: maPhim };
  }

  static async update(phimData, suatChieuList) {
    const conn = await pool.getConnection();

    await conn.query(
      `UPDATE PHIM SET TenPhim = ?, TheLoai = ?, DaoDien = ?, ThoiLuong = ?, NgayKhoiChieu = ?, 
       NgayKetThuc = DATE_ADD(?, INTERVAL 30 DAY), DoTuoi = ?
       WHERE MaPhim = ?`,
      [
        phimData.TenPhim,
        phimData.TheLoai,
        phimData.DaoDien,
        phimData.ThoiLuong,
        phimData.NgayKhoiChieu,
        phimData.NgayKhoiChieu,
        phimData.DoTuoi,
        phimData.MaPhim,
      ]
    );

    for (const sc of suatChieuList) {
      if (sc.MaSC) {
        await conn.query(
          `UPDATE SUAT_CHIEU SET MaPhong = ?, NgayChieu = ?, GioChieu = ?, GiaNguoiLon = ?, GiaTreEm = ?
           WHERE MaSC = ? AND MaPhim = ?`,
          [sc.MaPhong, sc.NgayChieu, sc.GioChieu, sc.GiaNguoiLon, sc.GiaTreEm, sc.MaSC, phimData.MaPhim]
        );
      } else {
        await conn.query(
          `INSERT INTO SUAT_CHIEU (MaPhim, MaPhong, NgayChieu, GioChieu, GiaNguoiLon, GiaTreEm)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [phimData.MaPhim, sc.MaPhong, sc.NgayChieu, sc.GioChieu, sc.GiaNguoiLon, sc.GiaTreEm]
        );
      }
    }

    conn.release();
    return { success: true };
  }

  static async delete(id) {
    const [result] = await pool.query(`UPDATE PHIM SET TrangThai = 0 WHERE MaPhim = ?`, [id]);
    return result.affectedRows > 0;
  }

  static async search({ TenPhim, TheLoai, DaoDien }) {
    const [rows] = await pool.query(`CALL TimKiemPhim(?, ?, ?)`, [TenPhim || null, TheLoai || null, DaoDien || null]);
    return rows[0];
  }
}

module.exports = PhimService;
