const colors = ["red", "green", "blue", "magenta", "cyan"];

let offset = 5;

class Block {
    constructor(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;

        this.velocity = 0;
        this.gravity = 0.1;
        this.acceleration;
        this.offsetX = 0;
        this.offsetY = 0;
        this.dragging = false;
        this.collided = false;

        this.over = false;
        this.active = false;
        this.currentColor = this.c;
        this.strokeColor = "black";
    }

    show() {
        fill(this.currentColor);
        stroke(this.strokeColor);
        strokeWeight(2);
        rect(this.x, this.y, this.w, this.h);
    }

    update() {
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }

        if (this.y + this.h < height) {
            this.velocity += this.acceleration;
            this.y += this.velocity;
        } else {
            this.y = height - this.h;
            this.velocity = 0;
        }
    }

    fall(blocks = []) {
        let isStacked = false;

        // Check if this block should land on any other block
        for (let block of blocks) {
            if (this !== block && this.isOnTopOf(block)) {
                this.y = block.y - this.h;
                this.velocity = 0;
                isStacked = true;
                break;
            }
        }

        // If not stacked on another block, check if still above ground
        if (!isStacked && this.y + this.h < height) {
            this.velocity += this.gravity;
            this.y += this.velocity;
        } else if (!isStacked) {
            this.y = height - this.h;
            this.velocity = 0;
        }
    }

    // checkStacked(block) {
    //     // Check if this block is horizontally aligned with the other block
    //     let overlapX = this.x < block.x + block.w && this.x + this.w > block.x;
    //     let overlapY = this.y + this.h > block.y;
    //     if (overlapX && overlapY) {
    //         this.y = block.y - this.h;
    //     }

    //     // Check if this block is approaching or touching the top of the other block
    //     // let bottomOfThis = this.y + this.h;
    //     // let topOfOther = block.y;

    //     // let isTouching =
    //     //     this.y + this.h >= block.y - this.velocity &&
    //     //     this.y + this.h <= block.y + 5;

    //     // return overlapX && isTouching && this.y < block.y;
    // }

    checkCollision(block) {
        let overlapX = this.x < block.x + block.w && this.x + this.w > block.x;
        let overlapY = this.y + this.h > block.y && this.y < block.y + block.h;

        // if (overlapX) {
        //     console.log("overlapX");
        // }
        // if (overlapY) {
        //     console.log("overlapY");
        // }
        if (overlapX && overlapY) {
            console.log("collision!");
            this.y = block.y - this.h;
            this.acceleration = 0;
        } else {
            this.acceleration = this.gravity;
        }
        // if (this.y + this.h > block.y) {
        //     this.currentColor = "purple";
        // } else {
        //     this.currentColor = this.c;
        // }

        // if (
        //     this.x < block.x + block.w &&
        //     this.x + this.w > block.x &&
        //     this.y < block.y + block.h &&
        //     this.y + this.h > block.h
        // ) {
        //     console.log("collision!");
        //     return true;
        // }

        // return false;
    }

    resolveCollisions(blocks) {
        for (let block of blocks) {
            if (this !== block && this.checkCollision(block)) {
                let overlapX = Math.min(
                    this.x + this.w - block.x,
                    block.x + block.w - this.x
                );

                let overlapY = Math.min(
                    this.y + this.h - block.y,
                    block.y + block.h - this.y
                );

                // Resolve by smallest overlap
                if (overlapX < overlapY) {
                    if (this.x < block.x) {
                        this.x -= overlapX / 2;
                        block.x += overlapX / 2;
                    } else {
                        this.x += overlapX / 2;
                        block.x -= overlapX / 2;
                    }
                } else {
                    if (this.y < block.y) {
                        this.y -= overlapY / 2;
                        block.y += overlapY / 2;
                    } else {
                        this.y += overlapY / 2;
                        block.y -= overlapY / 2;
                    }
                }
            }
        }
    }

    atEdge() {
        if (this.y > height - this.h - offset) {
            return true;
        }

        return false;
    }

    mouseOver() {
        if (
            mouseX > this.x &&
            mouseX < this.x + this.w &&
            mouseY > this.y &&
            mouseY < this.y + this.h
        ) {
            // this.over = true;
            return true;
        }
        // else {
        //     this.over = false;
        // }

        return false;
    }

    pressed() {
        if (this.mouseOver()) {
            this.strokeColor = color(0, 200, 0);
            this.active = true;
            this.dragging = true;
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }
    }

    released() {
        this.strokeColor = color(0, 0, 200);
        this.active = false;
        this.dragging = false;
    }

    // isMouseOver() {
    //     return (
    //         mouseX > this.x &&
    //         mouseX < this.x + this.w &&
    //         mouseY > this.y &&
    //         mouseY < this.y + this.h
    //     );
    // }

    // moveWithMouse() {
    //     if (this.isMouseOver() && mouseIsPressed) {
    //         this.x = mouseX - this.w / 2;
    //         this.y = mouseY - this.h / 2;
    //         this.velocity = 0;
    //     }
    // }
}

let block = null;
let block2 = null;

let blocks = [];

function setup() {
    let c = document.getElementById("blocks");
    width = c.clientWidth;
    height = c.clientHeight;

    const canvas = createCanvas(width, height, SVG);
    canvas.parent("blocks");
    frameRate(60);

    // block = new Block(50, 50, 50, 50, "blue");
    // block.show();

    // block2 = new Block(150, 65, 50, 50, "green");
    // block2.show();

    blocks.push(new Block(100, 200, 50, 50, "red"));
    blocks.push(new Block(200, 100, 50, 50, "green"));
    blocks.push(new Block(300, 50, 50, 50, "blue"));
}

function draw() {
    background(255);
    // block.show();
    // block.update();
    // block.hover();
    // block.checkCollision(block2);

    // block2.show();
    // block2.update();
    // block2.hover();
    // block2.checkCollision(block);

    for (let i = 0; i < blocks.length; i++) {
        // block.moveWithMouse();
        let block = blocks[i];
        block.update();
        block.show();
        for (let j = 0; j < blocks.length; j++) {
            if (j === i) {
                break;
            }
            block.checkCollision(blocks[j]);
        }
        // block.fall(blocks);
    }

    // Resolve collisions after all blocks have moved
    // for (let block of blocks) {
    //     block.resolveCollisions(blocks);
    // }

    // for (let block of blocks) {
    //     block.show();
    // }
}

function mousePressed() {
    // block.pressed();
    // block2.pressed();
    for (let block of blocks) {
        block.pressed();
    }
}

function mouseReleased() {
    // block.released();
    // block2.released();
    for (let block of blocks) {
        block.released();
    }
}
