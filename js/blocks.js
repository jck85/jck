// const WIDTH = 600;
// const HEIGHT = 600;

const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Engine = Matter.Engine.create();
const World = Engine.world;
const Runner = Matter.Runner;
const Render = Matter.Render;
let Renderer = null;
const Composite = Matter.Composite;
const Mouse = Matter.Mouse;
const blocks = [];
const maxBlocks = 4;
let blockCount = 0;

let previousWidth = 0;
let previousHeight = 0;

window.addEventListener("load", () => {
    const canvas = document.getElementById("blocks-canvas");
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    previousWidth = width;
    previousHeight = height;

    renderWorld(canvas, width, height);

    // Generate some default blocks to start
    const blockSide = width * 0.1;
    const centerX = width / 2;
    const defaultStart = centerX - (blockSide * maxBlocks) / 2;

    for (let i = 0; i < maxBlocks; i++) {
        const blockProps = {
            render: {
                fillStyle: colors[i],
                strokeStyle: "black",
                lineWidth: 4,
            },
            frictionAir: 0.01,
            mass: 1,
            chamfer: { radius: 2 },
        };

        const block = createBlock(
            defaultStart + i * (blockSide + 10),
            width / 2,
            blockSide,
            blockSide,
            blockProps
        );

        block.id = `block-${i}`;

        blocks.push(block);
        blockCount = blocks.length;
    }

    addToWorld(blocks);
});

window.addEventListener("resize", () => {
    let canvas = document.getElementById("blocks-canvas");

    canvasWidth = canvas.clientWidth;
    canvasHeight = canvas.clientHeight;
    let scaleWidth = canvasWidth / previousWidth;
    let scaleHeight = canvasHeight / previousHeight;

    Renderer.canvas.width = canvasWidth;
    Renderer.canvas.height = canvasHeight;

    Renderer.options.width = canvasWidth;
    Renderer.options.height = canvasHeight;

    Renderer.bounds.max.x = Renderer.bounds.min.x + canvasWidth;
    Renderer.bounds.max.y = Renderer.bounds.min.y + canvasHeight;

    const topWall = Composite.get(World, "wall-top", "body");
    Body.setPosition(topWall, { x: canvasWidth / 2, y: 0 });
    Body.scale(topWall, scaleWidth, 1);

    const bottomWall = Composite.get(World, "wall-bottom", "body");
    Body.setPosition(bottomWall, { x: canvasWidth / 2, y: canvasHeight });
    Body.scale(bottomWall, scaleWidth, 1);

    const leftWall = Composite.get(World, "wall-left", "body");
    Body.setPosition(leftWall, { x: 0, y: canvasHeight / 2 });
    Body.scale(leftWall, 1, scaleHeight);

    const rightWall = Composite.get(World, "wall-right", "body");
    Body.setPosition(rightWall, { x: canvasWidth, y: canvasHeight / 2 });
    Body.scale(rightWall, 1, scaleHeight);

    // update blocks
    const bodies = Composite.allBodies(World);
    const bodyCount = bodies.length;
    for (let i = 4; i < bodyCount; i++) {
        let pos = bodies[i].position;

        Body.setPosition(bodies[i], {
            x: pos.x * scaleWidth,
            y: pos.y * scaleHeight,
        });

        Body.scale(bodies[i], scaleWidth, scaleHeight);
    }

    previousWidth = canvasWidth;
    previousHeight = canvasHeight;
});

function renderWorld(canvas, width, height) {
    // generate matter js world

    Renderer = Matter.Render.create({
        element: canvas,
        engine: Engine,
        options: {
            width: width,
            height: height,
            showAxes: false,
            showCollisions: false,
            showConvexHulls: false,
            wireframes: false,
            background: "white",
            pixelRatio: window.devicePixelRatio,
        },
    });

    Render.run(Renderer);
    Runner.run(Runner.create(), Engine);

    // Mouse Controls
    const mouse = Matter.Mouse.create(Renderer.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(Engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.5,
            render: {
                visible: false,
            },
        },
    });

    Composite.add(World, mouseConstraint);

    // Sync mouse with renderer
    Renderer.mouse = mouse;

    // add boundries to world
    const props = {
        isStatic: true,
        render: {
            fillStyle: "none",
            strokeStyle: "none",
            lineWidth: 0,
        },
    };

    const wallHeight = 10;
    const centerX = width / 2;
    const centerY = height / 2;

    const top = Bodies.rectangle(centerX, 0, width, wallHeight, props);
    top.id = "wall-top";

    const bottom = Bodies.rectangle(centerX, height, width, wallHeight, props);
    bottom.id = "wall-bottom";

    const left = Bodies.rectangle(width, centerY, wallHeight, height, props);
    left.id = "wall-left";

    const right = Bodies.rectangle(0, centerY, wallHeight, height, props);
    right.id = "wall-right";

    Composite.add(World, [top, right, bottom, left]);
}

