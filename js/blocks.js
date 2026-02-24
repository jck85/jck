let blocks = [];

let width = 0;
let height = 0;

let blockCount = 2;

function setup() {
    let c = document.getElementById("blocks");
    width = c.clientWidth;
    height = c.clientHeight;

    const canvas = createCanvas(width, height, SVG);
    canvas.parent("blocks");
    frameRate(60);

    for (let i = 0; i < blockCount; i++) {
        let block = new Block(75 * i + 25, 50, 50, 50);
        blocks.push(block);
    }
}

function draw() {
    background(255);

    for (let i = 0; i < blockCount; i++) {
        blocks[i].update();
        blocks[i].show();
        for (let j = 1; j < blockCount; j++) {
            if (i === j) {
                continue
            }
            blocks[i].checkCollision(blocks[j]);
        }

    }
}

function mousePressed() {
    for (let i = 0; i < blockCount; i++) {
        blocks[i].pressed();
    }
}

function mouseReleased() {
    for (let i = 0; i < blockCount; i++) {
        blocks[i].released();
    }
}

class Block {
    constructor(x, y, w, h) {
        // dims and pos
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.offsetX = 0;
        this.offsetY = 0;

        // physics
        this.velocity = 0;
        this.gravity = 0.1;
        this.acceleration = this.gravity;

        // interactions
        this.dragging = false;
        this.collided = false;
        this.over = false;
        this.active = false;

        // style
        this.fillColor = "lightblue";
        this.strokeColor = "black";
        this.strokeWeight = 4;
    }

    show() {
        fill(this.fillColor);
        stroke(this.strokeColor);
        strokeWeight(this.strokeWeight);
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

    checkCollision(block) {

        let overlapX1 = this.x + this.w < block.x;
        let overlapY1 = this.y + this.h < block.y;

        let overlapX2 = block.x + block.w < this.x;
        let overlapY2 = block.y + block.h < this.y;

        // console.log(overlapX1, overlapX2, overlapY1, overlapY2)

        let overlapX = this.x + this.w > block.x && block.x + block.w > this.x;
        let overlapY = this.y + this.h > block.y && block.y + block.h > this.y;

        console.log(overlapX, overlapY)

        if (overlapX && overlapY) {
            console.log("collision!");
            this.y = block.y - this.h;
            this.acceleration = 0;
        }
        // else {
        //     // this.acceleration = this.gravity;
        // }
    }

    mouseOver() {
        if (
            mouseX > this.x &&
            mouseX < this.x + this.w &&
            mouseY > this.y &&
            mouseY < this.y + this.h
        ) {
            return true;
        }
        return false;
    }

    pressed() {
        if (this.mouseOver()) {
            this.strokeColor = color(0, 200, 0);
            this.active = true;
            this.dragging = true;
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
            this.acceleration = 0;
        }
    }

    released() {
        this.strokeColor = color(0, 0, 200);
        this.active = false;
        this.dragging = false;
        this.acceleration = this.gravity;
    }
}
