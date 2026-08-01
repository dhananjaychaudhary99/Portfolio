// ===== Radial Menu Toggle =====
const toggle = document.querySelector('.menu .toggle');
const menuItems = document.querySelectorAll('.menu li:not(.toggle)');
let rotationOffset = 0;
let open = false;

toggle.addEventListener('click', () => {
    open = !open;

    if (open) {
        const total = menuItems.length;
        const radius = 80; // distance from toggle center

        menuItems.forEach((item, index) => {
            // Calculate angle with rotation offset
            const angleDeg = (360 / total) * index + rotationOffset;
            const x = radius * Math.cos(angleDeg * Math.PI / 180);
            const y = radius * Math.sin(angleDeg * Math.PI / 180);
            item.style.transform = `translate(${x}px, ${-y}px) scale(1)`;
        });

        // Rotate next time
        rotationOffset += 90; // rotate all items by 45° for next open
    } else {
        // Collapse back to center
        menuItems.forEach((item) => {
            item.style.transform = 'translate(0,0) scale(0)';
        });
    }
});

// ===== Auto Update Footer Year =====
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// ===== Active Navbar + Sticky Header =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// ===== Reveal Animations =====
const revealElements = document.querySelectorAll(".section, .card");

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});

// ===== Select the toggle button inside the menu =====
