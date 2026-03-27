// const PHOTOS_URL =
// "https://raw.githubusercontent.com/intern-jck/site-html/site-dev/assets/data/photos.json";

const PHOTOS_URL = "../../../assets/data/photos.json";

window.addEventListener(
    "load",
    function (event) {
        getPhotos();
    },
    false
);

const getPhotos = () => {
    fetch(PHOTOS_URL)
        .then((response) => response.json())
        .then((data) => {
            addPhotos(data);
        })
        .catch((error) => console.log("fetching photos url", error));
};

const addPhotos = (photos) => {
    // Get div from photos page
    const photosDiv = document.getElementById("photos-container");

    // TODO: Refactor to use pagination
    photos.forEach((photoUrl, i) => {
        // Create img container
        const imgButton = document.createElement("button");
        const imgDiv = document.createElement("div");

        imgButton.classList = "photo-button";
        imgDiv.classList = "photos-img";

        // Create img
        const img = new Image();

        // checkImageUrl(photoUrl).then((image) => {
        //     if (image) {
        //         console.log(image);
        //     } else {
        //         console.log("no image found");
        //     }
        // });

        // fetch(photoUrl)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log("found photo");
        //     })
        //     .catch((error) => console.log("error fetching photo", error));

        img.src = photoUrl;
        img.loading = "lazy";
        img.alt = "...";

        // // Add img container to page
        imgDiv.appendChild(img);
        imgButton.appendChild(imgDiv);
        photosDiv.appendChild(imgButton);
    });
};

const enlargePhoto = (photoUrl) => {
    // get modal element
    // change display to flex
    // create img div and img
    // set img attributes
    // add img to modal element
    const closeButton = document.createElement("button");
    closeButton.textContent = "x";

    const photoModal = document.createElement("div");
    photoModal.classList = "photo-modal";

    const modalImgDiv = document.createElement("div");
    modalImgDiv.classList = "photo-modal-img-div";

    const modalImg = document.createElement("img");
    modalImg.classList = "photo-modal-img";

    modalImg.src = photoUrl;
    modalImg.alt = "...";

    modalImgDiv.append(modalImg);
    photoModal.append(modalImgDiv);
};

function checkImageUrl(url) {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => resolve(true); // Image loaded successfully
        img.onerror = () => resolve(false); // Image failed to load

        img.src = url;
    });
}
