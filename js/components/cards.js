/**

Creates a card based on array of cards json

Structure:

<div class="project-card">
    <div class="card-image">
        <img src="/card/image/url"/>
    </div>
    <div class="card-name">
        <p>Card Name</p>
    </div>
</div>

*/

function addCards(cards, parentId, clickHandler) {
    const parentDiv = document.getElementById(parentId);
    clearDiv(parentDiv);

    // const cardsContainer = document.createElement("div");
    // cardsContainer.classList = "cards-container";

    cards.forEach((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList = "project-card";

        const cardImageDiv = document.createElement("div");
        cardImageDiv.classList = "card-image";
        cardImageDiv.onclick = (event) => {
            event.preventDefault();
            clickHandler(card);
        };

        const cardImage = document.createElement("img");
        cardImage.src = card.photos[0];

        const cardNameDiv = document.createElement("div");
        cardNameDiv.classList = "card-name";

        const cardName = document.createElement("p");
        // cardName.classList = "card-name";
        cardName.textContent = card.name;

        // const cardShort = document.createElement("h3");
        // cardShort.classList = "card-short";
        // cardShort.textContent = card.short;
        // cardDiv.appendChild(cardShort);

        cardImageDiv.appendChild(cardImage);
        cardDiv.appendChild(cardImageDiv);
        cardNameDiv.appendChild(cardName);
        cardDiv.appendChild(cardNameDiv);
        parentDiv.appendChild(cardDiv);
    });

    // parentDiv.appendChild(cardsContainer);
}
