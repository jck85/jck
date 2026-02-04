// Utility functions
function mouseOver(x, y, w, h) {
    if (x < 0 || y < 0 || x > w || y > h) {
        return false;
    }
    if (x < w && y < h) {
        return true;
    }
}

function remap(val, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (val - low1)) / (high1 - low1);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function clearDrawing() {
    let canvas = document.getElementById("graph");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadVortexSVG() {
    // get the svg
    let svg = document.getElementById("svg-graph");
    // get ellipse
    let outline = svg.getElementsByTagName("ellipse");
    // get lines
    outline.setAttribute("stroke", "black");
    let lines = svg.getElementsByTagName("line");
    //console.log(lines.length);
    for (let line in lines) {
        line.setAttribute("stroke", "blue");
    }
    let svgFile = svg.innerHTML;
    let blob = new Blob([svgFile.toString()]);
    let element = document.createElement("a");
    element.download = "svg-coaster.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
}

function downloadSVG() {
    // get the svg
    let svg = document.getElementById("svg-graph");
    // get ellipse
    let outline = svg.getElementsByTagName("ellipse");
    // get lines
    outline.setAttribute("stroke", "black");
    let lines = svg.getElementsByTagName("line");
    //console.log(lines.length);
    for (let line in lines) {
        line.setAttribute("stroke", "blue");
    }
    let svgFile = svg.innerHTML;
    let blob = new Blob([svgFile.toString()]);
    let element = document.createElement("a");
    element.download = "svg-coaster.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
}
