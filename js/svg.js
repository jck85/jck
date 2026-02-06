window.addEventListener("load", function () {
    console.log("Page fully loaded!");

    let canvas = document.getElementById("svg-canvas");
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    console.log(width, height);

    let circle = svgCircle(100, 25);
    canvas.appendChild(circle);
    let rect = svgRect(200, 100, 50, 50);
    canvas.appendChild(rect);
});

const svgNS = "http://www.w3.org/2000/svg";

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

function svgCircle(center, radius) {
    let myCircle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "ellipse"
    );
    myCircle.setAttribute("cx", parseInt(center));
    myCircle.setAttribute("cy", parseInt(center));
    myCircle.setAttribute("rx", parseInt(radius));
    myCircle.setAttribute("ry", parseInt(radius));

    myCircle.setAttribute("stroke", "black");
    myCircle.setAttribute("stroke-width", "2pt");
    myCircle.setAttribute("fill", "white");

    return myCircle;
}

function svgRect(xPos, yPos, width, height, fill, stroke, weight) {
    let newRect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
    );

    newRect.setAttribute("x", parseInt(xPos));
    newRect.setAttribute("y", parseInt(yPos));
    newRect.setAttribute("width", parseInt(width));
    newRect.setAttribute("height", parseInt(height));

    newRect.setAttribute("stroke", "black");
    newRect.setAttribute("stroke-width", "2pt");
    newRect.setAttribute("fill", "white");

    // newRect.addEventListener('mousedown', startMove);
    // // newRect.addEventListener('mouseup', endMove);
    // newRect.addEventListener("mousedown", startDrag);
    // newRect.addEventListener("mousemove", drag);
    // newRect.addEventListener("mouseup", endDrag);
    // newRect.addEventListener("mouseleave", endDrag);

    // newRect.classList.add("draggable");

    return newRect;
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
    const offset = getMousePosition(event);
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
