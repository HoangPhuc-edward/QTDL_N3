const pool = require("../utils/mysql.util");
const { Ghe } = require("../models/ghe.model");

class GheService {
  static async getAllGheByMaPhong(maPhong) {
    const query = `
            SELECT * FROM GHE WHERE MaPhong = ${maPhong};
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

  static async layGheTrong(maPhong) {
    const query = `
            CALL sp_ghe_trong(${maPhong}); 
        `;
    const [result] = await pool.query(query);
    return result;
  }

  /** * Create a new Ghe record in the database.
   * @param {Ghe} ghe - The Ghe object to be created.
   */
  static async createGhe(ghe) {
    const query = `
            INSERT INTO GHE (MaGhePhong, MaGhe, MaPhong, SoHang, SoGhe, LoaiGhe, TrangThai)
            VALUES ('${ghe.maGhePhong}', '${ghe.maGhe}', ${ghe.maPhong}, ${ghe.soHang}, ${ghe.soGhe}, '${ghe.loaiGhe}', ${ghe.trangThai});
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
