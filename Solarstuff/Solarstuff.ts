/* eslint-disable no-undef */
"use strict";

// Setup canvas and UI controls
const canvas = document.getElementById("solarSystemCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const speedSlider = document.getElementById("speedSlider") as HTMLInputElement;
const descriptionBox = document.getElementById("description") as HTMLDivElement;
const pausePlayButton = document.getElementById("pausePlayButton") as HTMLButtonElement;



// Time and animation control
let timeScale = 1;
let isPaused = false;
speedSlider.addEventListener("input", () => (timeScale = parseFloat(speedSlider.value)));
pausePlayButton.addEventListener("click", () => {
    isPaused = !isPaused;
    pausePlayButton.innerText = isPaused ? "Play" : "Pause";
});

// CelestialBody class for planets, moon
class CelestialBody {
    public children: CelestialBody[] = [];

    constructor(
        public name: string,
        public radius: number,
        public distanceFromParent: number,
        public orbitalPeriod: number,
        public color: string,
        public description: string
    ) {}

    addChild(child: CelestialBody): void {
        this.children.push(child);
    }

    // Recursive draw and update 
    drawAndUpdate(ctx: CanvasRenderingContext2D, elapsedTime: number): void {
        ctx.save();

        if (this.distanceFromParent > 0) {
            const angle = (elapsedTime / this.orbitalPeriod) * timeScale * 2 * Math.PI;
            ctx.rotate(angle);
            ctx.translate(this.distanceFromParent, 0);
        }

        // Draw the celestial body
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Recursive draw 
        this.children.forEach(child => child.drawAndUpdate(ctx, elapsedTime));

        ctx.restore();
    }
}

// Solar system setup 
const sun = new CelestialBody("Sun", 20, 0, 0, "yellow", "The central star of our solar system.");
const earth = new CelestialBody("Earth", 8, 100, 365, "blue", "Our home planet, third from the sun.");
const moon = new CelestialBody("Moon", 3, 15, 27, "grey", "The Earth's only natural satellite.");

sun.addChild(earth);
earth.addChild(moon);

let lastTime = 0;


canvas.addEventListener("click", (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    function checkClick(body: CelestialBody, x: number, y: number): boolean {
        if (Math.hypot(clickX - x, clickY - y) < body.radius) {
            descriptionBox.innerText = `${body.name}: ${body.description}`;
            return true;
        }
        return body.children.some(child => {
            ctx.save();
            ctx.translate(x, y);
            const result = checkClick(child, 0, 0);
            ctx.restore();
            return result;
        });
    }

    checkClick(sun, canvas.width / 2, canvas.height / 2);
});

// Animation loop
function animate(currentTime: number) {
    if (isPaused) {
        requestAnimationFrame(animate);
        return;
    }

    const elapsedTime = Math.min((currentTime - lastTime) / 1000, 0.1); 
    lastTime = currentTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    sun.drawAndUpdate(ctx, elapsedTime);

    ctx.restore();
    requestAnimationFrame(animate);
}

// Start animation loop
requestAnimationFrame(animate);
