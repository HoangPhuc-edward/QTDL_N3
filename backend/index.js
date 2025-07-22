require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./app/routes/index.js");
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server chạy ở http://localhost:${port}`);
});
