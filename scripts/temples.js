// 1) Current year in the footer
document.getElementById("currentyear").textContent = new Date().getFullYear();

// 2) Last modified date/time in the footer
document.getElementById("lastModified").innerHTML = document.lastModified;


// 3) Hamburger menu toggle
const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});
