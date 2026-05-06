document.addEventListener("DOMContentLoaded", function () {

    // LOAD NAVBAR
    fetch("../components/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data;

            // ACTIVE MENU LINK
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

            // MOBILE MENU
            const menuBtn = document.getElementById("menuBtn");

            if (menuBtn) {
                menuBtn.addEventListener("click", function () {
                    document.getElementById("mobileMenu")
                        .classList.toggle("hidden");
                });
            }

            // NAVBAR SCROLL EFFECT
            const nav = document.querySelector("nav");

            window.addEventListener("scroll", () => {
                if (nav) {
                    nav.classList.toggle("scrolled", window.scrollY > 60);
                }
            });

        });


    // LOAD FOOTER
    fetch("../components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });


    // FADE-UP ANIMATION
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