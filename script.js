const projects = [
  {
  title: "Weather App",
  image: "images/image.jfif",
  description: "Konzolová aplikace v C# pro zobrazení aktuálního počasí pomocí WeatherAPI.",
  github: "https://github.com/jakbednar/WeatherApp",
  details: `
    <h3>Jak projekt funguje</h3>
    <p>
      Jednoduchá konzolová aplikace v jazyce C#, která umožňuje uživateli zadat název města a zobrazit aktuální meteorologické informace.
      Data jsou získávána z <a href="https://www.weatherapi.com/" target="_blank">WeatherAPI</a> a zpracována ve formátu JSON.
    </p>

    <h3>Funkce aplikace</h3>
    <ul>
      <li>Načtení názvu města od uživatele</li>
      <li>Volání API a zpracování odpovědi</li>
      <li>Zobrazení údajů jako:</li>
      <ul>
        <li>Název města, region a stát</li>
        <li>Čas poslední aktualizace počasí</li>
        <li>Aktuální teplota a pocitová teplota</li>
        <li>Stav počasí (jasno, oblačno, déšť...)</li>
        <li>Rychlost větru</li>
        <li>UV index</li>
      </ul>
    </ul>

    <h3>Ukázka výstupu</h3>
    <pre>
Zadej název města: Brno

Brno, South Moravian, Czech Republic
Čas: 26.03.2025 – 14:35
Teplota: 12.3°C
Pocitová teplota: 10.7°C
Vítr: 13 km/h
Počasí: Zataženo
UV index: 3
    </pre>
  `
}
];

const projectList = document.getElementById("project-list");
const showMoreBtn = document.getElementById("show-more");
let visibleProjects = 3;

function renderProjects() {
  projectList.innerHTML = "";
  for (let i = 0; i < visibleProjects && i < projects.length; i++) {
    const proj = projects[i];
    const div = document.createElement("div");
    div.className = "project fade-in";
    div.innerHTML = `
      <img src="${proj.image}" alt="${proj.title}" class="project-thumb">
      <h3>${proj.title}</h3>
      <p>${proj.description}</p>
    `;
    div.addEventListener("click", () => openModal(proj));
    projectList.appendChild(div);
  }

  if (visibleProjects >= projects.length) {
    showMoreBtn.style.display = "none";
  }
}

function openModal(proj) {
  document.getElementById("modal-title").textContent = proj.title;
  document.getElementById("modal-description").textContent = proj.description;
  document.getElementById("modal-image").src = proj.image;
  document.getElementById("modal-github").href = proj.github || "#";
  document.getElementById("modal-details").innerHTML = proj.details || "";
  document.getElementById("project-modal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

document.querySelector(".close-btn").addEventListener("click", () => {
  document.getElementById("project-modal").style.display = "none";
  document.body.style.overflow = "";
});

window.addEventListener("click", (e) => {
  if (e.target.id === "project-modal") {
    document.getElementById("project-modal").style.display = "none";
    document.body.style.overflow = "";
  }
});

showMoreBtn.addEventListener("click", () => {
  visibleProjects += 2;
  renderProjects();
});

renderProjects();

document.getElementById("close-modal-btn").addEventListener("click", () => {
  document.getElementById("project-modal").style.display = "none";
  document.body.style.overflow = "";
});

// Navigace aktivní sekce
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;
    const sectionHeight = section.clientHeight;
    if ((window.scrollY + 150) >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Formulář
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_rn563pk", "template_w6bji8l", this)
    .then(() => {
      status.textContent = "Zpráva byla úspěšně odeslána!";
      form.reset();
    }, (err) => {
      status.textContent = "Došlo k chybě při odesílání.";
      console.error(err);
    });
});
