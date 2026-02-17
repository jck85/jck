window.addEventListener("load", function () {
    const svgCanvas = document.getElementById("svg-canvas");

    // const circle = new Circle(100, 100, 50, svgCanvas);
    const circle = new Circle(100, 100, 50);
    circle.draw();

    // circle.draw();
    // circle.addEvents();
    // circle.move(150, 150);

    const canvas = new Canvas(svgCanvas, 0, 0);
    canvas.init();
    canvas.addShape(circle);
    canvas.drawShapes();
});

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

class Canvas {
    constructor(c, w, h) {
        this.canvas = c;
        this.width = w;
        this.height = h;
        this.shapes = [];
        this.groups = [];
        this.offset = { x: 0, y: 0 };
        this.activeShape = null;

        this.offset = null;
    }

    init() {
        console.log(this.canvas);
        // this.getMouse();
        // this.canvas.addEventListener("mousedown", this.startDrag);

        this.canvas.addEventListener("mousedown", (event) => {
            this.offset = this.getMouse(event);
            this.activeShape = event.target;
        });

        this.canvas.addEventListener("mousemove", (event) => {
            const element = event.target;

            if (element && this.activeShape) {
                event.preventDefault();
                console.log(element);

                // let offset;
                var coord = this.getMouse(event);
                var dx = coord.x - this.offset.x;
                var dy = coord.y - this.offset.y;

                console.log(dx, dy, this.offset);

                // this.circle.setAttribute("cx", parseInt(this.offset.x));
                // this.circle.setAttribute("cy", parseInt(this.offset.y));

                element.setAttribute(
                    "transform",
                    `translate(${this.offset.x} ${this.offset.y})`
                );
            }
        });

        this.canvas.addEventListener("mouseup", () => {
            this.activeShape = null;
        });
    }

    addShape(shape) {
        this.shapes.push(shape);
    }

    drawShapes() {
        for (let shape of this.shapes) {
            shape.draw();
            this.canvas.appendChild(shape.svg);
        }
    }

    drag(event) {
        console.log(event);

        const selectedElement = event.target;

        if (selectedElement) {
            event.preventDefault();

            // let offset;
            // // var coord = getMousePosition(event);
            // var dx = coord.x - this.offset.x;
            // var dy = coord.y - this.offset.y;

            // console.log(dx, dy, this.offset);

            // // this.circle.setAttribute("cx", parseInt(this.offset.x));
            // // this.circle.setAttribute("cy", parseInt(this.offset.y));

            // selectedElement.setAttribute(
            //     "transform",
            //     `translate(${this.offset.x} ${this.offset.y})`
            // );
        }
    }

    // startDrag(event) {
    //     console.log("start drag");
    //     this.getMouse();
    //     // this.activeShape = event.target;
    //     // this.getMouse(event);
    //     // console.log(mousePos);
    //     // this.test();
    // }

    // endDrag(event) {
    //     console.log("end drag");
    // }

    getMouse(event) {
        console.log("get mouse");
        const svg = event.target;
        const CTM = svg.getScreenCTM();

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
        // this.circle = null;
        this.active = false;
        this.svg = null;
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

        // console.log(this.svg);
        // this.canvas.appendChild(this.svg);
    }

    move(x, y) {
        this.posX = x;
        this.posY = y;
        this.circle.setAttribute("cx", parseInt(this.posX));
        this.circle.setAttribute("cy", parseInt(this.posY));
    }
}

// ai example
/**
const svg = document.getElementById('canvas');
const draggableRect = document.getElementById('draggableRect');

let selectedElement = null;
let offset = { x: 0, y: 0 };

// Function to get mouse position in SVG coordinates
function getMousePosition(evt) {
    const CTM = svg.getScreenCTM();
    if (evt.touches) {
        evt = evt.touches[0];
    }
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}

// Mousedown event handler to start dragging
function startDrag(evt) {
    if (evt.target.id === 'draggableRect') {
        selectedElement = evt.target;
        const mousePosition = getMousePosition(evt);
        // Calculate the offset between the mouse position and the element's top-left corner
        offset = {
            x: mousePosition.x - parseFloat(selectedElement.getAttributeNS(null, "x")),
            y: mousePosition.y - parseFloat(selectedElement.getAttributeNS(null, "y"))
        };
        // Attach mousemove and mouseup listeners to the *SVG canvas*
        // to prevent issues if the mouse moves too fast off the element
        svg.addEventListener('mousemove', drag);
        svg.addEventListener('mouseup', endDrag);
    }
}

// Mousemove event handler to move the element
function drag(evt) {
    if (selectedElement) {
        evt.preventDefault();
        const mousePosition = getMousePosition(evt);
        // Update the element's position based on the mouse position and initial offset
        selectedElement.setAttributeNS(null, "x", mousePosition.x - offset.x);
        selectedElement.setAttributeNS(null, "y", mousePosition.y - offset.y);
    }
}

// Mouseup event handler to end dragging
function endDrag(evt) {
    if (selectedElement) {
        selectedElement = null;
        // Remove the mousemove and mouseup listeners from the SVG canvas
        svg.removeEventListener('mousemove', drag);
        svg.removeEventListener('mouseup', endDrag);
    }
}

// Add mousedown listener to the SVG canvas to initiate drags
svg.addEventListener('mousedown', startDrag);

 */

