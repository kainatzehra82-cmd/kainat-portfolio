const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.querySelector(".site-header");
const backTop = document.getElementById("backTop");

menuToggle?.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuToggle.innerHTML = navMenu.classList.contains("open")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
    backTop.classList.toggle("show", window.scrollY > 650);
});

const sections = [...document.querySelectorAll("main section[id]")];
const updateActiveNav = () => {
    const current = sections.reduce((active, section) => {
        if (window.scrollY + 180 >= section.offsetTop) return section.id;
        return active;
    }, "home");

    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
};
window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

backTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
};

document.querySelectorAll(".image-expand").forEach(button => {
    button.addEventListener("click", () => {
        lightboxImage.src = button.dataset.image;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
    });
});

document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
});

document.querySelectorAll(".thumb").forEach(button => {
    button.addEventListener("click", () => {
        const project = button.dataset.project;
        const image = button.dataset.src;
        const card = button.closest(".project-card");
        const mainImage = card.querySelector(".project-image");
        const expand = card.querySelector(".image-expand");

        mainImage.src = image;
        expand.dataset.image = image;

        card.querySelectorAll(`.thumb[data-project="${project}"]`).forEach(t => t.classList.remove("active"));
        button.classList.add("active");
    });
});
