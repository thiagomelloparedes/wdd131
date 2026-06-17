const COUNT_KEY = "tgh_suggestion_count";
const LIST_KEY = "tgh_suggestions";

function getSuggestions() {
    const raw = localStorage.getItem(LIST_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
}

function setSuggestions(list) {
    localStorage.setItem(LIST_KEY, JSON.stringify(list));
}

function getCount() {
    const n = Number(localStorage.getItem(COUNT_KEY));
    return Number.isFinite(n) ? n : 0;
}

function setCount(n) {
    localStorage.setItem(COUNT_KEY, `${n}`);
}

function escapeHtml(text) {
    return `${text}`
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function suggestionHtml(item) {
    const title = escapeHtml(item.title);
    const platform = escapeHtml(item.platform);
    const genre = escapeHtml(item.genre || "—");
    const why = escapeHtml(item.why || "");
    const name = escapeHtml(item.name || "Anonymous");
    const date = escapeHtml(item.date);

    return `
    <article class="sugg-item">
      <h3 class="sugg-title">${title}</h3>
      <p class="muted small">
        <span class="pill">${platform}</span>
        <span class="pill">${genre}</span>
        <span class="pill">${date}</span>
        <span class="pill">by ${name}</span>
      </p>
      ${why.length ? `<p>${why}</p>` : `<p class="muted">No comment provided.</p>`}
    </article>
  `;
}

function renderSuggestions() {
    const box = document.querySelector("#suggestionsList");
    if (!box) return;

    const list = getSuggestions().slice(0, 6);
    box.innerHTML = list.length
        ? list.map((s) => suggestionHtml(s)).join("")
        : `<p class="muted">No suggestions saved yet. Submit one using the form above.</p>`;
}

function handleSubmissionFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const hasRequired = params.has("title") && params.has("platform");
    if (!hasRequired) return;

    const submittedSection = document.querySelector("#submitted");
    const msg = document.querySelector("#submitMsg");
    const countEl = document.querySelector("#suggestCount");
    if (!submittedSection || !msg || !countEl) return;

    const title = (params.get("title") || "").trim();
    const platform = (params.get("platform") || "").trim();
    const genre = (params.get("genre") || "").trim();
    const why = (params.get("why") || "").trim();
    const name = (params.get("name") || "").trim();

    if (title.length === 0 || platform.length === 0) return;

    const now = new Date();
    const item = {
        title,
        platform,
        genre,
        why,
        name,
        date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
    };

    const list = getSuggestions();
    setSuggestions([item, ...list].slice(0, 20));

    const nextCount = getCount() + 1;
    setCount(nextCount);

    submittedSection.hidden = false;
    msg.textContent = `Suggestion saved: ${item.title} (${item.platform})`;
    countEl.textContent = `${nextCount}`;

    window.history.replaceState({}, document.title, `${window.location.pathname}#submitted`);
}

function initClearButton() {
    const btn = document.querySelector("#clearSuggestionsBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        localStorage.removeItem(LIST_KEY);
        localStorage.removeItem(COUNT_KEY);

        const submittedSection = document.querySelector("#submitted");
        if (submittedSection) submittedSection.hidden = true;

        renderSuggestions();
    });
}

handleSubmissionFromQuery();
initClearButton();
renderSuggestions();
