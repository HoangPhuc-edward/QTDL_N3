const express = require("express");
const PhimController = require("../controllers/wsphim.controller");
const router = express.Router();

router.get("/search", PhimController.search);
router.get("/ngay/:date", PhimController.getSchedulesByDate);
router.get("/dang-chieu", PhimController.getNowShowing);

router.put("/", PhimController.update);
router.route("/").get(PhimController.getAll).post(PhimController.create);

router.route("/:id").delete(PhimController.delete);
module.exports = router;
