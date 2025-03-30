const projects = [
  {
    title: "Správa knihovny",
    image: "images/image.jfif",
    description: "Konzolová aplikace pro správu osobní knihovny s databází v C#.",
    github: "https://github.com/jakbednar/sprava-knihovny",
    details: `
      <h3>Jak projekt funguje</h3>
      <p>
        Aplikace umožňuje přidávat, vyhledávat a mazat knihy pomocí jednoduchého textového rozhraní.
        Data se ukládají do SQLite databáze. Uživatelské akce probíhají přes textové menu.
      </p>

      <h3>Ukázka výstupu</h3>
      <pre>
=== Správa knihovny ===
1. Přidat knihu
2. Vypsat všechny knihy
3. Vyhledat podle autora
0. Konec
      </pre>
    `
  },
  {
    title: "Finanční manažer",
    image: "images/image.jfif",
    description: "Nástroj pro sledování výdajů, úspor a rozpočtů v reálném čase.",
    github: "https://github.com/jakbednar/financni-manazer"
  },
  {
    title: "Weather App",
    image: "images/image.jfif",
    description: "Jednoduchá desktopová aplikace napojená na WeatherAPI pro předpověď počasí.",
    github: "https://github.com/jakbednar/weather-app"
  },
  {
    title: "Neurální síť na rozpoznávání tvarů",
    image: "images/image.jfif",
    description: "WinForms aplikace s ML.NET pro rozpoznávání ručně nakreslených tvarů.",
    github: "https://github.com/jakbednar/rozpoznavani-tvaru"
  },
  {
    title: "E-shop simulátor",
    image: "images/image.jfif",
    description: "Tréninkový desktopový e-shop v C# s košíkem a objednávkami.",
    github: "https://github.com/jakbednar/eshop-simulator"
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
});

window.addEventListener("click", (e) => {
  if (e.target.id === "project-modal") {
    document.getElementById("project-modal").style.display = "none";
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