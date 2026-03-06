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

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

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
