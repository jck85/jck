// window.addEventListener("load", function () {
//     console.log("Page fully loaded!");
// });

class Card {
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

let props1 = [0, 2, 0, 0];
let card1 = null;

let props2 = [1, 1, 0, 1];
let card2 = null;

let props3 = [2, 0, 1, 2];
let card3 = null;

function setup() {
    let c = document.getElementById("set");
    width = c.clientWidth;
    height = c.clientHeight;

    const canvas = createCanvas(width, height, SVG);
    canvas.parent("set");
    frameRate(60);
    clear();

    card1 = new Card(50, 50, 140, 200, props1);
    card1.create();

    card2 = new Card(200, 50, 140, 200, props2);
    card2.create();

    card3 = new Card(350, 50, 140, 200, props3);
    card3.create();
}

function draw() {
    // card3.hover();
    // card3.update();
}

/**
Junkyard

function createCard() {
    // card position and dimensions
    let x = 100;
    let y = 100;
    let w = 140;
    let h = 200;

    // card center width
    let w_c = x + w / 2;

    // card properties
    let shape = "square";
    let count = 3;
    let color = "red";
    let shading = "shaded";

    // draw card
    strokeWeight(2);
    rect(x, y, w, h, 10);

    // draw card symbols
    // generate points to place symbols.
    // Break up the height into d equal divisons.
    // This makes placing the symbols evenly distrubuted.
    let divisions = h / (count + 1);

    for (let i = 0; i < count; i++) {
        let symbolY = y + divisions * (i + 1);

        switch (shape) {
            case "triangle":
                let t_b = w * 0.125;
                let t_h = w * 0.125;
                createTriangle(w_c, symbolY, t_b, t_h, color, shading);
                break;
            case "square":
                let s_w = w * 0.25;
                let s_offset = s_w / 2;
                let s_x = w_c - s_offset;
                let s_y = symbolY - s_offset;
                createSquare(s_x, s_y, s_w, s_w, color, shading);
                break;
            case "circle":
                let diameter = w * 0.25;
                createCircle(w_c, symbolY, diameter, color, shading);
                break;

            default:
                break;
        }
    }
}

function createCircle(x, y, d, color, shading) {
    translate(x, y);
    let radius = d / 2;

    strokeWeight(2);
    stroke(color);

    switch (shading) {
        case "none":
            noFill();
            break;
        case "shaded":
            let start = PI + PI / 9;
            let stop = TWO_PI - PI / 9;
            let increment = PI / (d * 0.3);
            noFill();
            for (let i = start; i <= stop; i += increment) {
                let tx = radius * cos(i);
                let ty = radius * sin(i);
                let bx = radius * cos(i);
                let by = -radius * sin(i);
                strokeWeight(1);
                line(tx, ty, bx, by);
            }
            break;
        case "full":
            fill("red");
            break;
        default:
            break;
    }

    translate(-x, -y);
    ellipse(x, y, d, d);
}

function createTriangle(x, y, b, h, color, shading) {
    stroke(color);
    strokeWeight(2);

    switch (shading) {
        case "none":
            noFill();
            break;
        case "shaded":
            noFill();
            for (let i = 0.2; i <= 1; i += 0.2) {
                let x1 = lerp(x - b, x, i);
                let y1 = lerp(y + h, y - h, i);

                let x2 = lerp(x, x + h, i);
                let y2 = lerp(y - h, y + h, i);

                strokeWeight(1);
                line(x1, y1, x1, y + h);
                line(x2, y2, x2, y + h);
            }
            break;
        case "full":
            fill("red");
            break;
        default:
            break;
    }

    strokeWeight(2);
    triangle(x - b, y + h, x, y - h, x + b, y + h);
}

function createSquare(x, y, w, h, color, shading) {
    stroke(color);
    strokeWeight(2);

    switch (shading) {
        case "none":
            noFill();
            break;
        case "shaded":
            noFill();
            strokeWeight(1);
            for (let i = 0; i < 1; i += 0.15) {
                let x1 = lerp(x, x + w, i);
                line(x1, y, x1, y + h);
            }
            break;
        case "full":
            fill("red");
            break;
        default:
            break;
    }

    strokeWeight(2);
    rect(x, y, w, h);
}

function drawSquiggle() {

    let x = 50;
    let y = 50;
    let w = 100;
    let h = 100;

    noFill();
    stroke(0);
    strokeWeight(4);

    // Draw the top curve
    let topX1 = x;
    let topY1 = y + 40;

    let topX2 = x - 25;
    let topY2 = y - 50;

    let topX3 = x + 75;
    let topY3 = y + 25;

    let topX4 = x + w;
    let topY4 = y - 25;

    bezier(topX1, topY1, topX2, topY2, topX3, topY3, topX4, topY4);

    // Draw the bottom curve
    let bottomX1 = x;
    let bottomY1 = y + 40;

    let bottomX2 = x + 33;
    let bottomY2 = y + 10;

    let bottomX3 = x + 125;
    let bottomY3 = y + 75;

    let bottomX4 = x + w;
    let bottomY4 = y - 25;

    bezier(bottomX1, bottomY1, bottomX2, bottomY2, bottomX3, bottomY3, bottomX4, bottomY4);

    // Draw points along the curve
    stroke("red")
    strokeWeight(6);

    // for (let t = 0; t <= 1; t += 0.1) {
    //     // Draw top points
    //     strokeWeight(6);
    //     let tx = bezierPoint(topX1, topX2, topX3, topX4, t);
    //     let ty = bezierPoint(topY1, topY2, topY3, topY4, t);
    //     point(tx, ty);

    //     // Draw bottoms points
    //     let bx = bezierPoint(bottomX1, bottomX2, bottomX3, bottomX4, t);
    //     let by = bezierPoint(bottomY1, bottomY2, bottomY3, bottomY4, t);
    //     point(bx, by);

    //     // Draw a line connecting points
    //     strokeWeight(2)
    //     line(tx, ty, bx, by)
    // }

    // first point
    strokeWeight(6);
    let tx1 = bezierPoint(topX1, topX2, topX3, topX4, 0.33);
    let ty1 = bezierPoint(topY1, topY2, topY3, topY4, 0.33);
    point(tx1, ty1);

    // Draw bottoms points
    let bx1 = bezierPoint(bottomX1, bottomX2, bottomX3, bottomX4, 0.1);
    let by1 = bezierPoint(bottomY1, bottomY2, bottomY3, bottomY4, 0.1);
    point(bx1, by1);

    // Draw a line connecting points
    strokeWeight(2)
    line(tx1, ty1, bx1, by1)

    // second point
    strokeWeight(6);
    let tx2 = bezierPoint(topX1, topX2, topX3, topX4, 0.44);
    let ty2 = bezierPoint(topY1, topY2, topY3, topY4, 0.44);
    point(tx2, ty2);

    // Draw bottoms points
    let bx2 = bezierPoint(bottomX1, bottomX2, bottomX3, bottomX4, 0.2);
    let by2 = bezierPoint(bottomY1, bottomY2, bottomY3, bottomY4, 0.2);
    point(bx2, by2);

    // Draw a line connecting points
    strokeWeight(2)
    line(tx2, ty2, bx2, by2)

    // third point
    strokeWeight(6);
    let tx3 = bezierPoint(topX1, topX2, topX3, topX4, 0.55);
    let ty3 = bezierPoint(topY1, topY2, topY3, topY4, 0.55);
    point(tx3, ty3);

    // Draw bottoms points
    let bx3 = bezierPoint(bottomX1, bottomX2, bottomX3, bottomX4, 0.3);
    let by3 = bezierPoint(bottomY1, bottomY2, bottomY3, bottomY4, 0.3);
    point(bx3, by3);

    // Draw a line connecting points
    strokeWeight(2)
    line(tx3, ty3, bx3, by3)

    // fourth point
    strokeWeight(6);
    let tx4 = bezierPoint(topX1, topX2, topX3, topX4, 0.65);
    let ty4 = bezierPoint(topY1, topY2, topY3, topY4, 0.65);
    point(tx4, ty4);

    // Draw bottoms points
    let bx4 = bezierPoint(bottomX1, bottomX2, bottomX3, bottomX4, 0.4);
    let by4 = bezierPoint(bottomY1, bottomY2, bottomY3, bottomY4, 0.4);
    point(bx4, by4);

    // Draw a line connecting points
    strokeWeight(2)
    line(tx4, ty4, bx4, by4)

    // fifth point
    strokeWeight(6);
    let tx5 = bezierPoint(topX1, topX2, topX3, topX4, 0.75);
    let ty5 = bezierPoint(topY1, topY2, topY3, topY4, 0.75);
    point(tx5, ty5);

    // Draw bottoms points
    let bx5 = bezierPoint(bottomX1, bottomX2, bottomX3, bottomX4, 0.5);
    let by5 = bezierPoint(bottomY1, bottomY2, bottomY3, bottomY4, 0.5);
    point(bx5, by5);

    // Draw a line connecting points
    strokeWeight(2)
    line(tx5, ty5, bx5, by5)

    // sixth point
    strokeWeight(6);
    let tx6 = bezierPoint(topX1, topX2, topX3, topX4, 0.85);
    let ty6 = bezierPoint(topY1, topY2, topY3, topY4, 0.85);
    point(tx6, ty6);

    // Draw bottoms points
    let bx6 = bezierPoint(bottomX1, bottomX2, bottomX3, bottomX4, 0.6);
    let by6 = bezierPoint(bottomY1, bottomY2, bottomY3, bottomY4, 0.6);
    point(bx6, by6);

    // Draw a line connecting points
    strokeWeight(2)
    line(tx6, ty6, bx6, by6)

}
    
class Game {
    constructor() {
        this.deckSize = 81;
        this.match = [];
        this.deck = {};
        this.cardTable = [];
        this.easyModeOn = false;
        this.cardsLeft = [];
        this.hintFound = false;
        this.hintSet = [];
        // this.newGame();
    }

    updateScoreboard() {
        const cardsLeftElement = document.getElementById('cards-left')
        cardsLeftElement.innerHTML = this.cardsLeft.length;
    }

    easyMode() {
        this.easyModeOn = !this.easyModeOn;
        if (this.easyModeOn) {
            let btnClassList = document.getElementById("easy-btn").classList;
            btnClassList.add("easy-on");
            this.newGame();
        } else {
            let btnClassList = document.getElementById("easy-btn").classList;
            if (btnClassList.contains("easy-on")) {
                btnClassList.remove("easy-on");
            }
            this.newGame();
        }
    }

    createDeck() {
        for (let i = 0; i < this.deckSize; i++) {

            let cardId = "card-" + i;
            let imgPath = "../assets/set-cards/card-" + i + ".png";

            let cardImage = document.createElement("img");
            cardImage.setAttribute("id", cardId);
            cardImage.setAttribute("src", imgPath);
            cardImage.classList.add("card-image");
            cardImage.setAttribute("onclick", "cardClicked(this.id)");

            let cardVal = this.ternary(i);
            this.deck[cardId] = {
                "cell": null,
                "click": false,
                "drawn": false,
                "id": cardId,
                "img": cardImage,
                "num": i,
                "val": cardVal,
            }
            this.cardsLeft.push(cardId);
        }
    }

    clearDeck() {
        for (let card in this.deck) {
            delete this.deck[card];
        }
        this.cardsLeft = [];
    }

    newGame() {
        // Clear table if there are cards
        if (this.cardTable.length > 0) {
            for (let card in this.cardTable) {
                if (this.cardTable[card] != null) {
                    let cellToClear = this.deck[this.cardTable[card]].cell
                    this.clearCard(cellToClear);
                }
            }
        }

        // Reset
        this.clearDeck();
        this.createDeck();
        this.hintFound = false;

        if (this.easyModeOn === false) {
            this.cardsLeft = this.shuffle(this.cardsLeft);
        }

        // Draw 12 cards
        for (let i = 0; i < 12; i++) {
            let cellId = "cell-" + i;
            this.drawCard(cellId);
        }

        this.updateScoreboard(0);
    }

    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let randNum = Math.floor(Math.random() * (i + 1));
            let temp = arr[i];
            arr[i] = arr[randNum];
            arr[randNum] = temp;
        }
        return arr;
    }

    getCellNum(cellId) {
        let cellNum = cellId.split("-")[1];
        return cellNum;
    }

    drawCard(cellId) {
        if (this.cardsLeft.length == 0) {
            return false;
        }
        // Draw card from 'top' of deck
        let cardId = this.cardsLeft.shift();
        let card = this.deck[cardId];
        // Update card cell
        card.cell = cellId;
        card.drawn = true;
        // Add to DOM
        document.getElementById(cellId).appendChild(card.img);
        // Update reference array
        this.cardTable[this.getCellNum(cellId)] = cardId;
        this.updateScoreboard();
    }

    drawThree() {
        this.drawCard("cell-12");
        this.drawCard("cell-13");
        this.drawCard("cell-14");
    }

    clearCard(cellId) {
        this.cardTable[this.getCellNum(cellId)] = null;
        let cellNode = document.getElementById(cellId);

        let nodeLength = cellNode.childNodes.length;
        if (nodeLength > 1) {
            let cellImgs = cellNode.getElementsByTagName('img');
            cellImgs.classList = [];
            cellNode.removeChild(cellImgs[0]);
        }
    }

    cardClicked(cardId) {
        let card = this.deck[cardId];
        let cardClassList = document.getElementById(cardId).classList;
        card.click = !card.click;
        switch (card.click) {
            case true:
                if (this.match.length < 3) {
                    if (cardClassList.contains("card-clicked") === false) {
                        cardClassList.add("card-clicked");
                    }
                    this.match.push(card);
                }
                break;

            case false:
                if (cardClassList.contains("card-clicked")) {
                    cardClassList.remove("card-clicked");
                }
                if (this.match.includes(card) == true) {
                    let cardNumIndex = this.match.indexOf(card);
                    this.match.splice(cardNumIndex, 1);
                }
                break;
        }
    }

    sortCards() {

        let cardsOnTable = [];

        // Get the cards on the table
        for (let i in this.cardTable) {
            if (this.cardTable[i] != null) {
                cardsOnTable.push(this.cardTable[i])
                this.cardTable[i] = null;
            }
        }
        // Place them all back starting at the first cell
        for (let i in this.cardTable) {
            if (cardsOnTable.length > 0) {
                let cardToPlace = cardsOnTable.shift();
                this.cardTable[i] = cardToPlace;
                // this.clearCard(this.deck[cardToPlace].cell);
                this.deck[cardToPlace].cell = "cell-" + i;
                document.getElementById("cell-" + i).appendChild(this.deck[cardToPlace].img);

            } else {
                this.cardTable[i] = null;
            }
        }

    }

    checkMatch() {

        if (this.match.length === 3) {

            // Get cards
            let card1 = this.match[0];
            let card2 = this.match[1];
            let card3 = this.match[2];

            // Get vals
            let card1Val = card1.val;
            let card2Val = card2.val;
            let card3Val = card3.val;

            // Check vals
            let isMatch = [];
            for (let i = 0; i < 4; i++) {
                let vals = [card1Val[i], card2Val[i], card3Val[i]];
                isMatch.push(this.allEqual(vals) || this.allDifferent(vals))
            }

            // If a match
            if (isMatch.every(val => val === true)) {

                // Take cards off table
                this.clearCard(card1.cell);
                this.clearCard(card2.cell);
                this.clearCard(card3.cell);

                // Sort cards on table
                this.sortCards();

                // Draw Cards
                for (let cell in this.cardTable) {
                    if (this.cardTable[cell] === null && cell < 12) {
                        this.drawCard("cell-" + cell);
                    }
                }

                // Update score
                this.updateScoreboard();
                this.match = [];
                this.hintFound = false;

                this.checkWinner();
                return true;
            }
            else {
                alert("Not a match!")
                return false;
            }
        }
        else {
            alert("Need more cards!")
            return false;
        }
    }

    allEqual(arr) {
        if (arr[0] === arr[1] && arr[1] === arr[2]) {
            return true;
        } else {
            return false;
        }
    }

    allDifferent(arr) {
        if (arr[0] != arr[1] &&
            arr[1] != arr[2] &&
            arr[2] != arr[0]) {
            return true;
        } else {
            return false;
        }
    }

    getHint() {

        if (this.hintFound === false) {

            // Check for hint

            let cardsOnTable = [];

            for (let card in this.cardTable) {
                if (this.cardTable[card] != null) {
                    cardsOnTable.push(this.cardTable[card]);
                }
            }

            for (let i = 0; i < cardsOnTable.length; i++) {
                for (let j = i + 1; j < cardsOnTable.length; j++) {
                    for (let k = j + 1; k < cardsOnTable.length; k++) {

                        // Get cards
                        let card1 = cardsOnTable[i];
                        let card2 = cardsOnTable[j];
                        let card3 = cardsOnTable[k];

                        // Get vals
                        let card1Val = this.deck[card1].val;
                        let card2Val = this.deck[card2].val;
                        let card3Val = this.deck[card3].val;

                        // Check vals
                        let isMatch = [];

                        for (let i = 0; i < 4; i++) {
                            let vals = [card1Val[i], card2Val[i], card3Val[i]];
                            isMatch.push(this.allEqual(vals) || this.allDifferent(vals))
                        }

                        // If a match
                        if (isMatch.every(val => val === true)) {

                            let card1ClassList = document.getElementById(card1).classList;
                            let card2ClassList = document.getElementById(card2).classList;
                            let card3ClassList = document.getElementById(card3).classList;

                            // Only add the class once
                            if (card1ClassList.contains("card-hint") == false) {
                                card1ClassList.add("card-hint")
                            }
                            if (card2ClassList.contains("card-hint") == false) {
                                card2ClassList.add("card-hint")
                            }
                            if (card3ClassList.contains("card-hint") == false) {
                                card3ClassList.add("card-hint")
                            }

                            this.hintFound = true;
                            return true;
                        }
                    }
                }
            }
        } else {
            alert("Only one hint at a time!")
        }
    }

    checkWinner() {
        if (this.cardsLeft.length === 0 && this.cardTable.some(card => card != null)) {
            console.log("Keep going!");
        } else if (this.cardsLeft.length === 0 && this.cardTable.every(card => card === null)) {
            alert("Winner!");
            this.newGame();
        }
    }

    //Converts a deciaml number 0-80 to an 4 element array representing its ternary value
    ternary(num) {

        let ternaryNum = [];

        //trivial case
        if (num === 0) {
            ternaryNum.unshift(0);
            ternaryNum.unshift(0);
            ternaryNum.unshift(0);
            ternaryNum.unshift(0);
            return ternaryNum;
        }

        while (num > 0) {
            let remainder = num % 3;
            num = parseInt(num / 3);
            ternaryNum.unshift(remainder);
        }

        if (ternaryNum.length === 1) {
            ternaryNum.unshift(0);
            ternaryNum.unshift(0);
            ternaryNum.unshift(0);
            return ternaryNum;
        } else if (ternaryNum.length === 2) {
            ternaryNum.unshift(0);
            ternaryNum.unshift(0);
            return ternaryNum;
        } else if (ternaryNum.length === 3) {
            ternaryNum.unshift(0);
            return ternaryNum;
        } else if (ternaryNum.length === 4) {
            return ternaryNum;
        }

    }

}

let myGame = new Game();

function newGame() {
    myGame.newGame();
}

function cardClicked(cardId) {
    myGame.cardClicked(cardId);
}

function checkMatch() {
    myGame.checkMatch();
}

function drawThree() {
    myGame.drawThree();
}

function getHint() {
    myGame.getHint();
}

function easyMode() {
    myGame.easyMode();
}

// Show/Close Rules Overlay
function showRules() {
    document.getElementById("rules").style.height = "100%";
}

function closeRules() {
    document.getElementById("rules").style.height = "0%";
}



    // one symbol
    // stroke("red");
    // let d1 = h / 2;
    // let p1 = y + d1;
    // point(w_c, p1);

    // // two symbol
    // stroke("blue");
    // let d2 = h / 3;
    // let p2a = y + (d2 * 1);
    // let p2b = y + (d2 * 2);
    // point(w_c, p2a);
    // point(w_c, p2b);

    // // three symbols
    // stroke("orange");
    // let d3 = h / 4;
    // let p3a = y + (d3 * 1);
    // let p3b = y + (d3 * 2);
    // let p3c = y + (d3 * 3);
    // point(w_c, p3a);
    // point(w_c + 5, p3b);
    // point(w_c, p3c);


    // divisions
    // point heights
    // let p1 = y + (d * 1);
    // let p3 = y + (d * 2);
    // let p5 = y + (d * 3);

    // let p2 = y + (d2 * 2);
    // let p4 = y + (d2 * 4);

    // stroke(0)
    // strokeWeight(6)
    // noFill()

    // point(w_c, p2);
    // point(w_c, p3);
    // // point(w_c, p4);
    // point(w_c, p5);

    // draw symbols
    // addCircles();
    // let c_d = w * 0.25;
    // ellipse(w_c, p1, c_d, c_d)
    // ellipse(w_c, p2, c_d, c_d)
    // ellipse(w_c, p3, c_d, c_d)
 */
