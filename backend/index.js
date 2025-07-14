const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối MySQL:", err);
    return;
  }
  console.log("Kết nối MySQL thành công!");
});

app.get("/", (req, res) => {
  connection.query("SELECT NOW() AS currentTime", (err, results) => {
    if (err) {
      res.status(500).send("Lỗi truy vấn");
    } else {
      res.send(`Giờ hệ thống MySQL: ${results[0].currentTime}`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server chạy ở http://localhost:${port}`);
});
