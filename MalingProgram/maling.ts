const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.addEventListener('mousedown', () => {
    console.log('!');
    });

function draw1() {
    ctx.beginPath();
    ctx.moveTo(MouseEvent.offset{X,Y});   
    ctx.fillStyle = "green";
    

}
