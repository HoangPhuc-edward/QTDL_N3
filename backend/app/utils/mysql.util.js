require("dotenv").config();
const mysql = require("mysql2/promise");

// Tạo pool kết nối với MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true,
});

// Kiểm tra xem pool có kết nối được không
pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database.!!!");
    connection.release();
  })
  .catch((error) => {
    console.error("Error connecting to MySQL:", error);
    process.exit(1);
  });

module.exports = pool;
