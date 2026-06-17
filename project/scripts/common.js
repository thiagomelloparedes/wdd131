const yearEl = document.querySelector("#currentyear");
const modEl = document.querySelector("#lastModified");

function setFooterDates() {
    if (yearEl) yearEl.textContent = `${new Date().getFullYear()}`;
    if (modEl) modEl.textContent = `Last Modified: ${document.lastModified}`;
}

function getFavSet() {
    const raw = localStorage.getItem("tgh_favorites");
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr : []);
}

function setFavSet(favSet) {
    localStorage.setItem("tgh_favorites", JSON.stringify(Array.from(favSet)));
}

function updateFavBadge() {
    const badge = document.querySelector("#favCount");
    if (!badge) return;
    badge.textContent = `${getFavSet().size}`;
}

setFooterDates();
updateFavBadge();

window.tgh = window.tgh || {};
window.tgh.getFavSet = getFavSet;
window.tgh.setFavSet = setFavSet;
window.tgh.updateFavBadge = updateFavBadge;
