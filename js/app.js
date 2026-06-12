const feedEl = document.getElementById("feed");

function renderFeed() {
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
}

renderFeed();
