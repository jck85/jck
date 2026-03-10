window.addEventListener("load", () => {
    let canvas = document.getElementById("canvas");
    const WIDTH = 600;
    const HEIGHT = 600;

    const Bodies = Matter.Bodies;
    const engine = Matter.Engine.create();
    const world = engine.world;
    const draw = Matter.Render.create({
        element: canvas,
        engine: engine,
        options: {
            width: WIDTH,
            height: HEIGHT,
            showAxes: false,
            showCollisions: false,
            showConvexHulls: false,
            wireframes: false,
            background: "#dddddd",
        },
    });
    Matter.Render.run(draw);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Blocks
    const blockA = Bodies.rectangle(200, 400, 50, 50, {
        render: {
            fillStyle: "#dd0000",
            strokeStyle: "#880000",
            lineWidth: 8,
        },
        frictionAir: 0.05,
        mass: 1,
        intertia: 1,
    });

    const blockB = Bodies.rectangle(300, 300, 50, 50, {
        render: {
            fillStyle: "#00dd00",
            strokeStyle: "#008800",
            lineWidth: 8,
        },
        frictionAir: 0.05,
        mass: 1,
        intertia: 1,
    });
    const blockC = Bodies.rectangle(400, 200, 50, 50, {
        render: {
            fillStyle: "#0000dd",
            strokeStyle: "#000088",
            lineWidth: 8,
        },
        frictionAir: 0.05,
        mass: 1,
        intertia: 1,
    });

    const blocks = [blockA, blockB, blockC];

    Matter.Composite.add(world, [blockA, blockB, blockC]);

    // Walls
    const topWall = Bodies.rectangle(WIDTH / 2, 0, WIDTH, 40, {
        isStatic: true,
        mass: 1000,
        render: {
            fillStyle: "#008800",
            strokeStyle: "black",
            lineWidth: 4,
        },
    });
    const bottomWall = Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, 40, {
        isStatic: true,
        render: {
            fillStyle: "#008800",
            strokeStyle: "black",
            lineWidth: 4,
        },
    });
    const leftWall = Bodies.rectangle(WIDTH, HEIGHT / 2, 40, HEIGHT, {
        isStatic: true,
        render: {
            fillStyle: "#008800",
            strokeStyle: "black",
            lineWidth: 4,
        },
    });
    const rightWall = Bodies.rectangle(0, HEIGHT / 2, 40, HEIGHT, {
        isStatic: true,
        render: {
            fillStyle: "#008800",
            strokeStyle: "black",
            lineWidth: 4,
        },
    });

    Matter.Composite.add(world, [topWall, rightWall, bottomWall, leftWall]);

    // Mouse Controls
    const mouse = Matter.Mouse.create(draw.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.5,
            render: {
                visible: false,
            },
        },
    });

    Matter.Composite.add(world, mouseConstraint);

    // Sync mouse with renderer
    draw.mouse = mouse;

    // Trying to slow down blocks
    Matter.Events.on(engine, "beforeUpdate", () => {
        const maxSpeed = 10;
        blocks.forEach((body) => {
            if (body.velocity.x > maxSpeed) body.velocity.x = maxSpeed;
            if (body.velocity.y > maxSpeed) body.velocity.y = maxSpeed;
        });
    });
});

/**
    Shelf
 
    // const Engine = Matter.Engine;
    // const Render = Matter.Render;
    // const Runner = Matter.Runner;
    // const Body = Matter.Body;
    // const Events = Matter.Events;
    // const MouseConstraint = Matter.MouseConstraint;
    // const Mouse = Matter.Mouse;
    // const Composite = Matter.Composite;
    // // add compound body
    // var partA = Bodies.rectangle(600, 200, 120 * 0.8, 50 * 0.8, {
    //     render: { fillStyle: "#060a19" },
    // });

    // let partB = Bodies.rectangle(660, 200, 50 * 0.8, 190 * 0.8, {
    //     render: { fillStyle: "#060a19" },
    // });

    // let compound = Body.create({
    //     parts: [partA, partB],
    //     isStatic: true,
    // });

    // Body.setPosition(compound, { x: 600, y: 300 });
 */

