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

function pickFeatured(series) {
  const sorted = [...series].sort((a, b) => b.rating - a.rating);
  return sorted.slice(0, 3);
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
        <a class="btn btn-ghost" href="top-series.html">View in catalog</a>

        <button class="star-btn" type="button" data-series-id="${series.id}" data-fav="${isFav}">
          ${isFav ? "★ Favorited" : "☆ Add Favorite"}
        </button>
      </div>
    </article>
  `;
}

function renderFeatured() {
  const grid = document.querySelector("#featuredGrid");
  if (!grid) return;

  const featured = pickFeatured(window.tgh.series);

  grid.innerHTML = featured
    .map((s) => seriesCardHtml(s))
    .join("");

  grid.querySelectorAll(".star-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.seriesId;
      const set = window.tgh.getFavSet();

      if (set.has(id)) {
        set.delete(id);
      } else {
        set.add(id);
      }

      window.tgh.setFavSet(set);
      window.tgh.updateFavBadge();

      const nowFav = set.has(id);

      e.currentTarget.dataset.fav = `${nowFav}`;
      e.currentTarget.textContent =
        nowFav ? "★ Favorited" : "☆ Add Favorite";
    });
  });
}

renderFeatured();