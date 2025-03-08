require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// 取得 iframe 的 API 路徑
app.get("/iframe/api", (req, res) => {
  const apiUrl = `${process.env.API_URL}/iframe/canvas`;
  res.json({ apiUrl });
});

// 取得 iframe 的 API 路徑(Atlas)
app.get("/iframe/api/atlas", (req, res) => {
  const apiUrl = `${process.env.API_URL}/iframe/canvas/atlas`;
  res.json({ apiUrl });
});

// 取得 iframe 的 HTML 內容
app.get("/iframe/canvas", (req, res) => {
  res.sendFile(path.join(__dirname, "canvas.html"));
});

// 提供 iframe 內嵌的 atlas Canvas 頁面
app.get("/iframe/canvas/atlas", (req, res) => {
  res.sendFile(path.join(__dirname, "atlas.html"));
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
