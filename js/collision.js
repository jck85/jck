const PI = Math.PI;

class Particle {
    constructor(x, y, v, r) {
        this.posX = x;
        this.posY = y;
        this.vel = v;
        this.rad = r;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.ellipse(this.posX, this.posY, this.rad, this.rad, 0, 0, 2 * PI);
        ctx.fillStyle = "rgb(200, 0, 0)";
        ctx.fill();
    }
}

const particle = new Particle(100, 100, 0, 50);
function render() {
    console.log("collision js");

    const canvas = document.getElementById("canvas");
    canvas.width = 600;
    canvas.height = 600;
    const canvasCtx = canvas.getContext("2d");
    canvasCtx.strokeStyle = "black";
    canvasCtx.lineWidth = 8;
    canvasCtx.stroke();
    canvasCtx.fillStyle = "rgb(200 250 250)";
    canvasCtx.strokeRect(0, 0, 600, 600);
    particle.draw(canvasCtx);
}

render();
