
// ===== MODAL MEGNYITÁSA =====

function modalNyitas(oldal) {

    const modal = document.getElementById("modalHatter");

    modal.classList.add("aktiv");

    document.body.style.overflow = "hidden";

    modalValtas(oldal);

}


// ===== BEJELENTKEZÉS / REGISZTRÁCIÓ VÁLTÁS =====

function modalValtas(oldal) {

    const login = document.getElementById("login");
    const register = document.getElementById("register");

    login.classList.toggle("rejtett", oldal !== "login");

    register.classList.toggle("rejtett", oldal !== "register");

}


// ===== MODAL BEZÁRÁSA =====

function modalZaras() {

    const modal = document.getElementById("modalHatter");

    modal.classList.remove("aktiv");

    document.body.style.overflow = "";

}


// ===== HÁTTÉRRE KATTINTÁS =====

function hatterZaras(event) {

    if (event.target.id === "modalHatter") {
        modalZaras();
    }

}


// ===== ESCAPE BILLENTYŰ =====

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        modalZaras();
    }

});


// ===== ŰRLAPOK BEMUTATÓ MÓDJA =====

document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    alert("A bejelentkezéshez backend kapcsolat szükséges!");

});

document.getElementById("registerForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const passwords = this.querySelectorAll('input[type="password"]');

    if (passwords[0].value !== passwords[1].value) {
        alert("A két jelszó nem egyezik!");
        return;
    }

    alert("A regisztrációhoz backend kapcsolat szükséges!");

});
