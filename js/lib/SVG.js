const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

class Canvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);

        this.selected = null;
        this.origin = { x: 0, y: 0 };
        this.offset = { x: 0, y: 0 };

        this.shapes = [];
        this.activeShape = null;
    }

    setup() {
        this.canvas.addEventListener("mousedown", (event) => {
            event.preventDefault();

            const target = event.target;
            this.offset = this.getMouse(event);
            this.activeShape = this.shapes[target.id - 1];

            if (target.classList.contains("draggable")) {
                this.origin = this.activeShape.pos;
            }
        });

        this.canvas.addEventListener("mousemove", (event) => {
            event.preventDefault();

            // move shape with mouse
            if (this.activeShape) {
                let mousePos = this.getMouse(event);
                let dx = mousePos.x - this.offset.x;
                let dy = mousePos.y - this.offset.y;
                let newPos = { x: this.origin.x + dx, y: this.origin.y + dy };

                console.log(newPos.x, newPos.y);
                this.activeShape.move(newPos.x, newPos.y);
            }
        });

        this.canvas.addEventListener("mouseup", (event) => {
            event.preventDefault();

            this.selected = null;
            this.activeShape = null;
        });

        this.canvas.addEventListener("mouseleave", (event) => {
            event.preventDefault();

            this.selected = null;
            this.activeShape = null;
        });
    }

    draw(shape) {
        shape.id = this.shapes.length + 1;
        this.shapes.push(shape);
        shape.draw();
        this.canvas.appendChild(shape.svg);
    }

    getMouse(event) {
        event.preventDefault();
        var CTM = this.canvas.getScreenCTM();
        if (event.touches) {
            event = event.touches[0];
        }

        return {
            x: (event.clientX - CTM.e) / CTM.a,
            y: (event.clientY - CTM.f) / CTM.d,
        };
    }
}

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.svg = null;
        this.draw();
    }

    draw() {
        this.svg = document.createElementNS(SVG_NAMESPACE, "circle");

        this.svg.setAttribute("cx", parseInt(this.x));
        this.svg.setAttribute("cy", parseInt(this.y));
        this.svg.setAttribute("r", parseInt(this.radius));

        this.svg.setAttribute("stroke", "black");
        this.svg.setAttribute("stroke-width", "1pt");
        this.svg.setAttribute("fill", "none");
    }

    move(x, y) {
        this.svg.setAttributeNS(null, "cx", parseInt(x));
        this.svg.setAttributeNS(null, "cy", parseInt(y));
    }

    stroke(color) {
        this.svg.setAttribute("stroke", color);
    }

    strokeWidth(width) {
        this.svg.setAttribute("stroke-width", width + "pt");
    }

    fill(color) {
        this.svg.setAttribute("fill", color);
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.svg = null;
        this.draw();
    }

    draw() {
        this.svg = document.createElementNS(SVG_NAMESPACE, "rect");

        this.svg.setAttribute("x", parseInt(this.x));
        this.svg.setAttribute("y", parseInt(this.y));
        this.svg.setAttribute("width", parseInt(this.width));
        this.svg.setAttribute("height", parseInt(this.height));

        this.svg.setAttribute("stroke", "black");
        this.svg.setAttribute("stroke-width", "1pt");
        this.svg.setAttribute("fill", "none");
    }

    move(x, y) {
        this.svg.setAttributeNS(null, "x", parseInt(x));
        this.svg.setAttributeNS(null, "y", parseInt(y));
    }

    stroke(color) {
        this.svg.setAttribute("stroke", color);
    }

    strokeWidth(width) {
        this.svg.setAttribute("stroke-width", width + "pt");
    }

    fill(color) {
        this.svg.setAttribute("fill", color);
    }
}

class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.svg = null;
        this.draw();
    }

    draw() {
        this.svg = document.createElementNS(SVG_NAMESPACE, "line");

        this.svg.setAttribute("x1", parseInt(this.x1));
        this.svg.setAttribute("y1", parseInt(this.y1));
        this.svg.setAttribute("x2", parseInt(this.x2));
        this.svg.setAttribute("y2", parseInt(this.y2));

        this.svg.setAttribute("stroke", "black");
        this.svg.setAttribute("stroke-width", "1pt");
    }

    move() {}

    stroke(color) {
        this.svg.setAttribute("stroke", color);
    }

    strokeWidth(width) {
        this.svg.setAttribute("stroke-width", width + "pt");
    }

    fill(color) {
        this.svg.setAttribute("fill", color);
    }
}

class Point {
    constructor(x, y, w, s = "black") {
        this.x = x;
        this.y = y;
        this.weight = w;
        this.stroke = s;
        this.dragging = false;
        this.svg = null;
        this.draw();
    }

    draw() {
        this.svg = document.createElementNS(SVG_NAMESPACE, "circle");

        this.svg.setAttribute("cx", this.x);
        this.svg.setAttribute("cy", this.y);
        this.svg.setAttribute("r", this.weight);

        this.svg.setAttribute("fill", "black");
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.svg.setAttributeNS(null, "cx", parseInt(this.x));
        this.svg.setAttributeNS(null, "cy", parseInt(this.y));
    }
}

class Triangle {
    constructor(x1, y1, x2, y2, x3, y3) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.svg = null;
        this.draw();
    }

    draw() {
        const pointsString = [
            this.x1,
            this.y1,
            this.x2,
            this.y2,
            this.x3,
            this.y3,
        ].join(",");

        this.svg = document.createElementNS(SVG_NAMESPACE, "polygon");
        this.svg.setAttribute("points", pointsString);

        this.svg.setAttribute("stroke", "black");
        this.svg.setAttribute("stroke-width", "1pt");
        this.svg.setAttribute("fill", "none");
    }

    move() {}

    stroke(color) {
        this.svg.setAttribute("stroke", color);
    }

    strokeWidth(width) {
        this.svg.setAttribute("stroke-width", width + "pt");
    }

    fill(color) {
        this.svg.setAttribute("fill", color);
    }
}

class Group {
    constructor() {
        this.group = null;
        this.create();
    }

    create() {
        this.group = document.createElementNS(SVG_NAMESPACE, "g");
    }

    add(svg) {
        this.group.appendChild(svg);
    }
}
