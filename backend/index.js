require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5000;

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.MYSQL_PORT || 3306,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("Lỗi kết nối MySQL:", err);
//     return;
//   }
//   console.log("Kết nối MySQL thành công!!!");
// });

app.use(cors());
app.use(express.json());

const routes = require("./app/routes/index.js");
app.use("/api", routes);

// app.get("/", (req, res) => {
//   connection.query("SELECT NOW() AS currentTime", (err, results) => {
//     if (err) {
//       res.status(500).send("Lỗi truy vấn");
//     } else {
//       res.send(`Giờ hệ thống MySQL: ${results[0].currentTime}`);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server chạy ở http://localhost:${port}`);
});
