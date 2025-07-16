const pool = require("../utils/mysql.util");

class Service {
  // 1. Lấy tất cả vé
  static async getAllVe() {
    try {
      const [rows] = await pool.query("SELECT * FROM ve");
      console.log(rows, "fdss");
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async createVe({ MaSC, MaGhePhong, GiaVe, TenKH, SDT, Email }) {
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    try {
      const currentDate = new Date().toISOString().slice(0, 10);

      // Nếu không đủ thông tin → tạo ngẫu nhiên
      const isRandom = !TenKH || !SDT || !Email;
      let khachHang = {
        TenKH,
        SDT,
        Email,
      };

      if (isRandom) {
        const randomNumber = getRandomInt(1000, 9999);
        khachHang = {
          TenKH: TenKH || `KhachHang_${randomNumber}`,
          SDT: SDT || `09${getRandomInt(10000000, 99999999)}`,
          Email: Email || `kh_${randomNumber}@mail.com`,
        };
        console.log("🔄 Tạo khách hàng ngẫu nhiên:", khachHang);
      } else {
        console.log("📥 Dùng thông tin khách hàng từ client:", khachHang);
      }

      //  Thêm khách hàng
      const [khachHangResult] = await pool.query(`INSERT INTO KHACH_HANG (TenKH, SDT, Email) VALUES (?, ?, ?)`, [
        khachHang.TenKH,
        khachHang.SDT,
        khachHang.Email,
      ]);
      const newMaKH = khachHangResult.insertId;

      const [[gheResult]] = await pool.query(`SELECT MaPhong FROM GHE WHERE MaGhePhong = ?`, [MaGhePhong]);
      if (!gheResult) {
        throw new Error(`❌ Không tìm thấy ghế với mã ${MaGhePhong}`);
      }
      const maPhong = gheResult.MaPhong;

      const [[phongResult]] = await pool.query(`SELECT TrangThai FROM PHONG_CHIEU WHERE MaPhong = ?`, [maPhong]);
      if (!phongResult) {
        throw new Error(`❌ Không tìm thấy phòng chiếu với mã ${maPhong}`);
      }

      if (phongResult.TrangThai === 0) {
        throw new Error(`🚫 Phòng ${maPhong} hiện không hoạt động, không thể đặt vé.`);
      }

      //  Thêm vé
      const [veResult] = await pool.query(
        `INSERT INTO VE (MaSC, MaKH, MaGhePhong, NgayDat, GiaVe)
         VALUES (?, ?, ?, ?, ?)`,
        [MaSC, newMaKH, MaGhePhong, currentDate, GiaVe]
      );

      return {
        MaVe: veResult.insertId,
        MaKH: newMaKH,
        MaSC,
        MaGhePhong,
        NgayDat: currentDate,
        GiaVe,
        TrangThai: "Chưa sử dụng",
        KhachHang: khachHang,
      };
    } catch (err) {
      console.error(" Lỗi khi tạo vé:", err);
      throw err;
    }
  }

  // 3. Cập nhật vé (sửa ghế và suất chiếu)
  static async updateVe(id, { MaSC, MaGhePhong }) {
    try {
      // 1. Kiểm tra vé có tồn tại
      const [[ve]] = await pool.query(`SELECT * FROM VE WHERE MaVe = ?`, [id]);
      if (!ve) {
        throw new Error(`Không tìm thấy vé có mã ${id}`);
      }

      // 2. Nếu có MaGhePhong → kiểm tra ghế tồn tại
      if (MaGhePhong) {
        const [[ghe]] = await pool.query(`SELECT * FROM GHE WHERE MaGhePhong = ?`, [MaGhePhong]);
        if (!ghe) {
          throw new Error(`Ghế "${MaGhePhong}" không tồn tại`);
        }
      }

      // 3. Nếu có MaGhePhong và MaSC → kiểm tra ghế đã bị đặt chưa
      if (MaGhePhong && MaSC) {
        const [[daDat]] = await pool.query(`SELECT 1 FROM VE WHERE MaGhePhong = ? AND MaSC = ? AND MaVe != ?`, [
          MaGhePhong,
          MaSC,
          id,
        ]);
        if (daDat) {
          throw new Error(`Ghế "${MaGhePhong}" đã được đặt cho suất chiếu ${MaSC}`);
        }
      }

      // 4. Xây dựng câu query động (chỉ cập nhật những field có truyền)
      const fields = [];
      const values = [];

      if (MaSC) {
        fields.push("MaSC = ?");
        values.push(MaSC);
      }

      if (MaGhePhong) {
        fields.push("MaGhePhong = ?");
        values.push(MaGhePhong);
      }

      if (fields.length === 0) {
        throw new Error("Không có trường nào được truyền để cập nhật");
      }

      values.push(id); // cuối cùng là id

      const query = `UPDATE VE SET ${fields.join(", ")} WHERE MaVe = ?`;
      const [result] = await pool.query(query, values);

      return result.affectedRows > 0;
    } catch (err) {
      console.error("Lỗi khi cập nhật vé:", err);
      throw err;
    }
  }

  // 4. Xóa vé
  static async deleteVe(id) {
    try {
      const [result] = await pool.query(`UPDATE VE SET TrangThai = 'Đã huỷ' WHERE MaVe = ?`, [id]);
      return result.affectedRows > 0;
    } catch (err) {
      console.error("Lỗi khi huỷ vé:", err);
      throw err;
    }
  }
}

module.exports = Service;
