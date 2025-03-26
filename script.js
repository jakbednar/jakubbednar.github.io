/*document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("message").innerText = "Děkuji za zprávu! Ozvu se co nejdříve.";
    this.reset();
});*/

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = this;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData
    })
    .then(response => response.text())
    .then(text => {
        console.log("Odpověď ze serveru:", text);
        if (text.includes("success")) {
            showPopup("Email byl úspěšně odeslán!");
            form.reset();
        } else {
            showPopup("Nepodařilo se odeslat email: " + text);
        }
    })
    .catch(error => {
        console.error("Chyba:", error);
        showPopup("Chyba připojení.");
    });
    
});

function showPopup(message) {
    const popup = document.createElement("div");
    popup.innerText = message;
    popup.style.position = "fixed";
    popup.style.bottom = "30px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.background = "linear-gradient(90deg, #ff8c00, #e52e71)";
    popup.style.color = "#fff";
    popup.style.padding = "15px 25px";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.5)";
    popup.style.zIndex = "9999";
    popup.style.fontWeight = "bold";
    popup.style.fontFamily = "Arial, sans-serif";
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 5000);
}


const sections = document.querySelectorAll("section");
const colors = {
    about: "#ff8d00",
    projects: "#f35c3b",
    contact: "#e52e70"
};

const body = document.body;
let currentBgColor = "#121212";
let targetBgColor = currentBgColor;

function changeBackgroundColor(newColor) {
    targetBgColor = newColor;
    let interval = setInterval(() => {
        currentBgColor = lerpColorCustom(currentBgColor, targetBgColor, 0.08);
        body.style.backgroundColor = currentBgColor;
        if (currentBgColor === targetBgColor) clearInterval(interval);
    }, 30);
}

const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
    let scrollPosition = window.scrollY;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove("active"));
            document.querySelector(`.nav-link[href="#${section.id}"]`).classList.add("active");
        }
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            changeBackgroundColor(colors[entry.target.id]);
            changeParticleColor(colors[entry.target.id]);
        }
    });
}, { threshold: 0.6 });

sections.forEach(section => observer.observe(section));

navLinks.forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
            changeBackgroundColor(colors[targetId]);
            changeParticleColor(colors[targetId]);
        }
    });
});

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

function lerpColorCustom(startColor, endColor, amount) {
    let start = colorToRgb(startColor);
    let end = colorToRgb(endColor);
    let r = Math.round(start.r + (end.r - start.r) * amount);
    let g = Math.round(start.g + (end.g - start.g) * amount);
    let b = Math.round(start.b + (end.b - start.b) * amount);
    return `rgb(${r},${g},${b})`;
}

function colorToRgb(color) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    return hexToRgb(ctx.fillStyle);
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveLink() {
        let scrollPosition = window.scrollY;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 500;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove("active", "gradient-text"));
                let activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active", "gradient-text");
                }
            }
        });
    }

    setTimeout(updateActiveLink, 100);

    window.addEventListener("scroll", updateActiveLink);
});

document.getElementById("showMoreBtn").addEventListener("click", function () {
    const hiddenCards = document.querySelectorAll(".project-card.hidden");
    hiddenCards.forEach(card => {
        card.classList.remove("hidden");
    });
    this.style.display = "none";
});
