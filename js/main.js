let centerX = 0;
let centerY = 0;

function setup() {
    let canvasId = "home-canvas";
    let c = document.getElementById(canvasId);
    let width = c.clientWidth;
    let height = c.clientHeight;

    centerX = width / 2;
    centerY = height / 2;

    const canvas = createCanvas(width, height);
    canvas.parent(canvasId);

    frameRate(60);
    angleMode(DEGREES);
}

function draw() {
    background(255);

    // Sun
    fill(255, 165, 0);
    ellipse(centerX, centerY, 45, 45);

    // Mercury
    let mercuryOrbitA = 40;
    let mercuryX = cos(frameCount * 1.0) * mercuryOrbitA + centerX;
    let mercuryY = sin(frameCount * 1.0) * mercuryOrbitA + centerY;
    fill(200, 10, 200);
    noStroke();
    ellipse(mercuryX, mercuryY, 15, 15);

    // Mercury Orbit
    // noFill();
    // stroke(0);
    // strokeWeight(2);
    // arc(centerX, centerY, mercuryOrbitA * 2, mercuryOrbitA * 2, 0, 360);

    // Venus
    let venusOrbitA = 75;
    let venusX = cos(frameCount * 0.66) * venusOrbitA + centerX;
    let venusY = sin(frameCount * 0.66) * venusOrbitA + centerY;
    fill(10, 200, 10);
    noStroke();
    ellipse(venusX, venusY, 20, 20);

    // Venus Orbit
    // noFill();
    // stroke(0);
    // strokeWeight(2);
    // arc(centerX, centerY, venusOrbitA * 2, venusOrbitA * 2, 0, 360);

    // Earth
    let earthOrbitA = 115;
    let earthX = cos(frameCount * 0.25) * earthOrbitA + centerX;
    let earthY = sin(frameCount * 0.25) * earthOrbitA + centerY;
    fill(10, 10, 200);
    noStroke();
    ellipse(earthX, earthY, 20, 20);

    // Earth orbit
    // noFill();
    // stroke(0);
    // strokeWeight(2);
    // arc(centerX, centerY, earthOrbitA * 2, earthOrbitA * 2, 0, 360);

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
    let marsX = cos(frameCount * 0.1) * marsOrbitA + centerX;
    let marsY = sin(frameCount * 0.1) * marsOrbitA + centerY;
    fill(200, 10, 10);
    noStroke();
    ellipse(marsX, marsY, 15, 15);

    // Mars orbit
    // noFill();
    // stroke(0);
    // strokeWeight(2);
    // arc(centerX, centerY, marsOrbitA * 2, marsOrbitA * 2, 0, 360);
}
