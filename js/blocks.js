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

    let lineWidth = 4;
    let bodyWidth = 50;
    let bodyHeight = 50;

    // Blocks
    const blockA = Bodies.rectangle(200, 400, bodyWidth, bodyHeight, {
        render: {
            fillStyle: "#dd0000",
            strokeStyle: "#000000",
            lineWidth: lineWidth,
        },
        frictionAir: 0.05,
        mass: 10,
        // intertia: 1,
    });

    const blockB = Bodies.rectangle(300, 300, bodyWidth, bodyHeight, {
        render: {
            fillStyle: "#00dd00",
            strokeStyle: "#008800",
            lineWidth: lineWidth,
        },
        frictionAir: 0.05,
        mass: 10,
        // intertia: 1,
    });

    const blockC = Bodies.rectangle(400, 200, bodyWidth, bodyHeight, {
        render: {
            fillStyle: "#0000dd",
            strokeStyle: "#000088",
            lineWidth: lineWidth,
        },
        frictionAir: 0.05,
        mass: 10,
        // intertia: 1,
    });

    const partA = Bodies.rectangle(400, 100, bodyWidth, bodyHeight, {
        render: {
            fillStyle: "#000000",
            strokeStyle: "#000000",
            lineWidth: 0,
        },
    });
    const partB = Bodies.rectangle(400, 100, bodyWidth - 4, bodyHeight - 4, {
        render: {
            fillStyle: "#dd00dd",
            strokeStyle: "#000000",
            lineWidth: 4,
        },
    });

    const blockD = Matter.Body.create({
        parts: [partA, partB],
        isStatic: false,
    });

    Matter.Body.setPosition(blockD, { x: 400, y: 100 });

    const blocks = [blockA, blockB, blockC, blockD];
    Matter.Composite.add(world, blocks);

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
});
