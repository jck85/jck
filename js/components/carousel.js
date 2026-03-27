function addCarousel(images, parentDiv) {
    console.log(parentDiv);
    let currentSlide = 0;

    // Container div for carousel slides and controls
    const carouselContainer = document.createElement("div");
    carouselContainer.classList = "carousel-container";

    // Create carousel images and add to slides
    const carouselSlides = document.createElement("div");
    carouselSlides.classList = "carousel-slides";
    const slides = [];

    for (let i in images) {
        const carouselImageContainer = document.createElement("div");
        const carouselImage = document.createElement("img");

        carouselImageContainer.classList = "carousel-img";
        carouselImage.src = images[i];

        carouselImageContainer.appendChild(carouselImage);
        carouselSlides.appendChild(carouselImageContainer);
        slides.push(carouselImageContainer);
    }

    // Create slide control buttons
    const carounselControls = document.createElement("div");
    carounselControls.classList = "carousel-controls";

    const leftButton = document.createElement("button");
    leftButton.classList = "carousel-left-button";

    const leftIcon = document.createElement("i");
    leftIcon.classList = "fa-solid fa-caret-left";
    leftButton.append(leftIcon);
    leftButton.onclick = (event) => {
        if (currentSlide > 0) {
            currentSlide -= 1;
        }
        showSlide(slides, currentSlide);
    };

    const rightButton = document.createElement("button");
    rightButton.classList = "carousel-right-button";
    const rightIcon = document.createElement("i");
    rightIcon.classList = "fa-solid fa-caret-right";
    rightButton.append(rightIcon);
    rightButton.onclick = (event) => {
        if (currentSlide < slides.length - 1) {
            currentSlide += 1;
        }
        showSlide(slides, currentSlide);
    };

    // Add everything
    carounselControls.appendChild(leftButton);
    carounselControls.appendChild(rightButton);
    carouselContainer.appendChild(carouselSlides);
    carouselContainer.appendChild(carounselControls);
    parentDiv.appendChild(carouselContainer);

    // Show the first slide
    showSlide(slides, currentSlide);
}

// For a given index, shift all the images left or right to show the slide at index.
const showSlide = (slides, index) => {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - index)}%)`;
    });
};
