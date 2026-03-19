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
    }

    create() {
        // draw card border
        console.log("creating card:", this.id);
        stroke(0);
        strokeWeight(4);
        fill("white");
        rect(this.x, this.y, this.w, this.h, 10);

        // rect.addClass("rectangle");

        // draw card symbols
        // generate points to place symbols.
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
