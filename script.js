const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
const year = document.querySelector("#year");

document.documentElement.classList.add("js");
if (year) year.textContent = String(new Date().getFullYear());

function closeMenu({ returnFocus = false } = {}) {
  menu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  if (returnFocus) menuButton.focus();
}

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
    menu.classList.toggle("open", !isExpanded);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      closeMenu({ returnFocus: true });
    }
  });

  document.addEventListener("click", (event) => {
    if (menu.classList.contains("open") && !menu.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });
}

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    if (image.matches(".pet-figure img")) {
      image.closest("figure").hidden = true;
      return;
    }

    image.hidden = true;
    image.closest(".interest-item")?.classList.add("image-missing");
  }, { once: true });
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  document.body.classList.add("reveal-ready");
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}