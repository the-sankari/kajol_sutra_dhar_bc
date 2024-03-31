const links = document.querySelectorAll("nav ul li a");

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// JavaScript for mobile responsive navbar
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuItems = document.querySelector(".menu-items");

  menuToggle.addEventListener("click", function () {
    menuItems.classList.toggle("active");
  });
  // current year
  var currentYear = new Date().getFullYear();
  document.getElementById("currentYear").textContent = currentYear;
});
