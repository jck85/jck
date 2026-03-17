class Point {
    constructor(x, y, w, s = "black") {
        this.weight = w;
        this.stroke = s;
        this.dragging = false;
        this.x = x;
        this.y = y;
        this.svg = null;
    }

    draw() {
        // stroke(this.stroke);
        // strokeWeight(this.weight);
        // fill(0);
        // ellipse(this.x, this.y, 10, 10);

        this.svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        this.svg.setAttribute("cx", this.x);
        this.svg.setAttribute("cy", this.y);
        this.svg.setAttribute("r", this.weight);
        this.svg.setAttribute("fill", "blue");
        // svg.appendChild(point);
    }

    // drag(x, y) {
    //     if (this.dragging) {
    //         this.x = x;
    //         this.y = y;
    //         console.log(this.x, this.y);
    //     }
    //     this.draw();
    // }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.svg.setAttributeNS(null, "cx", parseInt(this.x));
        this.svg.setAttributeNS(null, "cy", parseInt(this.y));
    }
}
