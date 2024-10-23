interface Vector {
    x: number;
    y: number;
}

interface Cannon {
    player: boolean;
    angle: number;
    power: number;
    pos: Vector;
}

let P1: Cannon = { player: true, angle: 45, power: 50, pos: { x: 100, y: 350 } };
let P2: Cannon = { player: false, angle: 135, power: 50, pos: { x: 700, y: 350 } };

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mountainHeight = Math.random() * 100 + 150;

function drawTank(cannon: Cannon) {
    ctx.fillStyle = cannon.player ? "blue" : "red";
    ctx.fillRect(cannon.pos.x - 10, cannon.pos.y - 10, 20, 20);
    ctx.beginPath();
    ctx.moveTo(cannon.pos.x, cannon.pos.y);
    const barrelLength = 30;
    ctx.lineTo(
        cannon.pos.x + barrelLength * Math.cos(cannon.angle * (Math.PI / 180)),
        cannon.pos.y - barrelLength * Math.sin(cannon.angle * (Math.PI / 180))
    );
    ctx.stroke();
}

function drawMountain() {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 100, canvas.height);
    ctx.lineTo(canvas.width / 2, canvas.height - mountainHeight);
    ctx.lineTo(canvas.width / 2 + 100, canvas.height);
    ctx.fillStyle = "green";
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMountain();
    drawTank(P1);
    drawTank(P2);
}

function updateAngle(player: Cannon, increment: number) {
    player.angle = Math.min(90, Math.max(0, player.angle + increment));
    draw();
}

function updatePower(player: Cannon, increment: number) {
    player.power = Math.min(100, Math.max(0, player.power + increment));
    draw();
}

document.getElementById("up")?.addEventListener("click", () => updateAngle(P1, 1));
document.getElementById("down")?.addEventListener("click", () => updateAngle(P1, -1));
document.getElementById("more")?.addEventListener("click", () => updatePower(P1, 5));
document.getElementById("less")?.addEventListener("click", () => updatePower(P1, -5));

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
});

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
