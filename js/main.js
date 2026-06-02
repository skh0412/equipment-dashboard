const states = [
  { cls: "ok",   label: "정상" },
  { cls: "warn", label: "점검필요" },
  { cls: "stop", label: "정지" },
];

const statusLabel = {
  ok:   "정상",
  warn: "점검필요",
  stop: "정지",
};

function createCard(item) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = item.id; // 카드에 id 저장 (PATCH 때 필요)

  card.innerHTML = `
    <h2>${item.name}</h2>
    <span class="status ${item.status}">${statusLabel[item.status]}</span>
  `;

  const badge = card.querySelector(".status");
  card.addEventListener("click", () => {
    const current = states.findIndex(s => badge.classList.contains(s.cls));
    const next = (current + 1) % states.length;

    // 화면 업데이트
    badge.classList.remove(states[current].cls);
    badge.classList.add(states[next].cls);
    badge.textContent = states[next].label;

    // ★ DB에도 저장 (PATCH API 호출)
    fetch(`/api/equipment/${card.dataset.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: states[next].cls }),
    });
  });

  return card;
}

fetch("/api/equipment")
  .then(res => res.json())
  .then(list => {
    const grid = document.querySelector(".grid");
    list.forEach(item => grid.appendChild(createCard(item)));
  })
  .catch(err => console.error("데이터 로드 실패:", err));