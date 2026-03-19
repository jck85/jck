window.addEventListener("load", () => {
    console.log("Set Game");

    const setGame = new SetGame("set");
    setGame.create();

    // tests for shaded triangle
    let x1 = 75;
    let y1 = 100;

    let x2 = 100;
    let y2 = 50;

    let x3 = 125;
    let y3 = 100;

    const triangle = new Triangle(x1, y1, x2, y2, x3, y3);
    triangle.draw();

    for (let i = 0.2; i < 1; i += 0.2) {
        let xa = lerp(x1, x2, i);
        let ya = lerp(y1, y2, i);

        let xb = lerp(x2, x3, i);
        let yb = lerp(y2, y3, i);

        const lineA = new Line(xa, ya, xa, y1);
        const lineB = new Line(xb, yb, xb, y3);

        lineA.draw();
        lineB.draw();

        setGame.canvas.appendChild(lineA.svg);
        setGame.canvas.appendChild(lineB.svg);
    }

    const lineC = new Line(x2, y2, x2, y1);
    lineC.draw();
    console.log(lineC.svg);
    setGame.canvas.appendChild(lineC.svg);

    setGame.canvas.appendChild(triangle.svg);

    // tests for shaded circle
    let cx = 200;
    let cy = 125;
    let r = 25;

    const circle = new Circle(cx, cy, r);
    circle.draw();

    let PI = Math.PI;
    let TWO_PI = PI * 2;
    let d = r * 2;

    let start = PI + PI / 9;
    let stop = TWO_PI - PI / 9;
    let increment = PI / (r * 2 * 0.3);

    for (let i = start; i <= stop; i += increment) {
        let tx = r * Math.cos(i);
        let ty = r * Math.sin(i);

        let bx = r * Math.cos(i);
        let by = -r * Math.sin(i);

        const line = new Line(bx + cx, by + cy, tx + cx, ty + cy);
        line.draw();
        setGame.canvas.appendChild(line.svg);
    }

    setGame.canvas.appendChild(circle.svg);

    // tests for shaded rectangle
    let x = 300;
    let y = 100;
    let w = 50;

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const rectangle = new Rectangle(x, y, w, w);
    rectangle.draw();
    group.appendChild(rectangle.svg);

    for (let i = 0.1; i < 1; i += 0.1) {
        let xl = lerp(x, x + w, i);
        const line = new Line(xl, y, xl, y + w);
        line.draw();
        group.appendChild(line.svg);
    }

    setGame.canvas.appendChild(group);
});

class SetGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;

        this.deckSize = 9;
        this.deck = {};
        this.drawn = {};

        this.match = [];
        this.cardTable = [];
    }

    create() {
        this.createDeck();
    }

    createDeck() {
        // for (let i = 0; i < this.deckSize; i++) {
        //     console.log(i);
        // }
    }

    shuffleDeck() {}
}

class SetCard {
    constructor(x, y, w, h, props) {
        this.id = props.join("");
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.w_c = this.x + this.w / 2;
        this.color = props[0];
        this.shading = props[1];
        this.shape = props[2];
        this.count = props[3] + 1;
        this.colors = ["red", "green", "blue"];
        this.dealt = false;
        this.selected = false;

        this.svg = null;
    }

    create() {
        // draw card border
        console.log("creating card:", this.id);
        const outline = new Rectangle(this.x, this.y, this.w, this.h);
        outline.draw();

        // Break up the height into d equal divisons.
        // This makes placing the symbols evenly distrubuted.
        let divisions = this.h / (this.count + 1);

        for (let i = 0; i < this.count; i++) {
            let symbolY = this.y + divisions * (i + 1);

            switch (this.shape) {
                case 0:
                    // Create triangle base and height
                    let t_b = this.w * 0.125;
                    let t_h = this.w * 0.125;
                    this.createTriangle(
                        this.w_c,
                        symbolY,
                        t_b,
                        t_h,
                        this.colors[this.color],
                        this.shading
                    );
                    break;
                case 1:
                    let s_w = this.w * 0.25;
                    let s_offset = s_w / 2;
                    let s_x = this.w_c - s_offset;
                    let s_y = symbolY - s_offset;
                    this.createSquare(
                        s_x,
                        s_y,
                        s_w,
                        s_w,
                        this.colors[this.color],
                        this.shading
                    );
                    break;
                case 2:
                    let diameter = this.w * 0.25;
                    this.createCircle(
                        this.w_c,
                        symbolY,
                        diameter,
                        this.colors[this.color],
                        this.shading
                    );
                    break;

                default:
                    break;
            }
        }
    }

    createTriangle(x, y, b, h, color, shading) {
        switch (shading) {
            case 0:
                noFill();
                break;
            case 1:
                noFill();
                strokeWeight(1);
                for (let i = 0.2; i <= 1; i += 0.2) {
                    let x1 = lerp(x - b, x, i);
                    let y1 = lerp(y + h, y - h, i);

                    let x2 = lerp(x, x + h, i);
                    let y2 = lerp(y - h, y + h, i);

                    line(x1, y1, x1, y + h);
                    line(x2, y2, x2, y + h);
                }
                break;
            case 2:
                fill(color);
                break;
            default:
                break;
        }

        stroke(color);
        strokeWeight(2);
        triangle(x - b, y + h, x, y - h, x + b, y + h);
    }

    createSquare(x, y, w, h, color, shading) {
        switch (shading) {
            case 0:
                noFill();
                break;
            case 1:
                noFill();
                strokeWeight(1);
                for (let i = 0; i < 1; i += 0.15) {
                    let x1 = lerp(x, x + w, i);
                    line(x1, y, x1, y + h);
                }
                break;
            case 2:
                fill(color);
                break;
            default:
                break;
        }

        stroke(color);
        strokeWeight(2);
        rect(x, y, w, h);
    }

    createCircle(x, y, d, color, shading) {
        translate(x, y);
        let radius = d / 2;

        switch (shading) {
            case 0:
                noFill();
                break;
            case 1:
                let start = PI + PI / 9;
                let stop = TWO_PI - PI / 9;
                let increment = PI / (d * 0.3);
                noFill();
                strokeWeight(1);
                for (let i = start; i <= stop; i += increment) {
                    let tx = radius * cos(i);
                    let ty = radius * sin(i);
                    let bx = radius * cos(i);
                    let by = -radius * sin(i);
                    line(tx, ty, bx, by);
                }
                break;
            case 2:
                fill(color);
                break;
            default:
                break;
        }

        translate(-x, -y);
        stroke(color);
        strokeWeight(2);
        ellipse(x, y, d, d);
    }

    update() {
        switch (this.hover()) {
            case true:
                stroke("green");
                strokeWeight(4);
                rect(this.x, this.y, this.w, this.h, 10);
                break;

            case false:
                stroke("black");
                strokeWeight(4);
                rect(this.x, this.y, this.w, this.h, 10);
                break;

            default:
                break;
        }

        switch (this.pressed()) {
            case true:
                stroke("green");
                strokeWeight(4);
                rect(this.x, this.y, this.w, this.h, 10);
                break;

            case false:
                stroke("black");
                strokeWeight(4);
                rect(this.x, this.y, this.w, this.h, 10);
                break;

            default:
                break;
        }
    }

    hover() {
        if (
            mouseX > this.x &&
            mouseX < this.x + this.w &&
            mouseY > this.y &&
            mouseY < this.y + this.h
        ) {
            return true;
        } else {
            return false;
        }
    }

    pressed() {
        if (this.hover()) {
        }
    }

    released() {
        this.color = color(0, 0, 200);
        this.active = false;
        this.dragging = false;
    }
}
