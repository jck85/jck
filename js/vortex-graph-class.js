window.addEventListener("load", () => {
    console.log("vortex graph");
    const vortex = new VortexGraph("vortex");
    vortex.setup();

    // add control events
    const modulusNumber = document.getElementById("modulus-number");
    if (modulusNumber) {
        modulusNumber.addEventListener("change", (event) => {
            vortex.updateModulus(event.target.value);
            vortex.draw();
        });
    }

    const modulusRange = document.getElementById("modulus-range");
    if (modulusRange) {
        modulusRange.addEventListener("input", (event) => {
            vortex.updateModulus(event.target.value);
            vortex.draw();
        });
    }

    const multiplierNumber = document.getElementById("multiplier-number");
    if (multiplierNumber) {
        multiplierNumber.addEventListener("change", (event) => {
            console.log(event.target.value);
            vortex.updateMultiplier(event.target.value);
            vortex.draw();
        });
    }

    const multiplierRange = document.getElementById("multiplier-range");
    if (multiplierRange) {
        multiplierRange.addEventListener("input", (event) => {
            vortex.updateMultiplier(event.target.value);
            vortex.draw();
        });
    }
});

class VortexGraph {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;

        this.modulus = 16;
        this.multiplier = 2;
        this.radius = this.width / 2 - 10;
    }

    setup() {
        this.draw();
    }

    draw() {
        this.clearCanvas();
        const outline = new Circle(this.centerX, this.centerY, this.radius);
        outline.draw();
        this.canvas.appendChild(outline.svg);

        const n = this.modulus;
        const m = this.multiplier;
        const c = this.centerX;
        const r = this.radius;

        for (let i = 0; i < n; i++) {
            // Alpha is remainder after division.
            // It is also the digital root for base m
            let alpha = (i * m) % n;
            if (alpha != i) {
                // Get x,y cords for two points along circle.
                // Starting point.
                let x1 = c + r * Math.sin((i * 2 * Math.PI) / n);
                let y1 = c - r * Math.cos((i * 2 * Math.PI) / n);

                // Ending point.
                let x2 = c + r * Math.sin((m * i * 2 * Math.PI) / n);
                let y2 = c - r * Math.cos((m * i * 2 * Math.PI) / n);
                const line = new Line(x1, y1, x2, y2);
                line.draw();
                this.canvas.appendChild(line.svg);

                // let lineLength = Math.floor(dist(x1, y1, x2, y2));
                // let lineColor = Math.floor(remap(lineLength, 0, width, 0, 360));

                // stroke(lineColor, 100, 50);
                // strokeWeight(1);
                // line(x1, y1, x2, y2);
            }
        }
    }

    clearCanvas() {
        while (this.canvas.firstChild) {
            this.canvas.removeChild(this.canvas.firstChild);
        }
    }

    updateModulus(value) {
        this.modulus = value;
        const modulusNumber = document.getElementById("modulus-number");
        const modulusRange = document.getElementById("modulus-range");
        modulusNumber.value = value;
        modulusRange.value = value;
    }

    updateMultiplier(value) {
        this.multiplier = value;
        const multiplierNumber = document.getElementById("multiplier-number");
        const multiplierRange = document.getElementById("multiplier-range");
        multiplierNumber.value = value;
        multiplierRange.value = value;
    }
}
