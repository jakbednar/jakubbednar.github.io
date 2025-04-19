const projects = [
  {
    title: "Weather - Konzole",
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
  },
  {
    title: "Knihovna - WebApp",
    image: "https://github.com/user-attachments/assets/c8bc7b29-0460-42a7-9757-3f3aa228099d",
    description: "Webová aplikace v Blazor WebAssembly pro správu knih – přidávání, úprava, mazání a vyhledávání.",
    github: "https://github.com/jakbednar/KnihovnaWeb",
    details: `
      <h3>Jak projekt funguje</h3>
      <p>
        Jednoduchá webová aplikace vytvořená v <strong>Blazor WebAssembly</strong>, která umožňuje správu knih.
        Každá kniha má název, autora a jedinečné ID. Aplikace podporuje přidávání, úpravy i mazání knih
        a navíc nabízí vyhledávání podle názvu.
      </p>
  
      <h3>Funkce aplikace</h3>
      <ul>
        <li>Přidávání nových knih</li>
        <li>Úprava knih přímo v kartě</li>
        <li>Odstraňování knih ze seznamu</li>
        <li>Vyhledávání podle názvu (case-insensitive)</li>
        <li>Responzivní zobrazení knih jako karet</li>
      </ul>
      </pre>
    `
  },
    {
  title: "Daily Planner - Blazor WebApp",
  image: "images/image.jfif",
  description: "Webová aplikace v Blazoru pro plánování denních úkolů s možností filtrování, tagování a označování jako splněné.",
  github: "https://github.com/jakbednar/DailyPlanner",
  details: `
  <h3>O projektu</h3>
  <p>
    <strong>Daily Planner</strong> je single-page webová aplikace postavená na Blazor WebAssembly (C#), která umožňuje uživatelům efektivně plánovat každodenní úkoly.
    Projekt běží čistě na frontendu bez nutnosti backendu, což umožňuje rychlý běh přímo v prohlížeči.
  </p>

  <h3>Hlavní funkce</h3>
  <ul>
    <li>✅ Přidávání úkolů s názvem, popisem, datem a volitelným tagem</li>
    <li>🏷️ Vlastní systém tagů s možností přidávat a mazat tagy</li>
    <li>📂 Filtrování úkolů podle data (dnes, zítra, do 3/7 dnů, vlastní datum)</li>
    <li>🔎 Filtrování úkolů podle tagu</li>
    <li>🗑️ Odstraňování a ✏️ úprava úkolů</li>
    <li>✅ Označování jako splněné/nesplněné</li>
    <li>🎨 Vlastní stylování, čistý a responzivní design bez frameworků</li>
  </ul>

  <h3>Technologie</h3>
  <ul>
    <li>Blazor WebAssembly (.NET 8, C#)</li>
    <li>Razor komponenty</li>
    <li>Vlastní CSS bez externích knihoven</li>
  </ul>
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
    addGitHubTimestamps(proj.github, div);
    div.addEventListener("click", () => openModal(proj));
    projectList.appendChild(div);
  }

  if (visibleProjects >= projects.length) {
    showMoreBtn.style.display = "none";
  }
}

function addGitHubTimestamps(repoUrl, cardElement) {
  const repoPath = repoUrl.replace("https://github.com/", "");
  fetch(`https://api.github.com/repos/${repoPath}`)
    .then(response => response.json())
    .then(data => {
      const created = new Date(data.created_at).toLocaleDateString("cs-CZ");
      const updated = new Date(data.updated_at).toLocaleString("cs-CZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      const wrapper = document.createElement("div");
      wrapper.className = "project-date-wrapper";

      const createdEl = document.createElement("span");
      createdEl.textContent = `Vytvořeno: ${created}`;

      const updatedEl = document.createElement("span");
      updatedEl.textContent = ` | Naposledy upraveno: ${updated}`;

      wrapper.appendChild(createdEl);
      wrapper.appendChild(updatedEl);

      cardElement.appendChild(wrapper);
    })
    .catch(err => console.error("Chyba při načítání dat z GitHubu:", err));
}

function openModal(proj) {
  const modalTitle = document.getElementById("modal-title");
  modalTitle.parentElement.querySelectorAll(".project-date-wrapper").forEach(el => el.remove());

  document.getElementById("modal-title").textContent = proj.title;
  document.getElementById("modal-description").textContent = proj.description;
  document.getElementById("modal-image").src = proj.image;
  document.getElementById("modal-github").href = proj.github || "#";

  const detailsEl = document.getElementById("modal-details");
  detailsEl.innerHTML = proj.details || "";

  fetch(`https://api.github.com/repos/${proj.github.replace("https://github.com/", "")}`)
    .then(response => response.json())
    .then(data => {
      const created = new Date(data.created_at).toLocaleString("cs-CZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      const updated = new Date(data.updated_at).toLocaleString("cs-CZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      const wrapper = document.createElement("div");
      wrapper.className = "project-date-wrapper";

      const createdEl = document.createElement("span");
      createdEl.textContent = `Vytvořeno: ${created}`;

      const updatedEl = document.createElement("span");
      updatedEl.textContent = ` | Naposledy upraveno: ${updated}`;

      wrapper.appendChild(createdEl);
      wrapper.appendChild(updatedEl);

      const titleEl = document.getElementById("modal-title");
      titleEl.insertAdjacentElement("afterend", wrapper);
    });

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
