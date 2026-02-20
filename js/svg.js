function draggable(canvas) {
    let selected = null;
    // let svg = event.target;
    let svg = canvas;
    let offset = { x: 0, y: 0 };
    // let newPos = { x: 0, y: 0 };
    let origin = { x: 0, y: 0 };

    svg.addEventListener("mousedown", startDrag);
    svg.addEventListener("mousemove", drag);
    svg.addEventListener("mouseup", endDrag);
    svg.addEventListener("mouseleave", endDrag);

    function startDrag(event) {
        event.preventDefault();
        let target = event.target;
        offset = getMouse(event);

        if (target.classList.contains("draggable")) {
            selected = target;
            origin = {
                x: selected.cx.baseVal.value,
                y: selected.cy.baseVal.value,
            };
        }
    }

    function drag(event) {
        event.preventDefault();
        if (selected) {
            let mousePos = getMouse(event);
            let dx = mousePos.x - offset.x;
            let dy = mousePos.y - offset.y;
            let newPos = { x: origin.x + dx, y: origin.y + dy };

            selected.setAttributeNS(null, "cx", newPos.x);
            selected.setAttributeNS(null, "cy", newPos.y);
        }
    }

    function endDrag(event) {
        event.preventDefault();
        selected = null;
    }

    function getMouse(event) {
        event.preventDefault();
        var CTM = svg.getScreenCTM();
        if (event.touches) {
            event = event.touches[0];
        }

        return {
            x: (event.clientX - CTM.e) / CTM.a,
            y: (event.clientY - CTM.f) / CTM.d,
        };
    }
}

window.addEventListener("load", () => {
    const svgCanvas = document.getElementById("svg-canvas");
    console.log(svgCanvas);
    const circle = new Circle(200, 200, 100);
    const circle2 = new Circle(300, 200, 100);
    draggable(svgCanvas);
    svgCanvas.appendChild(circle.svg);
    svgCanvas.appendChild(circle2.svg);
});

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

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

function makeDraggable(evt) {
    var svg = evt.target;

    svg.addEventListener("mousedown", startDrag);
    svg.addEventListener("mousemove", drag);
    svg.addEventListener("mouseup", endDrag);
    svg.addEventListener("mouseleave", endDrag);
    // svg.addEventListener("touchstart", startDrag);
    // svg.addEventListener("touchmove", drag);
    // svg.addEventListener("touchend", endDrag);
    // svg.addEventListener("touchleave", endDrag);
    // svg.addEventListener("touchcancel", endDrag);

    var selectedElement,
        offset,
        transform,
        bbox,
        minX,
        maxX,
        minY,
        maxY,
        confined;

    var boundaryX1 = 10.5;
    var boundaryX2 = 30;
    var boundaryY1 = 2.2;
    var boundaryY2 = 19.2;

    function startDrag(evt) {
        if (evt.target.classList.contains("draggable")) {
            selectedElement = evt.target;
            offset = getMousePosition(evt);

            // Make sure the first transform on the element is a translate transform
            var transforms = selectedElement.transform.baseVal;

            if (
                transforms.length === 0 ||
                transforms.getItem(0).type !==
                    SVGTransform.SVG_TRANSFORM_TRANSLATE
            ) {
                // Create an transform that translates by (0, 0)
                var translate = svg.createSVGTransform();
                translate.setTranslate(0, 0);
                selectedElement.transform.baseVal.insertItemBefore(
                    translate,
                    0
                );
            }

            // Get initial translation
            transform = transforms.getItem(0);
            offset.x -= transform.matrix.e;
            offset.y -= transform.matrix.f;

            confined = evt.target.classList.contains("confine");
            if (confined) {
                bbox = selectedElement.getBBox();
                minX = boundaryX1 - bbox.x;
                maxX = boundaryX2 - bbox.x - bbox.width;
                minY = boundaryY1 - bbox.y;
                maxY = boundaryY2 - bbox.y - bbox.height;
            }
        }
    }

    function drag(evt) {
        if (selectedElement) {
            evt.preventDefault();

            var coord = getMousePosition(evt);
            var dx = coord.x - offset.x;
            var dy = coord.y - offset.y;

            if (confined) {
                if (dx < minX) {
                    dx = minX;
                } else if (dx > maxX) {
                    dx = maxX;
                }
                if (dy < minY) {
                    dy = minY;
                } else if (dy > maxY) {
                    dy = maxY;
                }
            }

            transform.setTranslate(dx, dy);
        }
    }

    function endDrag(evt) {
        selectedElement = false;
    }
}
