const express = require("express");
const path = require("path");
const db = require("./database"); // DB 연결 가져오기

const app = express();
const PORT = 3000;

app.use(express.json());        // 요청 body의 JSON을 파싱
app.use(express.static(__dirname));

// 설비 전체 조회
app.get("/api/equipment", (req, res) => {
  const equipment = db.prepare("SELECT * FROM equipment").all();
  res.json(equipment);
});

// 설비 상태 변경 (PATCH)
app.patch("/api/equipment/:id", (req, res) => {
  const { id } = req.params;   // URL의 :id 부분 (예: "A")
  const { status } = req.body; // 요청 body의 status 값
  db.prepare("UPDATE equipment SET status = ? WHERE id = ?").run(status, id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});