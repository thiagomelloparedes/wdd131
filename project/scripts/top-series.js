function platformIcon(platform) {
    const map = {
        "Netflix": "images/netflix.svg",
        "Disney+": "images/disneyplus.svg",
        "Prime Video": "images/primevideo.svg",
        "HBO Max": "images/hbomax.svg",
        "Apple TV+": "images/appletv.svg"
    };

    return map[platform] || "images/netflix.svg";
}

function uniqueGenres(series) {
    const set = new Set(series.map((s) => s.genre));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function fillGenreOptions() {
    const sel = document.querySelector("#genre");
    if (!sel) return;

    const opts = uniqueGenres(window.tgh.series)
        .map((g) => `<option value="${g}">${g}</option>`)
        .join("");

    sel.insertAdjacentHTML("beforeend", opts);
}

function seriesCardHtml(series) {
    const favSet = window.tgh.getFavSet();
    const isFav = favSet.has(series.id);
    const icon = platformIcon(series.platform);

    return `
    <article class="series-card">
      <div class="series-top">
        <div>
          <h3 class="series-title">${series.title}</h3>
          <ul class="series-meta">
            <li class="pill">${series.platform}</li>
            <li class="pill">${series.genre}</li>
            <li class="pill">${series.year}</li>
            <li class="pill">⭐ ${series.rating.toFixed(1)}</li>
          </ul>
        </div>
        <img src="${icon}" alt="${series.platform} logo" width="36" height="36" loading="lazy">
      </div>

      <p class="series-desc">${series.desc}</p>

      <div class="card-actions">
        <button class="star-btn" type="button" data-series-id="${series.id}" data-fav="${isFav}">
          ${isFav ? "★ Remove Favorite" : "☆ Add Favorite"}
        </button>
      </div>
    </article>
  `;
}

function readFilters() {
    return {
        q: document.querySelector("#q")?.value ?? "",
        platform: document.querySelector("#platform")?.value ?? "all",
        genre: document.querySelector("#genre")?.value ?? "all",
        sort: document.querySelector("#sort")?.value ?? "rating-desc"
    };
}

function applyFilters(series, filters) {
    const q = filters.q.trim().toLowerCase();

    return series.filter((s) => {
        const matchesQ = q.length === 0
            ? true
            : `${s.title} ${s.desc} ${s.genre} ${s.platform}`.toLowerCase().includes(q);

        const matchesPlatform = filters.platform === "all" ? true : s.platform === filters.platform;
        const matchesGenre = filters.genre === "all" ? true : s.genre === filters.genre;

        return matchesQ && matchesPlatform && matchesGenre;
    });
}

function applySort(series, sortKey) {
    const arr = [...series];

    if (sortKey === "rating-desc") arr.sort((a, b) => b.rating - a.rating);
    if (sortKey === "rating-asc") arr.sort((a, b) => a.rating - b.rating);
    if (sortKey === "year-desc") arr.sort((a, b) => b.year - a.year);
    if (sortKey === "year-asc") arr.sort((a, b) => a.year - b.year);
    if (sortKey === "title-asc") arr.sort((a, b) => a.title.localeCompare(b.title));

    return arr;
}

function renderSeries(list) {
    const grid = document.querySelector("#seriesGrid");
    const count = document.querySelector("#resultsCount");
    const empty = document.querySelector("#emptyState");
    if (!grid || !count || !empty) return;

    grid.innerHTML = list.map((s) => seriesCardHtml(s)).join("");
    count.textContent = `${list.length}`;
    empty.hidden = list.length !== 0;

    grid.querySelectorAll(".star-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.currentTarget.dataset.seriesId;
            const set = window.tgh.getFavSet();

            if (set.has(id)) set.delete(id);
            else set.add(id);

            window.tgh.setFavSet(set);
            window.tgh.updateFavBadge();

            refresh();
        });
    });
}

function renderFavorites() {
    const grid = document.querySelector("#favGrid");
    const empty = document.querySelector("#favEmpty");
    if (!grid || !empty) return;

    const set = window.tgh.getFavSet();
    const favSeries = window.tgh.series.filter((s) => set.has(s.id));

    grid.innerHTML = favSeries.length
        ? favSeries.map((s) => seriesCardHtml(s)).join("")
        : "";

    empty.hidden = favSeries.length !== 0;

    grid.querySelectorAll(".star-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.currentTarget.dataset.seriesId;
            const set = window.tgh.getFavSet();

            set.delete(id);

            window.tgh.setFavSet(set);
            window.tgh.updateFavBadge();

            refresh();
        });
    });
}

function refresh() {
    const filters = readFilters();
    const filtered = applyFilters(window.tgh.series, filters);
    const sorted = applySort(filtered, filters.sort);

    renderSeries(sorted);
    renderFavorites();
}

function resetFilters() {
    const q = document.querySelector("#q");
    const platform = document.querySelector("#platform");
    const genre = document.querySelector("#genre");
    const sort = document.querySelector("#sort");

    if (q) q.value = "";
    if (platform) platform.value = "all";
    if (genre) genre.value = "all";
    if (sort) sort.value = "rating-desc";

    refresh();
}

function initEvents() {
    const filtersForm = document.querySelector("#filters");
    const resetBtn = document.querySelector("#resetBtn");
    const clearFavBtn = document.querySelector("#clearFavBtn");

    if (filtersForm) {
        filtersForm.addEventListener("input", refresh);
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", resetFilters);
    }

    if (clearFavBtn) {
        clearFavBtn.addEventListener("click", () => {
            localStorage.removeItem("tgh_favorites");
            window.tgh.updateFavBadge();
            refresh();
        });
    }
}

fillGenreOptions();
initEvents();
refresh();