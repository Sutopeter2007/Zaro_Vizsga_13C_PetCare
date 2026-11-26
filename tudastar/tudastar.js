const kartyak = document.querySelectorAll(".cikk-kartya");
const erintes = window.matchMedia("(hover: none)");

kartyak.forEach((kartya) => {
    kartya.addEventListener("click", () => {
        if (erintes.matches) {
            const voltNyitva = kartya.classList.contains("nyitva");
            kartyak.forEach((elem) => elem.classList.remove("nyitva"));
            if (!voltNyitva) kartya.classList.add("nyitva");
        }
    });

    kartya.addEventListener("keydown", (event) => {
        if ((event.key === "Enter" || event.key === " ") && erintes.matches) {
            event.preventDefault();
            kartya.click();
        }
    });
});


/* ===== PETCARE NAVBAR AKTÍV MENÜ ===== */

const navItems = document.querySelectorAll(".nav-item");

const currentPage = window.location.pathname
    .split("/")
    .pop() || "dashboard.html";

navItems.forEach(link => {

    const linkPage = link.getAttribute("href")
        .split("/")
        .pop();

    if (linkPage === currentPage) {
        link.classList.add("active");
    }

});
