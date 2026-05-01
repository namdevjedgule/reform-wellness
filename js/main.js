document.addEventListener("DOMContentLoaded", function () {
    fetch('/components/navbar.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;

            const menuBtn = document.getElementById("menuBtn");
            if (menuBtn) {
                menuBtn.onclick = function () {
                    document.getElementById("mobileMenu").classList.toggle("hidden");
                };
            }
        });

    fetch('/components/footer.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });


    function sendWhatsApp() {
        const name = document.querySelector('input')?.value || "";
        const message = document.querySelector('textarea')?.value || "";

        const url = `https://wa.me/91XXXXXXXXXX?text=Hello, I am ${name}. ${message}`;
        window.open(url, '_blank');
    }

    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("text-green-600", "font-semibold");
        }
    });

    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        sections.forEach(sec => {
            const pos = sec.getBoundingClientRect().top;
            if (pos < window.innerHeight - 100) {
                sec.classList.add("opacity-100", "translate-y-0");
            }
        });
    });
});