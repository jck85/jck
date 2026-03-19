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
            if (this.activeShape) {
                let mousePos = this.getMouse(event);
                let dx = mousePos.x - this.offset.x;
                let dy = mousePos.y - this.offset.y;
                let newPos = { x: this.origin.x + dx, y: this.origin.y + dy };

                console.log(newPos.x, newPos.y);
                this.activeShape.move(newPos);
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
        this.centerX = x;
        this.centerY = y;
        this.radius = r;
        this.svg = null;
        this.id = null;
        this.pos = { x: x, y: y };
    }

    draw() {
        this.svg = document.createElementNS(SVG_NAMESPACE, "ellipse");

        this.svg.setAttribute("cx", parseInt(this.pos.x));
        this.svg.setAttribute("cy", parseInt(this.pos.y));
        this.svg.setAttribute("rx", parseInt(this.radius));
        this.svg.setAttribute("ry", parseInt(this.radius));

        this.svg.setAttribute("stroke", "black");
        this.svg.setAttribute("stroke-width", "2pt");
        this.svg.setAttribute("fill", "none");

        this.svg.setAttribute("class", "draggable");
        this.svg.setAttribute("id", this.id);
    }

    move(pos) {
        this.svg.setAttributeNS(null, "cx", parseInt(pos.x));
        this.svg.setAttributeNS(null, "cy", parseInt(pos.y));
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.centerX = 0;
        this.centerY = 0;
        this.width = w;
        this.height = h;
        this.svg = null;
        this.id = null;
        this.pos = { x: x, y: y };
    }

    draw() {
        this.svg = document.createElementNS(SVG_NAMESPACE, "rect");

        this.svg.setAttribute("x", parseInt(this.pos.x));
        this.svg.setAttribute("y", parseInt(this.pos.y));
        this.svg.setAttribute("width", parseInt(this.width));
        this.svg.setAttribute("height", parseInt(this.height));

        this.svg.setAttribute("stroke", "black");
        this.svg.setAttribute("stroke-width", "2pt");
        this.svg.setAttribute("fill", "none");

        this.svg.setAttribute("class", "draggable");
        this.svg.setAttribute("id", this.id);
    }

    move(pos) {
        this.svg.setAttributeNS(null, "x", parseInt(pos.x));
        this.svg.setAttributeNS(null, "y", parseInt(pos.y));
    }
}

class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.centerX = 0;
        this.centerY = 0;
        this.svg = null;
        this.id = null;

        this.stroke = "black";
        this.strokeWidth = "2pt";
    }

    draw() {
        this.svg = document.createElementNS(SVG_NAMESPACE, "line");
        this.svg.setAttribute("x1", parseInt(this.x1));
        this.svg.setAttribute("y1", parseInt(this.y1));
        this.svg.setAttribute("x2", parseInt(this.x2));
        this.svg.setAttribute("y2", parseInt(this.y2));
        this.svg.setAttribute("stroke", "black");
        this.svg.setAttribute("stroke-width", "2pt");
    }

    move() {}
}

class Point {
    constructor(x, y, w, s = "black") {
        this.weight = w;
        this.stroke = s;
        this.dragging = false;
        this.x = x;
        this.y = y;
        this.centerX = x;
        this.centerY = y;
        this.svg = null;
    }

    draw() {
        this.svg = document.createElementNS(SVG_NAMESPACE, "circle");

        this.svg.setAttribute("cx", this.x);
        this.svg.setAttribute("cy", this.y);
        this.svg.setAttribute("r", this.weight);
        this.svg.setAttribute("fill", "blue");
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
        this.centerX = 0;
        this.centerY = 0;

        // this.base = b;
        // this.height = h;

        this.id = null;
        // this.width = w;
        // this.height = h;
        this.svg = null;
        this.id = null;
        // this.pos = { x: x, y: y };

        this.centerX = 0;
        this.centerY = 0;
    }

    draw() {
        this.svg = document.createElementNS(SVG_NAMESPACE, "polygon");

        // Set the points attribute
        const pointsString = [
            this.x1,
            this.y1,
            this.x2,
            this.y2,
            this.x3,
            this.y3,
        ].join(",");

        this.svg.setAttribute("points", pointsString);

        this.svg.setAttribute("stroke", "black");
        this.svg.setAttribute("stroke-width", "2pt");
        this.svg.setAttribute("fill", "none");

        this.svg.setAttribute("id", this.id);
    }

    move(pos) {}
}

class Group {
    constructor() {
        this.svgs = [];
        this.fill = "";
        this.stroke = "";
        this.strokeWidth = "";
    }

    create() {}

    add() {
        console.log("adding to group");
    }
}
