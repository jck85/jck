// function draggable(canvas) {
//     let selected = null;
//     let svg = canvas;
//     let offset = { x: 0, y: 0 };
//     let origin = { x: 0, y: 0 };

//     svg.addEventListener("mousedown", startDrag);
//     svg.addEventListener("mousemove", drag);
//     svg.addEventListener("mouseup", endDrag);
//     svg.addEventListener("mouseleave", endDrag);

//     function startDrag(event) {
//         event.preventDefault();
//         let target = event.target;
//         offset = getMouse(event);

//         if (target.classList.contains("draggable")) {
//             selected = target;
//             origin = {
//                 x: selected.cx.baseVal.value,
//                 y: selected.cy.baseVal.value,
//             };
//         }
//     }

//     function drag(event) {
//         event.preventDefault();
//         if (selected) {
//             let mousePos = getMouse(event);
//             let dx = mousePos.x - offset.x;
//             let dy = mousePos.y - offset.y;
//             let newPos = { x: origin.x + dx, y: origin.y + dy };

//             selected.setAttributeNS(null, "cx", newPos.x);
//             selected.setAttributeNS(null, "cy", newPos.y);
//         }
//     }

//     function endDrag(event) {
//         event.preventDefault();
//         selected = null;
//     }

//     function getMouse(event) {
//         event.preventDefault();
//         var CTM = svg.getScreenCTM();
//         if (event.touches) {
//             event = event.touches[0];
//         }

//         return {
//             x: (event.clientX - CTM.e) / CTM.a,
//             y: (event.clientY - CTM.f) / CTM.d,
//         };
//     }
// }

window.addEventListener("load", () => {
    // const svgCanvas = document.getElementById("svg-canvas");

    const circle = new Circle(200, 200, 100);
    // const circle2 = new Circle(300, 200, 100);
    // draggable(svgCanvas);
    // svgCanvas.appendChild(circle.svg);
    // svgCanvas.appendChild(circle2.svg);

    const canvas = new Canvas("svg-canvas");
    canvas.init();
    canvas.draw(circle);
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
    constructor(x, y, r, canvas) {
        this.posX = x;
        this.posY = y;
        this.radius = r;
        this.canvas = canvas;
        this.active = false;
        this.svg = null;
        this.draw();
    }

    draw() {
        this.svg = document.createElementNS(SVG_NAMESPACE, "ellipse");

        this.svg.setAttribute("cx", parseInt(this.posX));
        this.svg.setAttribute("cy", parseInt(this.posY));
        this.svg.setAttribute("rx", parseInt(this.radius));
        this.svg.setAttribute("ry", parseInt(this.radius));

        this.svg.setAttribute("stroke", "black");
        this.svg.setAttribute("stroke-width", "2pt");
        this.svg.setAttribute("fill", "white");

        this.svg.setAttribute("class", "draggable");
    }

    move(x, y) {
        this.posX = x;
        this.posY = y;
        this.circle.setAttribute("cx", parseInt(this.posX));
        this.circle.setAttribute("cy", parseInt(this.posY));
    }
}
