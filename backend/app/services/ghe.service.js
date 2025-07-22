const pool = require("../utils/mysql.util");
const { Ghe } = require("../models/ghe.model");

class GheService {
  static async getAllGheByMaPhong(maPhong) {
    const query = `
            SELECT * FROM GHE WHERE MaPhong = ${maPhong} and TrangThai = 1;
        `;

    const [result] = await pool.query(query);
    return result;
  }

  static async getAllGheByMaSC(maSC) {
    const query = `
            SELECT ghe.*
            FROM GHE ghe
            JOIN SUAT_CHIEU sc ON ghe.MaPhong = sc.MaPhong
            WHERE sc.MaSC = ${maSC} AND ghe.TrangThai = 1;
        `;

    const [result] = await pool.query(query);
    return result;
  }

  static async getGheByMaGhe(maGhePhong) {
    const query = `
            SELECT * FROM GHE WHERE MaGhePhong = '${maGhePhong}';
        `;
    const [result] = await pool.query(query);
    return result;
  }

  static async kiemTraGheTrong(maGhe, maSC) {
    const query = `
            SELECT fn_ghe_co_trong('${maGhe}', ${maSC}) AS isAvailable;
        `;
    const [result] = await pool.query(query);
    return result[0].isAvailable === 1;
  }

  static async layGheTrong(maSC) {
    const query = `
            CALL sp_ghe_trong(${maSC}); 
        `;
    const [result] = await pool.query(query);
    return result;
  }

  /** * Create a new Ghe record in the database.
   * @param {Ghe} ghe - The Ghe object to be created.
   */
  static async createGhe(ghe) {
    const query = `
          CALL sp_them_hoac_khoi_phuc_ghe(${ghe.maPhong}, ${ghe.soHang}, ${ghe.soGhe}, '${ghe.loaiGhe}');
        `;
    const result = await pool.query(query);
    return result;
  }

  /** * Update an existing Ghe record in the database.
   * @param {Ghe} ghe - The Ghe object with updated values.
   */
  static async updateGhe(maGhePhong, ghe) {
    const query = `
            UPDATE GHE
            SET MaGhe = '${ghe.maGhe}', MaPhong = ${ghe.maPhong}, SoHang = ${ghe.soHang}, SoGhe = ${ghe.soGhe}, LoaiGhe = '${ghe.loaiGhe}', TrangThai = ${ghe.trangThai}
            WHERE MaGhePhong = '${maGhePhong}';
        `;
    const result = await pool.query(query);
    return result;
  }

  static async deleteGhe(maGhePhong) {
    const query = `
            UPDATE GHE
            SET TrangThai = 0
            WHERE MaGhePhong = '${maGhePhong}';
        `;
    const result = await pool.query(query);
    return result;
  }
}

module.exports = GheService;
