const BapNuocService = require("../services/Bap.service");

class BapNuocController {
  static async getAll(req, res) {
    try {
      const data = await BapNuocService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).send("Lỗi khi lấy danh sách combo");
    }
  }

  static async create(req, res) {
    try {
      const { TenCombo, GiaCombo, MoTa } = req.body;
      const combo = await BapNuocService.create({ TenCombo, GiaCombo, MoTa });
      res.status(201).json(combo);
    } catch (err) {
      res.status(500).send("Lỗi khi thêm combo");
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const { TenCombo, GiaCombo, MoTa } = req.body;
      const success = await BapNuocService.update(id, { TenCombo, GiaCombo, MoTa });
      if (success) {
        res.json({ message: "Cập nhật combo thành công" });
      } else {
        res.status(404).json({ message: "Không tìm thấy combo" });
      }
    } catch (err) {
      res.status(500).send("Lỗi khi cập nhật combo");
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const success = await BapNuocService.delete(id);
      if (success) {
        res.json({ message: "Xóa combo thành công" });
      } else {
        res.status(404).json({ message: "Không tìm thấy combo để xóa" });
      }
    } catch (err) {
      res.status(500).send("Lỗi khi xóa combo");
    }
  }
}

module.exports = BapNuocController;
