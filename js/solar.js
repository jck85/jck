class SolarSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.centerX = this.width/2;
        this.centerY = this.height/2;
        this.planets = [];
        this.sun = null;
    }

    resize(canvas) {
        this.canvas = canvas;
        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
    }

    create() {
        this.sun = document.createElementNS(SVG_NAMESPACE, "circle");

        this.sun.setAttribute("cx", parseInt(this.centerX));
        this.sun.setAttribute("cy", parseInt(this.centerY));
        this.sun.setAttribute("r", parseInt(25));

        this.sun.setAttribute("stroke", "black");
        this.sun.setAttribute("stroke-width", "2");
        this.sun.setAttribute("fill", "orange");

        this.canvas.appendChild(this.sun);
    }

    update(frameCount) {        
        for (let i = 0; i < this.planets.length; i++) {
            this.planets[i].orbitSun(this.centerX, this.centerY, frameCount)
        }
    }

    addPlanet(planet) {
        let x = this.centerX + planet.distance;
        let y = this.centerY;
        
        planet.move(x, y);
        planet.barycenterX = this.centerX;
        planet.barycenterY = this.centerY;
        planet.canvas = this.canvas;

        this.planets.push(planet);
        this.canvas.appendChild(planet.svg);
    }

}

class Planet {
    constructor(r, d, o, props) {
        this.radius = r;
        this.distance = d;
        this.orbitalPeriod = o;

        this.name = props.name;
        this.stroke = props.stroke;
        this.strokeWidth = props.strokeWidth;
        this.fill = props.fill;
        
        this.x = 0;
        this.y = 0;        
        this.svg = null;
    }

    create() {
        this.svg = document.createElementNS(SVG_NAMESPACE, "circle");

        this.svg.setAttribute("cx", parseInt(this.x));
        this.svg.setAttribute("cy", parseInt(this.y));
        this.svg.setAttribute("r", parseInt(this.radius));

        this.svg.setAttribute("stroke", this.stroke);
        this.svg.setAttribute("stroke-width", this.strokeWidth);
        this.svg.setAttribute("fill", this.fill);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.svg.setAttribute("cx", parseInt(this.x));
        this.svg.setAttribute("cy", parseInt(this.y));
    }

    orbitSun(orbitX, orbitY, angle) {        
        this.x = Math.cos(angle * this.orbitalPeriod) * this.distance + orbitX;
        this.y = Math.sin(angle * this.orbitalPeriod) * this.distance + orbitY;
        this.svg.setAttribute("cx", parseInt(this.x));
        this.svg.setAttribute("cy", parseInt(this.y));
    }
}

let solarSystem = null;
let frameCount = 0;
let planet = null;
let sun  = null;

window.addEventListener("resize", () => {
    let canvas = document.getElementById("solar-canvas");
    // let canvasId = "home-canvas";
    // canvasWidth = c.clientWidth;
    // canvasHeight = c.clientHeight;

    // canvasCenterX = canvasWidth / 2;
    // canvasCenterY = canvasHeight / 2;

    // resizeCanvas(canvasWidth, canvasHeight);
    solarSystem.resize(canvas)
});

window.addEventListener("load", () => {
    console.log('solar system load');

    solarSystem = new SolarSystem("solar-canvas");
    solarSystem.create();

    let mercuryProps = {
        "name": "mercury",
        "stroke": "black",
        "strokeWidth": "2",
        "fill": "red"
    }
    planet = new Planet(5, 36, 0.0114, mercuryProps);
    planet.create();
    solarSystem.addPlanet(planet);

    let venusProps = {
        "name": "venus",
        "stroke": "black",
        "strokeWidth": "2",
        "fill": "green"
    }
    planet = new Planet(9, 67, 0.0044, venusProps);
    planet.create();
    solarSystem.addPlanet(planet);
    
    let earthProps = {
        "name": "earth",
        "stroke": "black",
        "strokeWidth": "2",
        "fill": "blue"
    }
    planet = new Planet(10, 100, 0.0027, earthProps);
    planet.create();
    solarSystem.addPlanet(planet);

    let marsProps = {
        "name": "mars",
        "stroke": "black",
        "strokeWidth": "2",
        "fill": "magenta"
    }
    planet = new Planet(7, 150, 0.0015, marsProps);
    planet.create();
    solarSystem.addPlanet(planet);
});

function updateWorld() {
    frameCount = frameCount + 1;
    solarSystem.update(frameCount);
}

setInterval(updateWorld, 16);