function addToWorld(things) {
    Composite.add(World, things);
}

function createBlock(x, y, w, h, props) {
    const block = Bodies.rectangle(x, y, w, h, props);
    return block;
}

// const blockProps = {
//     render: {
//         fillStyle: "red",
//         strokeStyle: "black",
//         lineWidth: 4,
//     },
//     frictionAir: 0.01,
//     mass: 1,
//     chamfer: { radius: 2 },
// };

// const block = createBlock(width * 0.1, width / 2, 64, 64, blockProps);
// blocks.push(block);
// addToWorld(block);

// const Body = Matter.Body;
// const Bodies = Matter.Bodies;
// const engine = Matter.Engine.create();
// const world = engine.world;
// const render = Matter.Render.create({
//     element: CANVAS,
//     engine: Engine,
//     options: {
//         width: width,
//         height: HEIGHT,
//         showAxes: false,
//         showCollisions: false,
//         showConvexHulls: false,
//         wireframes: false,
//         background: "white",
//     },
// });

// window.addEventListener("load", () => {});

// const runner = Matter.Runner.create();
// const runner = Matter.Runner;
// Matter.Render.run(render);
// Matter.Runner.run(Matter.Runner.create(), Engine);

// let lineWidth = 4;
// let bodyWidth = 50;
// let bodyHeight = 50;

// Blocks
// const block = Bodies.rectangle(200, 400, bodyWidth, bodyHeight, {
//     render: {
//         fillStyle: "#dd0000",
//         strokeStyle: "#000000",
//         lineWidth: lineWidth,
//     },
//     frictionAir: 0.05,
//     mass: 10,
//     chamfer: { radius: 4 },
// });

/**
 * 

const blockB = Bodies.rectangle(300, 300, bodyWidth, bodyHeight, {
    render: {
        fillStyle: "#00dd00",
        strokeStyle: "#008800",
        lineWidth: lineWidth,
    },
    frictionAir: 0.05,
    mass: 10,
    chamfer: { radius: 4 },
});

const blockC = Bodies.rectangle(400, 200, bodyWidth, bodyHeight, {
    render: {
        fillStyle: "#0000dd",
        strokeStyle: "#000088",
        lineWidth: lineWidth,
    },
    frictionAir: 0.05,
    mass: 10,
    chamfer: { radius: 4 },
});

const partA = Bodies.rectangle(400, 100, bodyWidth, bodyHeight, {
    render: {
        fillStyle: "#000000",
        strokeStyle: "#000000",
        lineWidth: 0,
    },
    chamfer: { radius: 10 },
});

const partB = Bodies.rectangle(400, 100, bodyWidth - 8, bodyHeight - 8, {
    render: {
        fillStyle: "#dd00dd",
        strokeStyle: "#000000",
        lineWidth: 4,
    },
    chamfer: { radius: 10 },
});

const blockD = Matter.Body.create({
    parts: [partA, partB],
    isStatic: false,
});

Matter.Body.setPosition(blockD, { x: 400, y: 100 });

const blocks = [blockA, blockB, blockC, blockD];

// Mouse Controls
const mouse = Matter.Mouse.create(render.canvas);
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
    // const maxSpeed = 10;
    let maxX,
        maxY = 10;

    blocks.forEach((body) => {
        let bodyV = body.velocity;
        // let maxV = Matter.Vector.create(maxX, maxY);

        if (bodyV.x >= maxX) {
            // Matter.Body.setVelocity()
            bodyV.x = maxX;
        }

        if (bodyV.y >= maxY) {
            bodyV.y = maxY;
        }

        Matter.Body.setVelocity(body, bodyV);

        // console.log(body);
        // if (body.velocity.x > maxSpeed) body.velocity.x = maxSpeed;
        // if (body.velocity.y > maxSpeed) body.velocity.y = maxSpeed;
        // console.log(body.velocity);
    });
});
 */