// const boundaryX1 = 0;
// const boundaryX2 = 600;
// const boundaryY1 = 0;
// const boundaryY2 = 400;

// function makeDraggable(event) {
//   const svg = event.target;

//   // svg.addEventListener('mousedown', startDrag);
//   // svg.addEventListener('mousemove', drag);
//   // svg.addEventListener('mouseup', endDrag);
//   // svg.addEventListener('mouseleave', endDrag);

// }

// const target = event.target;

// if (target) {
//     event.preventDefault();

//     // let offset;
//     var cord = getMousePosition(event);
//     console.log(cord);
//     var dx = cord.x - this.offset.x;
//     var dy = cord.y - this.offset.y;
//     // var dx = cord.x;
//     // var dy = cord.y;

//     // const confined = event.target.classList.contains("confine");
//     // if (confined) {
//     //     if (dx < minX) {
//     //         dx = minX;
//     //     } else if (dx > maxX) {
//     //         dx = maxX;
//     //     }
//     //     if (dy < minY) {
//     //         dy = minY;
//     //     } else if (dy > maxY) {
//     //         dy = maxY;
//     //     }
//     // }

//     // transform.setTranslate(dx, dy);
//     this.circle.setAttribute("cx", parseInt(dx));
//     this.circle.setAttribute("cy", parseInt(dy));
// }

// function getMousePosition(event) {
//     const svg = event.target;
//     const CTM = svg.getScreenCTM();

//     if (event.touches) {
//         event = event.touches[0];
//     }

//     return {
//         x: (event.clientX - CTM.e) / CTM.a,
//         y: (event.clientY - CTM.f) / CTM.d,
//     };
// }

// const selectedElement,
//     offset,
//     transform,
//     bbox,
//     minX,
//     maxX,
//     minY,
//     maxY,
//     confined;

// function svgCircle(center, radius) {
//     let myCircle = document.createElementNS(SVG_NAMESPACE, "ellipse");

//     myCircle.setAttribute("cx", parseInt(center));
//     myCircle.setAttribute("cy", parseInt(center));
//     myCircle.setAttribute("rx", parseInt(radius));
//     myCircle.setAttribute("ry", parseInt(radius));

//     myCircle.setAttribute("stroke", "black");
//     myCircle.setAttribute("stroke-width", "2pt");
//     myCircle.setAttribute("fill", "white");

//     return myCircle;
// }

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

/**
 Junkyard


function svgLine(x1, y1, x2, y2) {
    let myLine = document.createElementNS("http://www.w3.org/2000/svg", "line");

    myLine.setAttribute("x1", parseInt(x1));
    myLine.setAttribute("y1", parseInt(y1));
    myLine.setAttribute("x2", parseInt(x2));
    myLine.setAttribute("y2", parseInt(y2));

    // myLine.setAttribute('stroke', c);

    myLine.setAttribute("stroke", "black");
    myLine.setAttribute("stroke-width", "2pt");
    myLine.setAttribute("fill", "none");

    return myLine;
}

function makeDraggable(event) {
    const svg = event.target;

    svg.addEventListener("mousedown", startDrag);
    svg.addEventListener("mousemove", drag);
    svg.addEventListener("mouseup", endDrag);
    svg.addEventListener("mouseleave", endDrag);
}

function getMousePosition(event) {
    const svg = event.target;
    const CTM = svg.getScreenCTM();

    if (event.touches) {
        event = event.touches[0];
    }

    return {
        x: (event.clientX - CTM.e) / CTM.a,
        y: (event.clientY - CTM.f) / CTM.d,
    };
}

function startDrag(event) {
    const svg = event.target;
    const offset = (event);
    console.log(offset);

    if (event.target.classList.contains("draggable")) {
        console.log(svg);
    }
}

function endDrag(event) {
    selectedElement = false;
}

function intersectRect(r1, r2) {
    let x1 = parseInt(r1.getAttribute("x"));
    let x1Max = x1 + parseInt(r1.getAttribute("width"));
    let y1 = parseInt(r1.getAttribute("y"));
    let y1Max = y1 + parseInt(r1.getAttribute("height"));

    let x2 = parseInt(r2.getAttribute("x"));
    let x2Max = x2 + parseInt(r2.getAttribute("width"));
    let y2 = parseInt(r2.getAttribute("y"));
    let y2Max = y2 + parseInt(r2.getAttribute("height"));

    //console.log('R1:', x1, y1, x1Max, y1Max, 'R2:', x2, y2, x2Max, y2Max);
    //console.log(x1Max < x2, x1 > x2Max, y1 > y2Max, y1Max < y2);
    let areIntersecting = x1Max < x2 || x1 > x2Max || y1 > y2Max || y1Max < y2;
    console.log(!areIntersecting);
}

 */
