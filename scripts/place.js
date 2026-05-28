// Footer: current year and last modified
const yearSpan = document.querySelector("#currentyear");
const modifiedSpan = document.querySelector("#lastModified");

yearSpan.textContent = new Date().getFullYear();
modifiedSpan.textContent = document.lastModified;

// Static weather values (must match what's displayed in HTML)
const temperatureC = Number(document.querySelector("#temp").textContent); // °C
const windSpeedKmh = Number(document.querySelector("#wind").textContent); // km/h
const windChillSpan = document.querySelector("#windchill");

// Wind chill function (Metric - Environment Canada style)
const calculateWindChill = (t, v) =>
    13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16);

// Only calculate if valid:
const isValidWindChill = (t, v) => t <= 10 && v > 4.8;

if (isValidWindChill(temperatureC, windSpeedKmh)) {
    const chill = calculateWindChill(temperatureC, windSpeedKmh);
    windChillSpan.textContent = `${chill.toFixed(1)} °C`;
} else {
    windChillSpan.textContent = "N/A";
}
