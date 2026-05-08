document.addEventListener("DOMContentLoaded", function () {

    const depth = window.location.pathname
        .split("/")
        .filter(Boolean).length;

    const prefix = depth > 0
        ? "../".repeat(depth)
        : "./";

    const navbarEl = document.getElementById("navbar");

    if (!navbarEl) return;

    fetch(prefix + "components/navbar.html")
        .then(r => {
            if (!r.ok) throw new Error("navbar 404");
            return r.text();
        })
        .then(html => {

            navbarEl.innerHTML = html;

            const drawer = navbarEl.querySelector("#mobileDrawer");

            if (drawer) {
                document.body.appendChild(drawer);
            }

            initNavbar();
        })
        .catch(err => console.warn("Navbar load failed:", err));

    function initNavbar() {

        const navBar = navbarEl.querySelector("nav");
        const hamburger = navbarEl.querySelector("#hamburger");

        const drawer = document.getElementById("mobileDrawer");
        const drawerBackdrop = document.getElementById("drawerBackdrop");

        const currentPath = window.location.pathname;

        navbarEl.querySelectorAll(".nav-links a").forEach(link => {

            const lp = new URL(
                link.href,
                window.location.origin
            ).pathname;

            const match = lp === "/"
                ? currentPath === "/"
                : currentPath.startsWith(lp);

            if (match) {
                link.classList.add("active");
            }
        });

        drawer?.querySelectorAll(".drawer-nav a").forEach(link => {

            const lp = new URL(
                link.href,
                window.location.origin
            ).pathname;

            const match = lp === "/"
                ? currentPath === "/"
                : currentPath.startsWith(lp);

            if (match) {
                link.classList.add("active");
            }
        });

        const onScroll = () => {

            if (navBar) {
                navBar.classList.toggle(
                    "scrolled",
                    window.scrollY > 60
                );
            }
        };

        window.addEventListener(
            "scroll",
            onScroll,
            { passive: true }
        );

        onScroll();

        let pageContent = document.getElementById("pageContent");

        if (!pageContent) {

            pageContent = document.createElement("div");

            pageContent.id = "pageContent";
            pageContent.classList.add("page-content");

            const toWrap = [];

            document.body.childNodes.forEach(node => {

                const isNavbar = node === navbarEl;

                const isDrawer =
                    node.nodeType === 1 &&
                    (
                        node.classList?.contains("drawer") ||
                        node.id === "mobileDrawer"
                    );

                const isWaBtn =
                    node.nodeType === 1 &&
                    node.classList?.contains("wa-btn");

                if (!isNavbar && !isDrawer) {
                    toWrap.push(node);
                }
            });

            if (toWrap.length) {

                document.body.insertBefore(
                    pageContent,
                    toWrap[0]
                );

                toWrap.forEach(n => {
                    pageContent.appendChild(n);
                });
            }

        } else {

            pageContent.classList.add("page-content");
        }

        function openDrawer() {

            if (!drawer) return;

            drawer.classList.add("open");

            drawer.setAttribute(
                "aria-hidden",
                "false"
            );

            hamburger?.classList.add("active");

            hamburger?.setAttribute(
                "aria-expanded",
                "true"
            );

            hamburger?.setAttribute(
                "aria-label",
                "Close menu"
            );

            document.body.classList.add("menu-open");

            pageContent?.classList.add("blurred");
        }

        function closeDrawer() {

            if (!drawer) return;

            drawer.classList.remove("open");

            drawer.setAttribute(
                "aria-hidden",
                "true"
            );

            hamburger?.classList.remove("active");

            hamburger?.setAttribute(
                "aria-expanded",
                "false"
            );

            hamburger?.setAttribute(
                "aria-label",
                "Open menu"
            );

            document.body.classList.remove("menu-open");

            pageContent?.classList.remove("blurred");
        }

        hamburger?.addEventListener("click", () => {

            if (drawer?.classList.contains("open")) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });

        drawerBackdrop?.addEventListener(
            "click",
            closeDrawer
        );

        drawer?.querySelectorAll(".drawer-nav a").forEach(a => {

            a.addEventListener("click", closeDrawer);
        });

        document.addEventListener("keydown", e => {

            if (
                e.key === "Escape" &&
                drawer?.classList.contains("open")
            ) {
                closeDrawer();
            }
        });

        window.addEventListener("resize", () => {

            if (
                window.innerWidth > 992 &&
                drawer?.classList.contains("open")
            ) {
                closeDrawer();
            }
        });
    }

    const footerEl = document.getElementById("footer");

    if (footerEl) {

        fetch(prefix + "components/footer.html")
            .then(r => r.text())
            .then(html => {

                footerEl.innerHTML = html;
            })
            .catch(err =>
                console.warn(
                    "Footer load failed:",
                    err
                )
            );
    }

    const fadeEls = document.querySelectorAll(".fade-up");

    const fadeObs = new IntersectionObserver(
        (entries) => {

            entries.forEach((e, i) => {

                if (e.isIntersecting) {

                    setTimeout(() => {

                        e.target.classList.add("visible");

                    }, i * 80);

                    fadeObs.unobserve(e.target);
                }
            });

        },
        { threshold: 0.08 }
    );

    fadeEls.forEach(el => fadeObs.observe(el));

});