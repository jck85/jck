window.addEventListener("load", function () {
    console.log("Page fully loaded!");

    const svgCanvas = document.getElementById("svg-canvas");
    // const svgCtx = svgCanvas.getContext("2d");

    width = svgCanvas.clientWidth;
    height = svgCanvas.clientHeight;
    console.log(width, height);

    // let circle = svgCircle(100, 25);
    // canvas.appendChild(circle);
    // let rect = svgRect(200, 100, 50, 50);
    // canvas.appendChild(rect);

    const circle = new Circle(100, 100, 50, svgCanvas);
    circle.draw();
    circle.addEvents();
    circle.move(150, 150);
});

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

class Shape {
    constructor(x, y) {}

    mouseOver(event) {
        const svg = event.target;
        const CTM = svg.getScreenCTM();

        if (event.touches) {
            event = event.touches[0];
        }

        mousePos = {
            x: (event.clientX - CTM.e) / CTM.a,
            y: (event.clientY - CTM.f) / CTM.d,
        };

        // return {
        //     x: (event.clientX - CTM.e) / CTM.a,
        //     y: (event.clientY - CTM.f) / CTM.d,
        // };
    }
}

class Circle {
    constructor(x, y, r, canvas) {
        this.posX = x;
        this.posY = y;
        this.radius = r;
        this.canvas = canvas;
        this.circle = null;
        this.offset = 0;
    }

    getMousePosition(event) {
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

    draw() {
        this.circle = document.createElementNS(SVG_NAMESPACE, "ellipse");

        this.circle.setAttribute("cx", parseInt(this.posX));
        this.circle.setAttribute("cy", parseInt(this.posY));
        this.circle.setAttribute("rx", parseInt(this.radius));
        this.circle.setAttribute("ry", parseInt(this.radius));

        this.circle.setAttribute("stroke", "black");
        this.circle.setAttribute("stroke-width", "2pt");
        this.circle.setAttribute("fill", "white");

        this.canvas.appendChild(this.circle);
    }

    move(x, y) {
        this.posX = x;
        this.posY = y;
        this.circle.setAttribute("cx", parseInt(this.posX));
        this.circle.setAttribute("cy", parseInt(this.posY));
    }

    addEvents() {
        this.circle.addEventListener("mouseenter", () => {
            console.log("mouseenter");
            this.circle.setAttribute("stroke", "green");
        });

        this.circle.addEventListener("mouseleave", () => {
            console.log("mouseleave");
            this.circle.setAttribute("stroke", "black");
        });

        this.circle.addEventListener("mousedown", (event) => {
            console.log("mousedown");
            // this.offset = getMousePosition(event);
        });

        this.circle.addEventListener("mousemove", (event) => {
            console.log("mousemove");
        });

        // this.circle.addEventListener("mousemove", () => {
        //     console.log("mouse move");
        // });

        this.circle.addEventListener("mouseup", () => {
            console.log("mouse up");
        });

        //     // newRect.addEventListener("mousedown", startDrag);
        //     // newRect.addEventListener("mousemove", drag);
        //     // newRect.addEventListener("mouseup", endDrag);

        // this.circle.addEventListener();
    }

    startDrag(event) {
        const svg = event.target;
        const offset = getMousePosition(event);
        console.log(offset);

        if (event.target.classList.contains("draggable")) {
            console.log(svg);
        }
    }

    drag(event) {
        console.log(event.target);
        const selectedElement = event.target;

        if (selectedElement) {
            event.preventDefault();

            let offset;
            var coord = getMousePosition(event);
            var dx = coord.x - offset.x;
            var dy = coord.y - offset.y;

            // const confined = event.target.classList.contains("confine");
            // if (confined) {
            //     if (dx < minX) {
            //         dx = minX;
            //     } else if (dx > maxX) {
            //         dx = maxX;
            //     }

            //     if (dy < minY) {
            //         dy = minY;
            //     } else if (dy > maxY) {
            //         dy = maxY;
            //     }
            // }

            transform.setTranslate(dx, dy);
        }
    }

    endDrag(event) {
        selectedElement = false;
    }
}

const boundaryX1 = 0;
const boundaryX2 = 600;
const boundaryY1 = 0;
const boundaryY2 = 400;

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
