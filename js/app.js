const feedEl = document.getElementById("feed");

function renderFeed() {
  const scrollPos = feedEl.scrollTop; // remember where she was

  feedEl.innerHTML = dateIdeas
    .map(
      (idea) => `
      <article class="card card--${idea.gradient}" data-id="${idea.id}">
        <span class="chip">${idea.category}</span>
        <h2>${idea.title}</h2>
        <p>${idea.note}</p>
        <button class="like-btn">${idea.status === "saved" ? "❤️" : "🤍"}</button>
      </article>
    `,
    )
    .join("");

  feedEl.scrollTop = scrollPos; // jump back there
}

renderFeed();

let lastTapTime = 0;
let lastTapCardId = null;

feedEl.addEventListener("click", (e) => {
  // Case 1: tap on the like button → toggle
  const btn = e.target.closest(".like-btn");
  if (btn) {
    const card = btn.closest(".card");
    const idea = dateIdeas.find((i) => i.id === Number(card.dataset.id));
    idea.status = idea.status === "saved" ? "new" : "saved";
    renderFeed();
    if (idea.status === "saved") showToast("Saved to Potentials 💌");
    return;
  }

  // Case 2: tap anywhere else on a card → maybe a double-tap
  const card = e.target.closest(".card");
  if (!card) return;

  const id = Number(card.dataset.id);
  const now = Date.now();
  const isDoubleTap = now - lastTapTime < 300 && lastTapCardId === id;

  if (isDoubleTap) {
    const idea = dateIdeas.find((i) => i.id === id);
    if (idea.status !== "saved") {
      idea.status = "saved";
      renderFeed();
      showToast("Saved to Potentials 💌");
    }
    spawnBurst(id);
  }

  lastTapTime = now;
  lastTapCardId = id;
});

function spawnBurst(id) {
  const card = feedEl.querySelector(`.card[data-id="${id}"]`);
  const heart = document.createElement("span");
  heart.className = "burst-heart";
  heart.textContent = "❤️";
  card.appendChild(heart);
  setTimeout(() => heart.remove(), 600);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("toast--show");
  setTimeout(() => toast.classList.remove("toast--show"), 1800);
}
