"use strict";
var _a, _b, _c, _d;
let P1 = { player: true, angle: 45, power: 50, pos: { x: 100, y: 350 } };
let P2 = { player: false, angle: 135, power: 50, pos: { x: 700, y: 350 } };
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mountainHeight = Math.random() * 100 + 150;
function drawTank(cannon) {
    ctx.fillStyle = cannon.player ? "blue" : "red";
    ctx.fillRect(cannon.pos.x - 10, cannon.pos.y - 10, 20, 20);
    ctx.beginPath();
    ctx.moveTo(cannon.pos.x, cannon.pos.y);
    const barrelLength = 30;
    ctx.lineTo(cannon.pos.x + barrelLength * Math.cos(cannon.angle * (Math.PI / 180)), cannon.pos.y - barrelLength * Math.sin(cannon.angle * (Math.PI / 180)));
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
function updateAngle(player, increment) {
    player.angle = Math.min(90, Math.max(0, player.angle + increment));
    draw();
}
function updatePower(player, increment) {
    player.power = Math.min(100, Math.max(0, player.power + increment));
    draw();
}
(_a = document.getElementById("up")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => updateAngle(P1, 1));
(_b = document.getElementById("down")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => updateAngle(P1, -1));
(_c = document.getElementById("more")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => updatePower(P1, 5));
(_d = document.getElementById("less")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => updatePower(P1, -5));
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
//# sourceMappingURL=T1.js.map