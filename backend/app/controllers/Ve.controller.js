const VeService = require("../services/Ve.service");

class VeController {
  // 1. Lấy tất cả vé
  static async getAllVe(req, res) {
    try {
      const data = await VeService.getAllVe();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi lấy danh sách vé");
    }
  }

  // 2. Thêm vé
  static async createVe(req, res) {
    try {
      console;
      const { MaSC, MaGhePhong, GiaVe, TenKH, SDT, Email } = req.body;
      const newVe = await VeService.createVe({ MaSC, MaGhePhong, GiaVe, TenKH, SDT, Email });
      console.log(newVe);
      res.status(201).json(newVe);
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi thêm vé");
    }
  }

  // 3. Cập nhật vé
  static async updateVe(req, res) {
    try {
      const id = req.params.id;
      const { MaSC, MaGhePhong } = req.body;
      const success = await VeService.updateVe(id, { MaSC, MaGhePhong });

      if (success) {
        res.status(200).json({ message: "Cập nhật vé thành công" });
      } else {
        res.status(404).json({ message: "Không tìm thấy vé để cập nhật" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi cập nhật vé");
    }
  }

  // 4. Xóa vé
  static async deleteVe(req, res) {
    try {
      const id = req.params.id;
      const success = await VeService.deleteVe(id);
      if (success) {
        res.status(200).json({ message: "Xóa vé thành công" });
      } else {
        res.status(404).json({ message: "Không tìm thấy vé để xóa" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi xóa vé");
    }
  }
}

module.exports = VeController;
