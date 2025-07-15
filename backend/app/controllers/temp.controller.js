const TempService = require("../services/temp.service");

class TempController {
  static async getAllTempes(req, res) {
    try {
      const data = await TempService.getTempes();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
}

module.exports = TempController;
