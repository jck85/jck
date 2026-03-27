let canvasWidth = 0;
let canvasHeight = 0;

let canvasCenterX = 0;
let canvasCenterY = 0;

window.addEventListener("resize", () => {
    let canvasId = "home-canvas";
    let c = document.getElementById(canvasId);
    canvasWidth = c.clientWidth;
    canvasHeight = c.clientHeight;

    canvasCenterX = canvasWidth / 2;
    canvasCenterY = canvasHeight / 2;

    resizeCanvas(canvasWidth, canvasHeight);
});

function setup() {
    let canvasId = "home-canvas";
    let c = document.getElementById(canvasId);
    canvasWidth = c.clientWidth;
    canvasHeight = c.clientHeight;

    canvasCenterX = canvasWidth / 2;
    canvasCenterY = canvasHeight / 2;

    console.log(canvasCenterX, canvasCenterY, canvasWidth, canvasHeight);
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(canvasId);

    frameRate(60);
    angleMode(DEGREES);
}

function draw() {
    background(255);

    // Sun
    fill(255, 165, 0);
    ellipse(canvasCenterX, canvasCenterY, 45, 45);

    // Mercury
    let mercuryOrbitA = 40;
    let mercuryX = cos(frameCount * 1.0) * mercuryOrbitA + canvasCenterX;
    let mercuryY = sin(frameCount * 1.0) * mercuryOrbitA + canvasCenterY;
    fill(200, 10, 200);
    noStroke();
    ellipse(mercuryX, mercuryY, 15, 15);

    // Mercury Orbit
    // noFill();
    // stroke(0);
    // strokeWeight(2);
    // arc(canvasCenterX, canvasCenterY, mercuryOrbitA * 2, mercuryOrbitA * 2, 0, 360);

    // Venus
    let venusOrbitA = 75;
    let venusX = cos(frameCount * 0.66) * venusOrbitA + canvasCenterX;
    let venusY = sin(frameCount * 0.66) * venusOrbitA + canvasCenterY;
    fill(10, 200, 10);
    noStroke();
    ellipse(venusX, venusY, 20, 20);

    // Venus Orbit
    // noFill();
    // stroke(0);
    // strokeWeight(2);
    // arc(canvasCenterX, canvasCenterY, venusOrbitA * 2, venusOrbitA * 2, 0, 360);

    // Earth
    let earthOrbitA = 115;
    let earthX = cos(frameCount * 0.25) * earthOrbitA + canvasCenterX;
    let earthY = sin(frameCount * 0.25) * earthOrbitA + canvasCenterY;
    fill(10, 10, 200);
    noStroke();
    ellipse(earthX, earthY, 20, 20);

    // Earth orbit
    // noFill();
    // stroke(0);
    // strokeWeight(2);
    // arc(canvasCenterX, canvasCenterY, earthOrbitA * 2, earthOrbitA * 2, 0, 360);

    // Moon
    let moonOrbitA = 22;
    let moonX = cos(frameCount * 1) * moonOrbitA + earthX;
    let moonY = sin(frameCount * 1) * moonOrbitA + earthY;
    fill(100, 100, 100);
    noStroke();
    ellipse(moonX, moonY, 10, 10);

    // Moon orbit
    // noFill();
    // stroke(0);
    // strokeWeight(2);
    // arc(earthX, earthY, moonOrbitA * 2, moonOrbitA * 2, 0, 360);

    // Mars
    let marsOrbitA = 165;
    let marsX = cos(frameCount * 0.1) * marsOrbitA + canvasCenterX;
    let marsY = sin(frameCount * 0.1) * marsOrbitA + canvasCenterY;
    fill(200, 10, 10);
    noStroke();
    ellipse(marsX, marsY, 15, 15);

    // Mars orbit
    // noFill();
    // stroke(0);
    // strokeWeight(2);
    // arc(canvasCenterX, canvasCenterY, marsOrbitA * 2, marsOrbitA * 2, 0, 360);
}
