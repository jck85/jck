const CARD_WIDTH = 100;
const CARD_HEIGHT = 150;
let setGame = null;

/*
    props   |   0      |   1    |   2    |
    count   |   1      |   2    |   3    |
    shape   | triangle | square | circle |
    shading | none     | shaded | fill   |
    color   | red      | green  | blue   |
*/

// props = [count, shape, shading, color]

window.addEventListener("load", () => {
    setGame = new SetGame("set-canvas");
    setGame.createGame();

    // Add button events
});

class SetGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);

        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;

        this.deckSize = 9;
        this.deck = [];
        this.drawn = {};

        this.match = [];
        this.cardTable = [];
    }

    createGame() {
        this.createDeck();
    }

    createDeck() {
        for (let i = 0; i < this.deckSize; i++) {
            let cardVal = ternary(i);
            let cardProps = {
                val: cardVal,
                id: "card-" + i,
            };
            let card = new SetCard(
                10 + (CARD_WIDTH + 10) * i,
                10,
                CARD_WIDTH,
                CARD_HEIGHT,
                cardVal
            );
            card.create();
            this.canvas.appendChild(card.card);
        }
    }

    shuffleDeck() {}

    deal() {}
}

class SetCard {
    constructor(x, y, w, h, props) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.centerX = this.x + this.w / 2;
        this.centerY = this.y + this.h / 2;
        this.colors = ["red", "green", "blue"];
        this.props = props;
        this.id = props.join("");
        this.count = props[0];
        this.shape = props[1];
        this.shading = props[2];
        this.color = this.colors[props[3]];
        this.card = null;
    }

    create() {
        // Create card border.
        const group = new Group();
        const cardBorder = new Rectangle(this.x, this.y, this.w, this.h);
        group.add(cardBorder.svg);

        // Divide card into horizontal segments to place symbols.
        // Count the top and bottom of card as segments,
        // along with the amount needed for each symbol.
        let divisions = this.h / (this.count + 2);

        // Place symbols based on count.
        // Add 1 to count to normalize to actual amounts.
        for (let i = 1; i <= this.count + 1; i++) {
            // Symbol is placed at ith division, offset by card position
            let yPos = this.y + divisions * i;

            // Create shapes and add to group.
            switch (this.shape) {
                // Triangle
                case 0:
                    const base = this.w * 0.125;
                    const height = this.w * 0.125;
                    const triangle = this.createTriangle(
                        this.centerX,
                        yPos,
                        base,
                        height,
                        this.color,
                        this.shading
                    );
                    group.add(triangle);
                    break;

                // Square
                case 1:
                    const width = this.w * 0.25;

                    const square = this.createSquare(
                        this.centerX - width / 2,
                        yPos - width / 2,
                        width,
                        width,
                        this.color,
                        this.shading
                    );
                    group.add(square);
                    break;

                // Circle
                case 2:
                    const circle = this.createCircle(
                        this.centerX,
                        yPos,
                        this.w * 0.15,
                        this.color,
                        this.shading
                    );
                    group.add(circle);
                    break;

                default:
                    break;
            }
        }

        // Add group to card.
        this.card = group.group;
    }

    // Methods to create symbols.
    // Each follow same pattern.
    // Create group for shape and lines svgs.
    // Add stroke color based on stroke.
    // Add shading.
    // Add svgs to group.
    // Return group.

    // Creates isosceles triangles.
    createTriangle(x, y, b, h, color, shading) {
        const group = new Group();

        let x1 = x - b;
        let y1 = y + h;
        let x2 = x;
        let y2 = y - h;
        let x3 = x + b;
        let y3 = y + h;
        const triangle = new Triangle(x1, y1, x2, y2, x3, y3);
        triangle.stroke(color);

        switch (shading) {
            // none
            case 0:
                triangle.fill("none");
                break;

            // shaded
            case 1:
                triangle.fill("none");

                for (let i = 0.2; i < 1; i += 0.2) {
                    let xa = lerp(x1, x2, i);
                    let ya = lerp(y1, y2, i);
                    let xb = lerp(x2, x3, i);
                    let yb = lerp(y2, y3, i);

                    const lineA = new Line(xa, ya, xa, y1);
                    const lineB = new Line(xb, yb, xb, y3);
                    lineA.stroke(color);
                    lineB.stroke(color);

                    group.add(lineA.svg);
                    group.add(lineB.svg);
                }

                const lineC = new Line(x2, y2, x2, y1);
                lineC.stroke(color);
                group.add(lineC.svg);
                break;

            // fill
            case 2:
                triangle.fill(color);
                break;

            default:
                break;
        }

        group.add(triangle.svg);
        return group.group;
    }

    createSquare(x, y, w, h, color, shading) {
        const group = new Group();
        const rectangle = new Rectangle(x, y, w, h);
        rectangle.stroke(color);

        switch (shading) {
            // none
            case 0:
                rectangle.fill("none");
                break;

            // shaded
            case 1:
                rectangle.fill("none");
                for (let i = 0.1; i < 1; i += 0.1) {
                    let xl = lerp(x, x + w, i);
                    const line = new Line(xl, y, xl, y + w);
                    line.stroke(color);
                    group.add(line.svg);
                }
                break;

            //fill
            case 2:
                rectangle.fill(color);
                break;

            default:
                break;
        }

        group.add(rectangle.svg);
        return group.group;
    }

    createCircle(x, y, r, color, shading) {
        const group = new Group();
        const circle = new Circle(x, y, r);
        circle.stroke(color);

        switch (shading) {
            // none
            case 0:
                circle.fill("none");
                break;

            // shaded
            case 1:
                circle.fill("none");

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

                    const line = new Line(bx + x, by + y, tx + x, ty + y);
                    line.stroke(color);
                    group.add(line.svg);
                }

                break;

            // fill
            case 2:
                circle.fill(color);
                break;

            default:
                break;
        }

        group.add(circle.svg);
        return group.group;
    }
}

/*
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

*/
