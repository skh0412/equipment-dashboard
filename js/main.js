/// 상태 순환 순서 (클릭 시 사용)
const states = [
  { cls: "ok",   label: "정상" },
  { cls: "warn", label: "점검필요" },
  { cls: "stop", label: "정지" },
];

// 상태 코드 → 한글 변환
const statusLabel = {
  ok:   "정상",
  warn: "점검필요",
  stop: "정지",
};

// 카드 한 개를 만들어 반환하는 함수
function createCard(item) {
  const card = document.createElement("div");
  card.className = "card";

  // 받아온 데이터로 카드 안을 채움
  card.innerHTML = `
    <h2>${item.name}</h2>
    <span class="status ${item.status}">${statusLabel[item.status]}</span>
  `;

  // 클릭 시 상태 순환 (이전과 동일)
  const badge = card.querySelector(".status");
  card.addEventListener("click", () => {
    const current = states.findIndex(s => badge.classList.contains(s.cls));
    const next = (current + 1) % states.length;
    badge.classList.remove(states[current].cls);
    badge.classList.add(states[next].cls);
    badge.textContent = states[next].label;
  });

  return card;
}

// ★ API 호출 → 데이터 받기 → 카드 그리기
fetch("/api/equipment")
  .then(res => res.json())
  .then(list => {
    const grid = document.querySelector(".grid");
    list.forEach(item => grid.appendChild(createCard(item)));
  })
  .catch(err => console.error("데이터 로드 실패:", err));