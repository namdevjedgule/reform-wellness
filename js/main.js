document.addEventListener("DOMContentLoaded", function () {

    /* ================= NAVBAR ================= */

    fetch("../components/navbar.html")
        .then(response => response.text())
        .then(data => {

            document.getElementById("navbar").innerHTML = data;

            /* ===== ACTIVE LINK ===== */

            const currentPath = window.location.pathname;

            document.querySelectorAll(".nav-links a").forEach(link => {

                const linkPath = new URL(link.href).pathname;

                if (
                    currentPath === linkPath ||
                    (currentPath.includes(linkPath) && linkPath !== "/")
                ) {
                    link.classList.add("active");
                }

            });

            /* ===== HAMBURGER ===== */

            const hamburger = document.querySelector("#hamburger");
            const navLinks = document.querySelector("#navLinks");

            if (hamburger && navLinks) {

                hamburger.onclick = function () {

                    navLinks.classList.toggle("active");
                    hamburger.classList.toggle("active");

                    document.body.classList.toggle("menu-open");

                };

                /* ===== CLOSE MENU ON LINK CLICK ===== */

                document.querySelectorAll(".nav-links a").forEach(link => {

                    link.onclick = () => {

                        navLinks.classList.remove("active");
                        hamburger.classList.remove("active");

                        document.body.classList.remove("menu-open");

                    };

                });

            }

            /* ===== NAVBAR SCROLL EFFECT ===== */

            const nav = document.querySelector("#navbar nav");

            window.addEventListener("scroll", () => {

                if (nav) {
                    nav.classList.toggle("scrolled", window.scrollY > 60);
                }

            });

        });

    /* ================= FOOTER ================= */

    fetch("../components/footer.html")
        .then(response => response.text())
        .then(data => {

            document.getElementById("footer").innerHTML = data;

        });

    /* ================= FADE-UP ANIMATION ================= */

    const fadeEls = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry, i) => {

            if (entry.isIntersecting) {

                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, i * 80);

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.1
    });

    fadeEls.forEach(el => observer.observe(el));

});