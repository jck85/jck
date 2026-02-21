window.addEventListener("load", () => {
    const canvas = new Canvas("svg-canvas");
    canvas.init();

    const circle = new Circle(200, 200, 100);
    const rect = new Rectangle(300, 100, 50, 50);

    canvas.draw(circle);
    canvas.draw(rect);
});

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

class Canvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);

        this.selected = null;
        this.origin = { x: 0, y: 0 };
        this.offset = { x: 0, y: 0 };
    }

    init() {
        this.canvas.addEventListener("mousedown", (event) => {
            event.preventDefault();
            const target = event.target;
            this.offset = this.getMouse(event);

            if (target.classList.contains("draggable")) {
                this.selected = target;
                this.origin = {
                    x: this.selected.cx.baseVal.value,
                    y: this.selected.cy.baseVal.value,
                };
            }
        });

        this.canvas.addEventListener("mousemove", (event) => {
            event.preventDefault();
            if (this.selected) {
                let mousePos = this.getMouse(event);
                let dx = mousePos.x - this.offset.x;
                let dy = mousePos.y - this.offset.y;
                let newPos = { x: this.origin.x + dx, y: this.origin.y + dy };

                this.selected.setAttributeNS(null, "cx", newPos.x);
                this.selected.setAttributeNS(null, "cy", newPos.y);
            }
        });

        this.canvas.addEventListener("mouseup", (event) => {
            event.preventDefault();
            this.selected = null;
        });

        this.canvas.addEventListener("mouseleave", (event) => {
            event.preventDefault();
            this.selected = null;
        });
    }

    draw(shape) {
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
    }

    draw() {
        this.svg = document.createElementNS(SVG_NAMESPACE, "ellipse");

        this.svg.setAttribute("cx", parseInt(this.x));
        this.svg.setAttribute("cy", parseInt(this.y));
        this.svg.setAttribute("rx", parseInt(this.radius));
        this.svg.setAttribute("ry", parseInt(this.radius));

        this.svg.setAttribute("stroke", "black");
        this.svg.setAttribute("stroke-width", "2pt");
        this.svg.setAttribute("fill", "white");

        this.svg.setAttribute("class", "draggable");
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.svg.setAttribute("cx", parseInt(this.posX));
        this.svg.setAttribute("cy", parseInt(this.posY));
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.svg = null;
    }

    draw() {
        this.svg = document.createElementNS(SVG_NAMESPACE, "rect");

        this.svg.setAttribute("x", parseInt(this.x));
        this.svg.setAttribute("y", parseInt(this.y));
        this.svg.setAttribute("width", parseInt(this.width));
        this.svg.setAttribute("height", parseInt(this.height));

        this.svg.setAttribute("stroke", "black");
        this.svg.setAttribute("stroke-width", "2pt");
        this.svg.setAttribute("fill", "white");

        this.svg.setAttribute("class", "draggable");
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.svg.setAttribute("x", parseInt(this.x));
        this.svg.setAttribute("y", parseInt(this.y));
    }
}

// function svgRect(xPos, yPos, width, height, fill, stroke, weight) {
//     let newRect = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "rect"
//     );

//     newRect.setAttribute("x", parseInt(xPos));
//     newRect.setAttribute("y", parseInt(yPos));
//     newRect.setAttribute("width", parseInt(width));
//     newRect.setAttribute("height", parseInt(height));

//     newRect.setAttribute("stroke", "black");
//     newRect.setAttribute("stroke-width", "2pt");
//     newRect.setAttribute("fill", "white");

//     // newRect.addEventListener('mousedown', startMove);
//     // // newRect.addEventListener('mouseup', endMove);
//     // newRect.addEventListener("mousedown", startDrag);
//     // newRect.addEventListener("mousemove", drag);
//     // newRect.addEventListener("mouseup", endDrag);
//     // newRect.addEventListener("mouseleave", endDrag);

//     // newRect.classList.add("draggable");

//     return newRect;
// }

// function svgLine(x1, y1, x2, y2) {
//     let myLine = document.createElementNS("http://www.w3.org/2000/svg", "line");

//     myLine.setAttribute("x1", parseInt(x1));
//     myLine.setAttribute("y1", parseInt(y1));
//     myLine.setAttribute("x2", parseInt(x2));
//     myLine.setAttribute("y2", parseInt(y2));

//     // myLine.setAttribute('stroke', c);

//     myLine.setAttribute("stroke", "black");
//     myLine.setAttribute("stroke-width", "2pt");
//     myLine.setAttribute("fill", "none");

//     return myLine;
// }

// function intersectRect(r1, r2) {
//     let x1 = parseInt(r1.getAttribute("x"));
//     let x1Max = x1 + parseInt(r1.getAttribute("width"));
//     let y1 = parseInt(r1.getAttribute("y"));
//     let y1Max = y1 + parseInt(r1.getAttribute("height"));

//     let x2 = parseInt(r2.getAttribute("x"));
//     let x2Max = x2 + parseInt(r2.getAttribute("width"));
//     let y2 = parseInt(r2.getAttribute("y"));
//     let y2Max = y2 + parseInt(r2.getAttribute("height"));

//     //console.log('R1:', x1, y1, x1Max, y1Max, 'R2:', x2, y2, x2Max, y2Max);
//     //console.log(x1Max < x2, x1 > x2Max, y1 > y2Max, y1Max < y2);
//     let areIntersecting = x1Max < x2 || x1 > x2Max || y1 > y2Max || y1Max < y2;
//     console.log(!areIntersecting);
// }
