const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get("/api/equipment", (req, res) => {
  const raw = fs.readFileSync(path.join(__dirname, "data.json"), "utf-8");
  const equipment = JSON.parse(raw);
  res.json(equipment);
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});