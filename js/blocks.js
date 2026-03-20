const WIDTH = 600;
const HEIGHT = 600;

const Bodies = Matter.Bodies;
const Engine = Matter.Engine.create();
const World = Engine.world;
const Runner = Matter.Runner;
const Render = Matter.Render;
const Composite = Matter.Composite;
const Mouse = Matter.Mouse;
const blocks = [];
const maxBlocks = 4;
let blockCount = 0;

window.addEventListener("load", () => {
    console.log("blocks");

    const canvas = document.getElementById("blocks-canvas");
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    renderWorld(canvas, width, height);

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

        blocks.push(block);
        blockCount = blocks.length;
    }
    console.log(`made ${blockCount} blocks`);
    addToWorld(blocks);
});

function renderWorld(canvas, width, height) {
    // generate matter js world

    const renderer = Matter.Render.create({
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
        },
    });

    Render.run(renderer);
    Runner.run(Runner.create(), Engine);

    // Mouse Controls
    const mouse = Matter.Mouse.create(renderer.canvas);
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
    renderer.mouse = mouse;

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
    const bottom = Bodies.rectangle(centerX, height, width, wallHeight, props);
    const left = Bodies.rectangle(width, centerY, wallHeight, height, props);
    const right = Bodies.rectangle(0, centerY, wallHeight, height, props);

    Composite.add(World, [top, right, bottom, left]);
}

function addToWorld(things) {
    Composite.add(World, things);
}

function createBlock(x, y, w, h, props) {
    const block = Bodies.rectangle(x, y, w, h, props);
    return block;
}

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
