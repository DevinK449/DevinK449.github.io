// Simply Savory — Mobile Nav Toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const navOverlay = document.getElementById("navOverlay");

  if (!navToggle || !navLinks || !navOverlay) return;

  const openNav = () => {
    navLinks.classList.add("open");
    navOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
    navToggle.setAttribute("aria-expanded", "true");
  };

  const closeNav = () => {
    navLinks.classList.remove("open");
    navOverlay.classList.remove("show");
    document.body.style.overflow = "";
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    navLinks.classList.contains("open") ? closeNav() : openNav();
  });

  navOverlay.addEventListener("click", closeNav);

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeNav);
  });
});

