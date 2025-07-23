const pool = require("../utils/mysql.util");

class HoaDonService {
  // Lấy all
  static async getAll() {
    const [hoaDonCombo] = await pool.query(`
    SELECT 
      HD.MaHD, HD.MaKH, HD.MaCombo,
      HD.SoLuongCombo, HD.NgayMua, HD.TongTien,
      KH.TenKH, KH.SDT AS SDT_KH, KH.Email,
      BN.GiaCombo
    FROM HOA_DON HD
    JOIN KHACH_HANG KH ON HD.MaKH = KH.MaKH
    JOIN BAP_NUOC BN ON HD.MaCombo = BN.MaCombo
    ORDER BY HD.MaHD ASC
  `);
    return hoaDonCombo;
  }

  static async create({ TenKhachHang, SoDienThoai, MaCombo, SoLuongCombo }) {
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const currentDate = new Date().toISOString().slice(0, 10);

    try {
      let khachHang = {
        TenKH: TenKhachHang,
        SDT: SoDienThoai,
      };

      let newMaKH;

      if (!SoDienThoai) {
        // Không có SDT → tạo ngẫu nhiên
        const randomNumber = getRandomInt(1000, 9999);
        khachHang = {
          TenKH: TenKhachHang || `KhachHang_${randomNumber}`,
          SDT: `09${getRandomInt(10000000, 99999999)}`,
          Email: `kh_${randomNumber}@mail.com`,
        };

        const [insertKH] = await pool.query(`INSERT INTO KHACH_HANG (TenKH, SDT, Email) VALUES (?, ?, ?)`, [
          khachHang.TenKH,
          khachHang.SDT,
          khachHang.Email,
        ]);
        newMaKH = insertKH.insertId;
      } else {
        // Có SDT → kiểm tra có tồn tại không
        const [existingKH] = await pool.query(`SELECT MaKH, TenKH, Email FROM KHACH_HANG WHERE SDT = ? LIMIT 1`, [
          SoDienThoai,
        ]);

        if (existingKH.length > 0) {
          // Dùng lại MaKH cũ
          const foundKH = existingKH[0];
          newMaKH = foundKH.MaKH;
          khachHang = {
            TenKH: foundKH.TenKH,
            SDT: SoDienThoai,
            Email: foundKH.Email,
          };
        } else {
          // Không có → tạo mới
          const randomNumber = getRandomInt(1000, 9999);
          khachHang.Email = `kh_${randomNumber}@mail.com`;

          const [insertKH] = await pool.query(`INSERT INTO KHACH_HANG (TenKH, SDT, Email) VALUES (?, ?, ?)`, [
            khachHang.TenKH,
            khachHang.SDT,
            khachHang.Email,
          ]);
          newMaKH = insertKH.insertId;
        }
      }

      // Kiểm tra combo
      const [combo] = await pool.query(`SELECT GiaCombo FROM BAP_NUOC WHERE MaCombo = ?`, [MaCombo]);
      if (combo.length === 0) {
        throw new Error(`MaCombo ${MaCombo} không tồn tại`);
      }

      // Tạo hóa đơn
      const [result] = await pool.query(
        `INSERT INTO HOA_DON (MaKH, MaCombo, SoLuongCombo, NgayMua)
       VALUES (?, ?, ?, ?)`,
        [newMaKH, MaCombo, SoLuongCombo, currentDate]
      );

      return {
        MaHD: result.insertId,
        MaKH: newMaKH,
        MaCombo,
        SoLuongCombo,
        NgayMua: currentDate,
        KhachHang: khachHang,
      };
    } catch (err) {
      console.error("Lỗi khi tạo hóa đơn:", err);
      throw err;
    }
  }

  // Chỉnh sửa hóa đơn

  static async update(id, { MaKH, MaNV, MaCombo, SoLuongCombo }) {
    // const [khach] = await pool.query(`SELECT 1 FROM KHACH_HANG WHERE MaKH = ?`, [MaKH]);
    // if (khach.length === 0) throw new Error(`MaKH ${MaKH} không tồn tại`);
    // const [nhanvien] = await pool.query(`SELECT 1 FROM NHAN_VIEN WHERE MaNV = ?`, [MaNV]);
    // if (nhanvien.length === 0) throw new Error(`MaNV ${MaNV} không tồn tại`);
    // const [combo] = await pool.query(`SELECT GiaCombo FROM BAP_NUOC WHERE MaCombo = ?`, [MaCombo]);
    // if (combo.length === 0) throw new Error(`MaCombo ${MaCombo} không tồn tại`);
    // const GiaCombo = combo[0].GiaCombo;
    // const TongTien = GiaCombo * SoLuongCombo;
    // const [result] = await pool.query(
    //   `UPDATE HOA_DON
    //  SET MaKH = ?, MaNV = ?, MaCombo = ?, SoLuongCombo = ?, TongTien = ?
    //  WHERE MaHD = ?`,
    //   [MaKH, MaNV, MaCombo, SoLuongCombo, TongTien, id]
    // );
    // return result.affectedRows > 0;
  }
  // Xóa

  static async delete(id) {
    const [result] = await pool.query(`DELETE FROM HOA_DON WHERE MaHD = ?`, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = HoaDonService;
