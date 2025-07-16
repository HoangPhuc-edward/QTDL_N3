const GheService = require("../services/ghe.service");
const { Ghe } = require("../models/ghe.model");
class GheController {
  static async getAllGheByMaPhong(req, res) {
    try {
      const { maPhong } = req.params;
      const gheList = await GheService.getAllGheByMaPhong(maPhong);
      res.status(200).json(gheList);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving GHEs", error });
    }
  }

  static async getGheByMaGhe(req, res) {
    try {
      const { maGhePhong } = req.params;
      const ghe = await GheService.getGheByMaGhe(maGhePhong);
      res.status(200).json(ghe);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving GHE", error });
    }
  }

  static async layGheTrong(req, res) {
    try {
      const { maPhong } = req.params;
      const gheTrong = await GheService.layGheTrong(maPhong);
      res.status(200).json(gheTrong);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving available GHEs", error });
    }
  }

  static async createGhe(req, res) {
    try {
      const ghe = new Ghe(
        req.body.maPhong,
        req.body.soHang,
        req.body.soGhe,
        req.body.loaiGhe,
        req.body.trangThai
      );
      const result = await GheService.createGhe(ghe);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error creating GHE", error });
    }
  }

  static async updateGhe(req, res) {
    try {
      const { maGhePhong } = req.params;
      const ghe = new Ghe(
        req.body.maPhong,
        req.body.soHang,
        req.body.soGhe,
        req.body.loaiGhe,
        req.body.trangThai
      );
      const result = await GheService.updateGhe(maGhePhong, ghe);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error updating GHE", error });
    }
  }

  static async deleteGhe(req, res) {
    try {
      const { maGhePhong } = req.params;
      const result = await GheService.deleteGhe(maGhePhong);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error deleting GHE", error });
    }
  }
}

module.exports = GheController;
