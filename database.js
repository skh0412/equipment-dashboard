const Database = require("better-sqlite3");

// equipment.db 파일에 연결 (없으면 자동 생성)
const db = new Database("equipment.db");

// 테이블이 없으면 만들기
db.exec(`
  CREATE TABLE IF NOT EXISTS equipment (
    id     TEXT PRIMARY KEY,
    name   TEXT NOT NULL,
    status TEXT NOT NULL
  )
`);

// 데이터가 아직 없으면 초기값 넣기
const count = db.prepare("SELECT COUNT(*) as cnt FROM equipment").get();
if (count.cnt === 0) {
  const insert = db.prepare(
    "INSERT INTO equipment (id, name, status) VALUES (?, ?, ?)"
  );
  insert.run("A", "설비 A", "ok");
  insert.run("B", "설비 B", "warn");
  insert.run("C", "설비 C", "stop");
}

module.exports = db;