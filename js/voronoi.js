const colors = [
    "red",
    "green",
    "blue",
    "magenta",
    "cyan",
    "yellow",
    "orange",
    "purple",
];

function downloadSvg() {
    console.log("download svg");
    save("voronoi.svg");
}

let width = 0;
let height = 0;
let nodeCount = 4;
let nodeMax = 25;
let nodeMin = 1;
let nodes = [];
let offset = 10;
let points = [];
let bounds = [];
let delaunay = null;
let voronoi = null;
let polygons = [];

// p5js functions
function setup() {
    let c = document.getElementById("voronoi");
    width = c.clientWidth;
    height = c.clientHeight;

    const canvas = createCanvas(width, height, SVG);
    canvas.parent("voronoi");

    // create random nodes
    for (let i = 0; i < nodeCount; i++) {
        let x = floor(random(offset * 2, width - offset * 2));
        let y = floor(random(offset * 2, height - offset * 2));
        nodes.push([x, y]);
    }

    // create boundes for voronoi
    bounds = [offset, offset, width - offset, height - offset];

    createVoronoi();
    createPoints();
    frameRate(60);
}

function draw() {}

function mousePressed() {
    for (let p of points) {
        if (dist(mouseX, mouseY, p.x, p.y) < 25) {
            p.dragging = true;
        }
    }
}

function mouseReleased() {
    for (let p of points) {
        p.dragging = false;
    }
}

function mouseDragged() {
    // background(255);
    createVoronoi();
    for (let i = 0; i < nodes.length; i++) {
        if (mouseX < bounds[0]) {
            mouseX = bounds[0];
        }
        if (mouseX > bounds[2]) {
            mouseX = bounds[2];
        }
        if (mouseY < bounds[1]) {
            mouseY = bounds[1];
        }
        if (mouseY > bounds[3]) {
            mouseY = bounds[3];
        }
        points[i].drag(mouseX, mouseY);
        nodes[i] = [points[i].x, points[i].y];
    }
}

// voronoi functions
function createPoints() {
    points = [];

    // create points from nodes
    for (let i = 0; i < nodes.length; i++) {
        let x = nodes[i][0];
        let y = nodes[i][1];
        let p = new Point(x, y, 2);
        points.push(p);
        p.show();
    }
}

function createVoronoi() {
    delaunay = d3.Delaunay.from(nodes);
    voronoi = delaunay.voronoi(bounds);
    polygons = [];

    for (let gon of voronoi.cellPolygons()) {
        polygons.push(gon);
    }

    strokeWeight(2);
    stroke(0);
    for (let i = 0; i < polygons.length; i++) {
        let polygon = polygons[i];
        fill(colors[i % colors.length]);
        beginShape();
        for (let v of polygon) {
            vertex(v[0], v[1]);
        }
        endShape(CLOSE);
    }
}

function increaseNodes() {
    nodes = [];
    nodeCount += 1;
    if (nodeCount > nodeMax) {
        nodeCount = nodeMax;
    }

    for (let i = 0; i < nodeCount; i++) {
        let x = floor(random(offset * 2, width - offset * 2));
        let y = floor(random(offset * 2, height - offset * 2));
        nodes.push([x, y]);
    }
    createVoronoi();
    createPoints();
    updateNodeCount();
}

function decreaseNodes() {
    nodes = [];
    nodeCount -= 1;
    if (nodeCount < nodeMin) {
        nodeCount = nodeMin;
    }

    for (let i = 0; i < nodeCount; i++) {
        let x = floor(random(offset * 2, width - offset * 2));
        let y = floor(random(offset * 2, height - offset * 2));
        nodes.push([x, y]);
    }
    createVoronoi();
    createPoints();
    updateNodeCount();
}

function updateNodeCount() {
    let p = document.getElementById("node-count");
    p.innerText = nodeCount;
}
