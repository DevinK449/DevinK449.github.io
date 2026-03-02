// Simply Savory — Mobile Nav Toggle

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const navOverlay = document.getElementById("navOverlay");

  // Prevent errors if something is missing
  if (!navToggle || !navLinks || !navOverlay) {
    console.log("Nav elements missing on this page");
    return;
  }

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
// ---------- Lightbox Feature ----------
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  // If you didn’t add the HTML modal on this page, do nothing
  if (!lightbox || !lightboxImg || !lightboxClose) return;

  // Make selected images clickable (recipe cards, category cards, hero images)
  const clickableImages = document.querySelectorAll(
    ".recipe-card img, .category-card img, .cat-page-card img, .hero-img img"
  );

  const openLightbox = (img) => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "Image preview";
    lightboxCaption.textContent = img.alt || "";
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  };

  clickableImages.forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(img));
  });

  lightboxClose.addEventListener("click", closeLightbox);

  // Click outside image closes
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("show")) closeLightbox();
  });
});