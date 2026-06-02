// 상태 순서 정의: 정상 → 점검필요 → 정지 → (다시) 정상
const states = [
  { cls: "ok",   label: "정상" },
  { cls: "warn", label: "점검필요" },
  { cls: "stop", label: "정지" },
];

// 페이지에서 카드를 모두 찾는다
const cards = document.querySelectorAll(".card");

// 각 카드에 "클릭되면 실행할 동작"을 등록한다
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const badge = card.querySelector(".status");

    // 지금 상태가 배열의 몇 번째인지 찾기
    const current = states.findIndex((s) => badge.classList.contains(s.cls));

    // 다음 상태 (마지막이면 다시 0번으로 순환)
    const next = (current + 1) % states.length;

    // 색 클래스와 글자를 새 상태로 교체
    badge.classList.remove(states[current].cls);
    badge.classList.add(states[next].cls);
    badge.textContent = states[next].label;
  });
});