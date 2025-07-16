const express = require("express");
const tempRoutes = require("./temp.route.js");
const nhanVienRoutes = require("./nhanvien.route.js");
const phongRoutes = require("./phong.route.js");
const gheRoutes = require("./ghe.route.js"); // thêm ghe route
// const userRoutes = require('./user.route'); // bạn có thể thêm sau

const router = express.Router();

// Gắn từng route vào đường dẫn cụ thể
router.use("/temps", tempRoutes);
// router.use('/users', userRoutes); // ví dụ khác
router.use("/phong", phongRoutes);
router.use("/ghe", gheRoutes); // thêm ghe route
router.use("/nhanvien", nhanVienRoutes);

module.exports = router;
