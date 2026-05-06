document.addEventListener("DOMContentLoaded", function () {

    const depth = window.location.pathname.split("/").filter(Boolean).length;
    const prefix = depth > 0 ? "../".repeat(depth) : "./";

    const navbarEl = document.getElementById("navbar");
    if (!navbarEl) return;

    fetch(prefix + "components/navbar.html")
        .then(r => { if (!r.ok) throw new Error("navbar fetch failed"); return r.text(); })
        .then(html => {

            navbarEl.innerHTML = html;
            initNavbar();

        })
        .catch(err => {
            console.warn("Navbar load failed:", err);
        });

    function initNavbar() {

        const nav = document.getElementById("mainNav");
        const hamburger = document.getElementById("hamburger");
        const drawer = document.getElementById("mobileDrawer");
        const drawerPanel = document.getElementById("drawerPanel");
        const drawerClose = document.getElementById("drawerClose");
        const drawerBackdrop = document.getElementById("drawerBackdrop");

        let pageContent = document.getElementById("pageContent");

        if (!pageContent) {
            pageContent = document.createElement("div");
            pageContent.id = "pageContent";
            pageContent.classList.add("page-content");

            const toWrap = [];
            document.body.childNodes.forEach(node => {
                const skip = (
                    node === navbarEl ||
                    (node.nodeType === 1 && (
                        node.classList?.contains("drawer") ||
                        node.id === "mobileDrawer" ||
                        node.id === "navbar"
                    ))
                );
                if (!skip) toWrap.push(node);
            });

            const firstChild = toWrap[0];
            if (firstChild) document.body.insertBefore(pageContent, firstChild);
            toWrap.forEach(node => pageContent.appendChild(node));

        } else {
            pageContent.classList.add("page-content");
        }

        const currentPath = window.location.pathname;

        document.querySelectorAll(".nav-links a, .drawer-nav a").forEach(link => {
            const lp = new URL(link.href, window.location.origin).pathname;
            const isHome = lp === "/" && currentPath === "/";
            const isOther = lp !== "/" && currentPath.startsWith(lp);
            if (isHome || isOther) link.classList.add("active");
        });

        const onScroll = () => {
            if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        function openDrawer() {
            drawer.classList.add("open");
            drawer.setAttribute("aria-hidden", "false");
            hamburger.classList.add("active");
            hamburger.setAttribute("aria-expanded", "true");
            hamburger.setAttribute("aria-label", "Close menu");
            document.body.classList.add("menu-open");
            pageContent && pageContent.classList.add("blurred");
            drawerPanel && drawerPanel.focus?.();
        }

        function closeDrawer() {
            drawer.classList.remove("open");
            drawer.setAttribute("aria-hidden", "true");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
            hamburger.setAttribute("aria-label", "Open menu");
            document.body.classList.remove("menu-open");
            pageContent && pageContent.classList.remove("blurred");
        }

        if (hamburger) hamburger.addEventListener("click", openDrawer);
        if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
        if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawer);

        document.querySelectorAll(".drawer-nav a").forEach(link => {
            link.addEventListener("click", closeDrawer);
        });

        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && drawer.classList.contains("open")) closeDrawer();
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 992 && drawer.classList.contains("open")) closeDrawer();
        });

    }

    const footerEl = document.getElementById("footer");
    if (footerEl) {
        fetch(prefix + "components/footer.html")
            .then(r => r.text())
            .then(html => { footerEl.innerHTML = html; })
            .catch(err => console.warn("Footer load failed:", err));
    }

    function initFadeObs() {
        const fadeEls = document.querySelectorAll(".fade-up");
        if (!fadeEls.length) return;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add("visible"), i * 80);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        fadeEls.forEach(el => obs.observe(el));
    }

    initFadeObs();

});