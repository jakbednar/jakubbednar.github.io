let particles = [];
let maxDistance = 120;
let numParticles = 150;
let particleColor = "#0dcaf0"; // Výchozí barva
let targetColor = particleColor; // Barva, na kterou přecházíme
let lerpFactor = 0.05; // Rychlost přechodu

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    document.body.prepend(canvas.elt);
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(10);

    // Plynulý přechod barvy částic
    particleColor = lerpColor(color(particleColor), color(targetColor), lerpFactor);

    for (let particle of particles) {
        particle.move();
        particle.display();
    }
    connectParticles();
}

class Particle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.vx = random(-0.3, 0.3);
        this.vy = random(-0.3, 0.3);
        this.size = random(3, 6);
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x > width || this.x < 0) this.vx *= -1;
        if (this.y > height || this.y < 0) this.vy *= -1;
    }

    display() {
        noStroke();
        fill(particleColor);
        ellipse(this.x, this.y, this.size);
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let d = dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            if (d < maxDistance) {
                let alpha = map(d, 0, maxDistance, 255, 0); // Plynulá změna opacity
                stroke(lerpColor(color(particleColor), color(targetColor), lerpFactor));
                strokeWeight(lerp(0.3, 1.5, d / maxDistance)); // Plynulá změna tloušťky čáry
                stroke(particleColor.levels[0], particleColor.levels[1], particleColor.levels[2], alpha); // Dynamická změna opacity
                line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            }
        }
    }
}

// Plynulá změna barvy částic
function changeParticleColor(newColor) {
    targetColor = newColor;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}