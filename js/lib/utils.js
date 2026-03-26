const colors = ["red", "orange", "yellow", "green", "blue"];

function lerp(s, e, t) {
    return s * (1 - t) + e * t;
}

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

function getMouse(svgElement, evt) {
    const rect = svgElement.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
    };
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function clearSvgCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

function downloadSVG(svgId) {
    let svg = document.getElementById(svgId);
    let svgFile = svg.innerHTML;
    let blob = new Blob([svgFile.toString()]);
    let element = document.createElement("a");
    element.download = svgId + ".svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
}

//Converts a deciaml number 0-80 to an 4 element array representing its ternary value
function ternary(num) {
    let ternaryNum = [];

    //trivial case
    if (num === 0) {
        ternaryNum.unshift(0);
        ternaryNum.unshift(0);
        ternaryNum.unshift(0);
        ternaryNum.unshift(0);
        return ternaryNum;
    }

    while (num > 0) {
        let remainder = num % 3;
        num = parseInt(num / 3);
        ternaryNum.unshift(remainder);
    }

    if (ternaryNum.length === 1) {
        ternaryNum.unshift(0);
        ternaryNum.unshift(0);
        ternaryNum.unshift(0);
        return ternaryNum;
    } else if (ternaryNum.length === 2) {
        ternaryNum.unshift(0);
        ternaryNum.unshift(0);
        return ternaryNum;
    } else if (ternaryNum.length === 3) {
        ternaryNum.unshift(0);
        return ternaryNum;
    } else if (ternaryNum.length === 4) {
        return ternaryNum;
    }
}