// OLD BLOCKS CODE, NEED TO MOVE
/**
 * 
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
window.addEventListener("load", () => {
    const world = new World("blocks");
    world.setup();

    const block1 = new Block(100, 100, 50, 50, "red", "white", "4px");
    const block2 = new Block(200, 100, 50, 50, "blue", "white", "4px");
    const block3 = new Block(300, 100, 50, 50, "green", "white", "4px");

    world.draw(block1);
    world.draw(block2);
    world.draw(block3);
});

class World {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);

        this.selected = null;
        this.origin = { x: 0, y: 0 };
        this.offset = { x: 0, y: 0 };

        this.shapes = [];
        this.activeShape = null;
        this.collisions = []
    }

    setup() {
        this.canvas.addEventListener("mousedown", (event) => {
            event.preventDefault();
            const target = event.target;

            this.offset = this.getMouse(event);
            this.activeShape = this.shapes[target.id - 1];

            if (target.classList.contains("draggable")) {
                this.origin.x = this.activeShape.x;
                this.origin.y = this.activeShape.y;
            }
        });

        this.canvas.addEventListener("mousemove", (event) => {
            event.preventDefault();
            if (this.activeShape) {
                let mousePos = this.getMouse(event);
                let dx = mousePos.x - this.offset.x;
                let dy = mousePos.y - this.offset.y;

                let newPos = { x: this.origin.x + dx, y: this.origin.y + dy };

                this.activeShape.move(newPos.x, newPos.y);

                this.getCollisions()
                this.resolveCollisions()
            }
        });

        this.canvas.addEventListener("mouseup", (event) => {
            event.preventDefault();
            this.selected = null;
            this.activeShape = null;
        });null

        this.canvas.addEventListener("mouseleave", (event) => {
            event.preventDefault();
            this.selected = null;
            this.activeShape = null;
        });
    }

    draw(shape) {
        shape.id = this.shapes.length + 1;
        this.shapes.push(shape);

        shape.draw();
        this.canvas.appendChild(shape.svg);
    }

    getMouse(event) {
        event.preventDefault();
        var CTM = this.canvas.getScreenCTM();

        if (event.touches) {
            event = event.touches[0];
        }

        return {
            x: (event.clientX - CTM.e) / CTM.a,
            y: (event.clientY - CTM.f) / CTM.d,
        };
    }

    getCollisions() {
        this.collisions = [];

        for (let i = 0; i < this.shapes.length; i++) {
            let a = this.shapes[i]
            
            for (let j = i + 1; j < this.shapes.length; j++) {
                let b = this.shapes[j];

                if (this.checkCollision(a, b)) {
                    console.log("collision")
                    this.collisions.push([a, b])
                }
            }
        }
    }

    checkCollision(a, b) {
        let overlapX = a.x + a.w > b.x && b.x + b.w > a.x;
        let overlapY = a.y + a.h > b.y && b.y + b.h > a.y;

        if (overlapX && overlapY) {
            this.collided = true;
            return true;
        } else {
            this.collided = false;
            return false;
        }
    }

    resolveCollisions() {
        for (let i = 0; i < this.collisions.length; i++) {

            let a = this.collisions[i][0]
            let b = this.collisions[i][1]

            console.log(a.x, a.y, b.x, b.y)

            if (a.x > b.x) {
                a.move(b.x + a.w, a.y)
            } else if (a.x < b.x) {
                a.move(b.x - a.w, a.y)
            }

            // if (a.y > b.y) {
            //     a.move(b.y + a.h, a.x)
            // }

            // if (a.y < b.y) {
            //     a.move(b.y - a.h, a.x)
            // }

        }
    }
}

class Block {
    constructor(x, y, w, h, stroke, fill, weight) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.svg = null;
        this.id = null;
        this.stroke = stroke;
        this.fill = fill;
        this.strokeWeight = weight;
    }

    draw() {
        this.svg = document.createElementNS(SVG_NAMESPACE, "rect");

        this.svg.setAttribute("x", parseInt(this.x));
        this.svg.setAttribute("y", parseInt(this.y));
        this.svg.setAttribute("width", parseInt(this.w));
        this.svg.setAttribute("height", parseInt(this.h));

        this.svg.setAttribute("stroke", this.stroke);
        this.svg.setAttribute("stroke-width", this.strokeWeight);
        this.svg.setAttribute("fill", this.fill);

        this.svg.setAttribute("class", "draggable");
        this.svg.setAttribute("id", this.id);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.svg.setAttributeNS(null, "x", parseInt(this.x));
        this.svg.setAttributeNS(null, "y", parseInt(this.y));
    }
}

// let overlapX = this.x + this.w > block.x && block.x + block.w > this.x;
// let overlapY = this.y + this.h > block.y && block.y + block.h > this.y;

// let blocks = [];

// let width = 0;
// let height = 0;

// let blockCount = 3;

// function setup() {
//     let c = document.getElementById("blocks");

//     width = c.clientWidth;
//     height = c.clientHeight;

//     const canvas = createCanvas(width, height, SVG);

//     canvas.parent("blocks");
//     frameRate(60);

//     for (let i = 0; i < blockCount; i++) {
//         let block = new Block(75 * i + 25, 50, 50, 50);
//         blocks.push(block);
//     }
// }

// function draw() {
//     background(255);

//     for (let i = 0; i < blockCount; i++) {
//         for (let j = 0; j < blockCount; j++) {
//             if (i === j) {
//                 continue;
//             }

//             blocks[i].checkCollision(blocks[j]);
//         }

//         blocks[i].update();
//         blocks[i].show();
//     }
// }

// function mousePressed() {
//     for (let i = 0; i < blockCount; i++) {
//         blocks[i].pressed();
//     }
// }

// function mouseReleased() {
//     for (let i = 0; i < blockCount; i++) {
//         blocks[i].released();
//     }
// }

// class Block {
//     constructor(x, y, w, h) {
//         // dims and pos
//         this.x = x;
//         this.y = y;
//         this.w = w;
//         this.h = h;
//         this.offsetX = 0;
//         this.offsetY = 0;

//         // physics
//         this.velocity = 0;
//         this.gravity = 0.1;
//         this.acceleration = this.gravity;

//         // interactions
//         this.dragging = false;
//         this.collided = false;
//         this.over = false;
//         this.active = false;

//         // style
//         this.fillColor = "lightblue";
//         this.strokeColor = "black";
//         this.strokeWeight = 4;
//     }

//     show() {
//         fill(this.fillColor);
//         stroke(this.strokeColor);
//         strokeWeight(this.strokeWeight);
//         rect(this.x, this.y, this.w, this.h);
//     }

//     update() {
//         if (this.dragging) {
//             this.x = mouseX + this.offsetX;
//             this.y = mouseY + this.offsetY;
//         }

//         if (this.y + this.h < height) {
//             if (this.collided) {
//                 this.velocity = 0;
//             } else {
//                 this.velocity += this.acceleration;
//             }

//             this.y += this.velocity;
//         } else {
//             this.y = height - this.h;
//             this.velocity = 0;
//         }
//     }

//     checkCollision(block) {
//         // let overlapX1 = this.x + this.w < block.x;
//         // let overlapY1 = this.y + this.h < block.y;

//         // let overlapX2 = block.x + block.w < this.x;
//         // let overlapY2 = block.y + block.h < this.y;

//         // console.log(overlapX1, overlapX2, overlapY1, overlapY2)

//         let overlapX = this.x + this.w > block.x && block.x + block.w > this.x;
//         let overlapY = this.y + this.h > block.y && block.y + block.h > this.y;

//         // console.log(overlapX, overlapY);

//         if (overlapX && overlapY) {
//             this.collided = true;
//         } else {
//             this.collided = false;
//         }
//     }

//     mouseOver() {
//         if (
//             mouseX > this.x &&
//             mouseX < this.x + this.w &&
//             mouseY > this.y &&
//             mouseY < this.y + this.h
//         ) {
//             return true;
//         }
//         return false;
//     }

//     pressed() {
//         if (this.mouseOver()) {
//             this.strokeColor = color(0, 200, 0);
//             this.active = true;
//             this.dragging = true;
//             this.offsetX = this.x - mouseX;
//             this.offsetY = this.y - mouseY;
//             this.acceleration = 0;
//         }
//     }

//     released() {
//         this.strokeColor = color(0, 0, 200);
//         this.active = false;
//         this.dragging = false;
//         this.acceleration = this.gravity;
//     }
// }

 */
