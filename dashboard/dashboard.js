
// ===== KUTYA ADATAINAK BETÖLTÉSE =====

const kutyaForm = document.getElementById("kutyaForm");

const nev = document.getElementById("nev");
const fajta = document.getElementById("fajta");
const fajtaNev = document.getElementById("fajtaNev");
const suly = document.getElementById("suly");
const kor = document.getElementById("kor");

const kutyaNev = document.getElementById("kutyaNev");


// Mentett adatok betöltése

let kutyaAdatok = JSON.parse(localStorage.getItem("petcareKutya")) || {
    nev: "Buddy",
    fajta: "Kutya",
    fajtaNev: "Golden Retriever",
    suly: 32.5,
    kor: 3
};


// Adatok megjelenítése

function adatokMegjelenitese() {

    nev.value = kutyaAdatok.nev;
    fajta.value = kutyaAdatok.fajta;
    fajtaNev.value = kutyaAdatok.fajtaNev;
    suly.value = kutyaAdatok.suly;
    kor.value = kutyaAdatok.kor;

    kutyaNev.textContent = kutyaAdatok.nev;

    document.getElementById("sulyAdat").textContent =
        kutyaAdatok.suly + " kg";

    document.getElementById("korAdat").textContent =
        kutyaAdatok.kor + " év";

}

adatokMegjelenitese();


// ===== KUTYA ADATAINAK MENTÉSE =====

kutyaForm.addEventListener("submit", function(event) {

    event.preventDefault();

    kutyaAdatok = {
        nev: nev.value,
        fajta: fajta.value,
        fajtaNev: fajtaNev.value,
        suly: suly.value,
        kor: kor.value
    };

    localStorage.setItem("petcareKutya", JSON.stringify(kutyaAdatok));

    adatokMegjelenitese();

    alert("A kutya adatai sikeresen mentve!");

});


// ===== SZERKESZTÉS GOMBOK =====

document.getElementById("szerkesztesGomb").addEventListener("click", function() {
    nev.focus();
});

document.getElementById("szerkesztesGomb2").addEventListener("click", function() {
    nev.focus();
});


// ===== OLTÁSOK =====

const utolsoOltas = document.getElementById("utolsoOltas");

const oltasokSzama = document.getElementById("oltasokSzama");

const kovetkezoDatum = document.getElementById("kovetkezoDatum");

const hatraLevo = document.getElementById("hatraLevo");


// Következő oltás kiszámítása

function oltasSzamitas() {

    if (!utolsoOltas.value) {
        return;
    }

    const datum = new Date(utolsoOltas.value + "T12:00:00");

    datum.setFullYear(datum.getFullYear() + 1);

    const ev = datum.getFullYear();
    const honap = String(datum.getMonth() + 1).padStart(2, "0");
    const nap = String(datum.getDate()).padStart(2, "0");

    kovetkezoDatum.textContent =
        ev + "." + honap + "." + nap + ".";

    const maiNap = new Date();
    maiNap.setHours(0, 0, 0, 0);

    const kulonbseg = Math.ceil(
        (datum - maiNap) / (1000 * 60 * 60 * 24)
    );

    if (kulonbseg < 0) {
        hatraLevo.textContent = "Az oltás esedékes!";
    } else {
        hatraLevo.textContent = "Még " + kulonbseg + " nap";
    }

    localStorage.setItem("petcareOltas", utolsoOltas.value);

}


// Oltás adatainak betöltése

const mentettOltas = localStorage.getItem("petcareOltas");

if (mentettOltas) {
    utolsoOltas.value = mentettOltas;
}

utolsoOltas.addEventListener("change", oltasSzamitas);

oltasSzamitas();


// Oltások számának mentése

oltasokSzama.addEventListener("change", function() {

    document.getElementById("oltasAdat").textContent =
        oltasokSzama.value;

    localStorage.setItem("petcareOltasSzam", oltasokSzama.value);

});

const mentettOltasSzam = localStorage.getItem("petcareOltasSzam");

if (mentettOltasSzam) {
    oltasokSzama.value = mentettOltasSzam;
}

document.getElementById("oltasAdat").textContent = oltasokSzama.value;


