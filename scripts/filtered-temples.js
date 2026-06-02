// ===============================
// Footer: current year + last modified
// ===============================
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ===============================
// Hamburger menu toggle
// ===============================
const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});

// ===============================
// Temple data array
// ===============================
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-5088.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-45813.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/payson-utah-temple/payson-utah-temple-11086.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/yigo-guam-temple/yigo-guam-temple-26495.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/washington-d.c.-temple/washington-d.c.-temple-26454.jpg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    // Added temples (3+ as required)
    {
        templeName: "Arequipa Perú",
        location: "Arequipa, Perú",
        dedicated: "2019, December, 15",
        area: 26969,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/arequipa-peru-temple/arequipa-peru-temple-7277.jpg"
    },
    {
        templeName: "Los Olivos Perú",
        location: "Lima, Perú",
        dedicated: "2024, January, 14",
        area: 47413,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/lima-peru-los-olivos-temple/lima-peru-los-olivos-temple-42524.jpg"
    },
    {
        templeName: "Trujillo Perú",
        location: "Trujillo, Perú",
        dedicated: "2015, June, 21",
        area: 28200,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/trujillo-peru-temple/trujillo-peru-temple-3712.jpg"
    }
];

// ===============================
// Build and display temple cards
// ===============================
const templesContainer = document.querySelector("#temples");
const pageTitle = document.querySelector("main h1");

// Extract the year from the dedicated string (e.g., "1888, May, 21" -> 1888)
function getDedicatedYear(temple) {
    return Number(temple.dedicated.split(",")[0]);
}

// Create and display temple cards from a list of temple objects
function displayTemples(templeList) {
    templesContainer.innerHTML = "";

    templeList.forEach((temple) => {
        const card = document.createElement("section");
        const name = document.createElement("h2");
        const location = document.createElement("p");
        const dedicated = document.createElement("p");
        const area = document.createElement("p");
        const img = document.createElement("img");

        name.textContent = temple.templeName;
        location.textContent = `Location: ${temple.location}`;
        dedicated.textContent = `Dedicated: ${temple.dedicated}`;
        area.textContent = `Area: ${temple.area.toLocaleString()} sq ft`;

        // Image attributes (absolute URL, alt text, native lazy loading)
        img.src = temple.imageUrl;
        img.alt = temple.templeName;
        img.loading = "lazy";

        // Reduce CLS by reserving image space
        img.width = 400;
        img.height = 250;

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);
        card.appendChild(img);

        templesContainer.appendChild(card);
    });
}

// ===============================
// Navigation filtering
// ===============================
const navLinks = document.querySelectorAll(".navigation a");

function setActiveLink(clickedLink) {
    navLinks.forEach((link) => link.classList.remove("active"));
    clickedLink.classList.add("active");
}

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        // Close mobile menu after selecting an item
        navigation.classList.remove("open");
        hamButton.classList.remove("open");

        setActiveLink(link);

        const filterName = link.textContent.trim().toLowerCase();

        if (filterName === "home") {
            pageTitle.textContent = "Home";
            displayTemples(temples);
        } else if (filterName === "old") {
            pageTitle.textContent = "Old";
            displayTemples(temples.filter((t) => getDedicatedYear(t) < 1900));
        } else if (filterName === "new") {
            pageTitle.textContent = "New";
            displayTemples(temples.filter((t) => getDedicatedYear(t) > 2000));
        } else if (filterName === "large") {
            pageTitle.textContent = "Large";
            displayTemples(temples.filter((t) => t.area > 90000));
        } else if (filterName === "small") {
            pageTitle.textContent = "Small";
            displayTemples(temples.filter((t) => t.area < 10000));
        }
    });
});

// ===============================
// Initial display (Home)
// ===============================
displayTemples(temples);
