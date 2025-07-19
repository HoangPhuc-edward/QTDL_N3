const PhongService = require("../services/Phong.service");

class PhongController {
  static async getAll(req, res) {
    try {
      const phongs = await PhongService.getAll();
      res.json(phongs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async taoGheTuDong(req, res) {
    const { maPhong, soCotToiDa } = req.body;
    try {
      const result = await PhongService.taoGheTuDong(maPhong, soCotToiDa);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async getById(req, res) {
    const { maPhong } = req.params;
    try {
      const phong = await PhongService.getById(maPhong);
      res.json(phong);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    const phong = req.body;
    try {
      const result = await PhongService.create(phong);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    const { maPhong } = req.params;
    const phong = req.body;
    try {
      const result = await PhongService.update(maPhong, phong);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    const { maPhong } = req.params;
    try {
      const result = await PhongService.delete(maPhong);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = PhongController;
