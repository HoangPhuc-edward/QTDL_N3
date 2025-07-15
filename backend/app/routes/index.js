const express = require("express");
const tempRoutes = require("./temp.route.js");
// const userRoutes = require('./user.route'); // bạn có thể thêm sau

const router = express.Router();

// Gắn từng route vào đường dẫn cụ thể
router.use("/temps", tempRoutes);
// router.use('/users', userRoutes); // ví dụ khác

module.exports = router;
