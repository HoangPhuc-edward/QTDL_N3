const pool = require("../utils/mysql.util");

class PhimService {
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT *
      FROM PHIM
      WHERE TrangThai = 1
      ORDER BY MaPhim DESC
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
    try {
      // Update the PHIM table
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

      // Get current showtimes for the film
      const [currentSuatChieu] = await conn.query(`SELECT MaSC FROM SUAT_CHIEU WHERE MaPhim = ? AND TrangThai = 1`, [
        phimData.MaPhim,
      ]);
      const currentMaSCList = currentSuatChieu.map((sc) => sc.MaSC);

      // Extract MaSC from suatChieuList for comparison
      const updatedMaSCList = suatChieuList.filter((sc) => sc.MaSC).map((sc) => sc.MaSC);

      // Identify MaSC to deactivate (present in current but not in updated)
      const maSCToDeactivate = currentMaSCList.filter((maSC) => !updatedMaSCList.includes(maSC));

      // Deactivate removed showtimes by setting TrangThai = 0
      if (maSCToDeactivate.length > 0) {
        await conn.query(`UPDATE SUAT_CHIEU SET TrangThai = 0 WHERE MaPhim = ? AND MaSC IN (?)`, [
          phimData.MaPhim,
          maSCToDeactivate,
        ]);
      }

      // Update or insert showtimes
      for (const sc of suatChieuList) {
        if (sc.MaSC) {
          await conn.query(
            `UPDATE SUAT_CHIEU SET MaPhong = ?, NgayChieu = ?, GioChieu = ?, GiaNguoiLon = ?, GiaTreEm = ?, TrangThai = 1
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

      console.log("Updated suatChieuList:", suatChieuList);
      return { success: true };
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }
  }

  static async delete(id) {
    const [result] = await pool.query(`UPDATE PHIM SET TrangThai = 0 WHERE MaPhim = ?`, [id]);
    return result.affectedRows > 0;
  }

  static async search({ TenPhim, TheLoai, DaoDien }) {
    const [rows] = await pool.query(`CALL TimKiemPhim(?, ?, ?)`, [TenPhim || null, TheLoai || null, DaoDien || null]);
    return rows[0];
  }

  static async getById(id) {
    const [phimRows] = await pool.query(`SELECT * FROM PHIM WHERE MaPhim = ? AND TrangThai = 1`, [id]);
    const [suatChieuRows] = await pool.query(`SELECT * FROM SUAT_CHIEU WHERE MaPhim = ? AND TrangThai = 1`, [id]);
    if (phimRows.length === 0) {
      throw new Error("Phim không tồn tại");
    }
    return {
      phim: phimRows[0],
      suatChieu: suatChieuRows,
    };
  }
}

module.exports = PhimService;
