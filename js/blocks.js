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

    // console.log("blocks resize", canvasWidth, previousWidth, scaleWidth);

    // Update Renderer
    Renderer.canvas.width = canvasWidth;
    Renderer.canvas.height = canvasHeight;

    Renderer.options.width = canvasWidth;
    Renderer.options.height = canvasHeight;

    Renderer.bounds.max.x = Renderer.bounds.min.x + canvasWidth;
    Renderer.bounds.max.y = Renderer.bounds.min.y + canvasHeight;

    // Update walls
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

    // Update blocks
    const bodies = Composite.allBodies(World);
    const bodyCount = bodies.length;
    for (let i = 4; i < bodyCount; i++) {
        let pos = bodies[i].position;
        // console.log(pos);

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
            fillStyle: "grey",
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
