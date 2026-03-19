window.addEventListener("load", () => {
    const voronoi = new Voronoi("voronoi");
    voronoi.setup();
    voronoi.draw();

    // add button events
    const addNodeButton = document.getElementById("add-node");
    if (addNodeButton) {
        addNodeButton.addEventListener("click", () => {
            voronoi.addNode();
        });
    }

    const removeNodeButton = document.getElementById("remove-node");
    if (removeNodeButton) {
        removeNodeButton.addEventListener("click", () => {
            voronoi.removeNode();
        });
    }
});

class Voronoi {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;

        this.nodes = [];
        this.nodesMap = {};
        this.nodeCount = 4;
        this.nodeMax = 25;
        this.nodeMin = 2;
        this.offset = 10;

        this.points = [];
        this.bounds = [];
        this.delaunay = null;
        this.voronoi = null;
        this.polygons = null;

        this.activePoint = null;
    }

    clearCanvas() {
        while (this.canvas.firstChild) {
            this.canvas.removeChild(this.canvas.firstChild);
        }
    }

    setup() {
        for (let i = 0; i < this.nodeCount; i++) {
            const x = Math.floor(
                Math.random() * (this.width - this.offset) + this.offset
            );
            const y = Math.floor(
                Math.random() * (this.width - this.offset) + this.offset
            );

            this.nodes.push([x, y]);
            // this.nodes["node-" + i] = [x, y];
        }

        // console.log("nodes:", this.nodes);

        this.bounds = [
            this.offset,
            this.offset,
            this.width - this.offset,
            this.height - this.offset,
        ];

        this.canvas.addEventListener("mousedown", (event) => {
            event.preventDefault();
            const target = event.target;
            const mousePos = getMouse(this.canvas, event);

            for (let i = 0; i < this.points.length; i++) {
                const d = distance(
                    mousePos.x,
                    mousePos.y,
                    this.points[i].x,
                    this.points[i].y
                );
                if (d < 10) {
                    this.points[i].dragging = true;
                    this.activePoint = this.points[i];
                }
            }
        });

        this.canvas.addEventListener("mousemove", (event) => {
            event.preventDefault();
            const mousePos = getMouse(this.canvas, event);
            const x = mousePos.x;
            const y = mousePos.y;

            if (this.activePoint) {
                // console.log(this.activePoint);
                this.activePoint.move(x, y);
                const id = this.activePoint.svg.id;
                // console.log("moving: ", id);
                this.nodes[id] = [x, y];
            }

            this.draw();
            // for (let i = 0; i < this.nodes.length; i++) {
            //     this.points[i].move(x, y);
            //     this.nodes = [this.points[i].x, this.points[i].y];
            // }
        });

        this.canvas.addEventListener("mouseup", (event) => {
            event.preventDefault();
            for (let i = 0; i < this.points.length; i++) {
                this.points[i].dragging = false;
            }
            this.activePoint = null;
        });

        this.canvas.addEventListener("mouseleave", (event) => {
            event.preventDefault();
            this.activePoint = null;
        });
    }

    draw() {
        this.clearCanvas();

        this.delaunay = d3.Delaunay.from(this.nodes);
        this.voronoi = this.delaunay.voronoi(this.bounds);
        this.polygons = [];

        for (let gon of this.voronoi.cellPolygons()) {
            this.polygons.push(gon);
        }

        for (let i = 0; i < this.polygons.length; i++) {
            let vertices = this.polygons[i];

            const polygon = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "polygon"
            );

            const pointsString = vertices.map((p) => p.join(",")).join(" ");

            polygon.setAttribute("points", pointsString);
            polygon.setAttribute("stroke-width", 4);
            polygon.setAttribute("stroke", "black");
            polygon.setAttribute("fill", "white");
            this.canvas.appendChild(polygon);
        }

        for (let i = 0; i < this.nodes.length; i++) {
            let x = this.nodes[i][0];
            let y = this.nodes[i][1];
            let p = new Point(x, y, 6);
            this.points.push(p);
            p.draw();
            p.svg.id = i;
            this.canvas.appendChild(p.svg);
        }
    }

    createSvg() {
        const polygon = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polygon"
        );
    }

    addNode() {
        this.nodeCount += 1;

        if (this.nodeCount > this.nodeMax) {
            this.nodeCount = this.nodeMax;
        }

        const x = Math.floor(
            Math.random() * (this.width - this.offset) + this.offset
        );
        const y = Math.floor(
            Math.random() * (this.width - this.offset) + this.offset
        );

        this.nodes.push([x, y]);
        this.draw();
    }

    removeNode() {
        this.nodeCount -= 1;
        if (this.nodeCount <= 1) {
            this.nodeCount = 1;
        }

        this.nodes.pop();
        this.draw();
    }
}
