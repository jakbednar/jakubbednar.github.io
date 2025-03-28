const projects = [
  {
    title: "Správa knihovny",
    image: "images/image.jfif",
    description: "Konzolová aplikace pro správu osobní knihovny s databází v C#."
  },
  {
    title: "Finanční manažer",
    image: "images/image.jfif",
    description: "Nástroj pro sledování výdajů, úspor a rozpočtů v reálném čase."
  },
  {
    title: "Weather App",
    image: "images/image.jfif",
    description: "Jednoduchá desktopová aplikace napojená na WeatherAPI pro předpověď počasí."
  },
  {
    title: "Neurální síť na rozpoznávání tvarů",
    image: "images/image.jfif",
    description: "Vlastní WinForms aplikace s ML.NET pro rozpoznávání ručně nakreslených tvarů."
  },
  {
    title: "E-shop simulátor",
    image: "images/image.jfif",
    description: "Tréninkový projekt desktopového e-shopu v C# s košíkem a objednávkami."
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
    projectList.appendChild(div);
  }

  if (visibleProjects >= projects.length) {
    showMoreBtn.style.display = "none";
  }
}

showMoreBtn.addEventListener("click", () => {
  visibleProjects += 2;
  renderProjects();
});

renderProjects();

// Aktivní sekce v navbaru
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