// ===== KOZMETIKUS IDŐPONT =====

const kozmetikusDatum = document.getElementById("kozmetikusDatum");

const mentettIdopont = localStorage.getItem("petcareIdopont");

if (mentettIdopont) {
    kozmetikusDatum.value = mentettIdopont;
}

document.getElementById("idopontMentes").addEventListener("click", function() {

    if (!kozmetikusDatum.value) {
        alert("Először válassz időpontot!");
        return;
    }

    localStorage.setItem("petcareIdopont", kozmetikusDatum.value);

    document.getElementById("idopontUzenet").textContent =
        "Az időpont sikeresen elmentve!";

});


// ===== EMLÉKEZTETŐ =====

const emlekezteto = document.getElementById("emlekezteto");

const mentettEmlekezteto = localStorage.getItem("petcareEmlekezteto");

if (mentettEmlekezteto !== null) {
    emlekezteto.checked = mentettEmlekezteto === "true";
}

emlekezteto.addEventListener("change", function() {

    localStorage.setItem("petcareEmlekezteto", emlekezteto.checked);

    if (emlekezteto.checked) {
        document.getElementById("emlekeztetoUzenet").textContent =
            "Az emlékeztető aktív.";
    } else {
        document.getElementById("emlekeztetoUzenet").textContent =
            "Az emlékeztető kikapcsolva.";
    }

});

if (!emlekezteto.checked) {
    document.getElementById("emlekeztetoUzenet").textContent =
        "Az emlékeztető kikapcsolva.";
}


// ===== ÚJ KEDVENC MODAL =====

const kutyaModal = document.getElementById("kutyaModal");

document.getElementById("ujKutyaGomb").addEventListener("click", function() {
    kutyaModal.classList.add("aktiv");
});

document.getElementById("ujKutyaGomb2").addEventListener("click", function() {
    kutyaModal.classList.add("aktiv");
});

document.getElementById("modalBezaras").addEventListener("click", function() {
    kutyaModal.classList.remove("aktiv");
});


// Új kedvenc hozzáadása

document.getElementById("ujKutyaForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const ujKutya = {
        nev: document.getElementById("ujNev").value,
        fajta: document.getElementById("ujFaj").value,
        fajtaNev: document.getElementById("ujFajta").value,
        suly: document.getElementById("ujSuly").value || 0,
        kor: 0
    };

    localStorage.setItem("petcareKutya", JSON.stringify(ujKutya));

    kutyaAdatok = ujKutya;

    adatokMegjelenitese();

    kutyaModal.classList.remove("aktiv");

    this.reset();

    alert("Az új kedvenc sikeresen hozzáadva!");

});


// ===== KUTYA TÖRLÉSE =====

document.getElementById("torlesGomb").addEventListener("click", function() {

    const valasz = confirm("Biztosan törölni szeretnéd a kedvenc adatait?");

    if (valasz) {

        localStorage.removeItem("petcareKutya");

        kutyaAdatok = {
            nev: "",
            fajta: "Kutya",
            fajtaNev: "",
            suly: 0,
            kor: 0
        };

        adatokMegjelenitese();

        alert("A kutya adatai törölve!");

    }

});


// ===== MEGOSZTÁS =====

document.getElementById("megosztasGomb").addEventListener("click", function() {

    const szoveg = "PetCare – Kedvencem neve: " + kutyaAdatok.nev;

    if (navigator.share) {

        navigator.share({
            title: "PetCare",
            text: szoveg
        });

    } else {

        navigator.clipboard.writeText(szoveg);

        alert("A megosztási szöveg a vágólapra került!");

    }

});


// ===== RÉSZLETEK =====

document.getElementById("reszletekGomb").addEventListener("click", function() {

    alert(
        "Kedvenc neve: " + kutyaAdatok.nev +
        "\nFaj: " + kutyaAdatok.fajta +
        "\nFajta: " + kutyaAdatok.fajtaNev +
        "\nSúly: " + kutyaAdatok.suly + " kg" +
        "\nKor: " + kutyaAdatok.kor + " év"
    );

});


// ===== NAVBAR AKTÍV MENÜ =====

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
    } else {
        link.classList.remove("active");
    }

});
