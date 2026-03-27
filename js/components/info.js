const MODELS_URL =
    "https://raw.githubusercontent.com/intern-jck/site-html/site-dev/assets/data/models.json";

const modelTypes = {
    general: {
        link: "",
        name: "",
        client: {
            name: "",
            url: "",
        },
        date: {
            start_month: "",
            start_year: "",
            end_month: "",
            end_year: "",
        },
        short: "",
        info: "",
        tech: [],
        photos: [],
        resources: [],
    },
    work: {
        name: "",
        client: {
            name: "",
            url: "",
        },
        date: {
            start_month: "",
            start_year: "",
            end_month: "",
            end_year: "",
        },
        short: "",
        info: "",
        tech: [],
        photos: [],
    },
    code: {
        name: "",
        url: "",
        date: {
            start_month: "",
            start_year: "",
            end_month: "",
            end_year: "",
        },
        short: "",
        info: "",
        tech: [],
        photos: [],
    },
    project: {
        name: "",
        url: "",
        date: {
            start_month: "",
            start_year: "",
            end_month: "",
            end_year: "",
        },
        short: "",
        info: "",
        tech: [],
        photos: [],
        resources: [],
    },
    music: {
        name: "",
        date: {
            start_month: "",
            start_year: "",
            end_month: "",
            end_year: "",
        },
        short: "",
        info: "",
        photos: [],
        resources: [],
    },
};

function getModelType(type) {
    // try {
    //   const response = fetch(MODELS_URL);
    //   const data = response.json();
    //   return data[type];
    // } catch (error) {
    //   console.error(error);
    //   return error;
    // }

    fetch(MODELS_URL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch();
}

function addInfo(info, parentDiv, modelType) {
    // console.log('adding info:', info, modelType)
    // Get the model for the info data
    // const model = getModelType(modelType);

    // const name, url = "";

    const model = modelTypes[modelType];
    // console.log(model)

    // Use it's keys to access the info items
    const keys = Object.keys(model);

    // Create the container to add all info components
    const infoContainer = document.createElement("div");
    infoContainer.classList = "info-container";

    keys.map((key, i) => {
        // Don't need photos in info
        if (key === "photos") {
            return;
        }

        const infoRow = document.createElement("div");
        infoRow.classList = "info-row";
        const infoKey = document.createElement("div");
        infoKey.classList = "info-key";
        const infoValue = document.createElement("div");
        infoValue.classList = "info-value";

        infoKey.textContent = `${key}: `;

        // Adjust format of elements based on info key
        switch (key) {
            case "url":
                const urlAnchor = document.createElement("a");
                urlAnchor.textContent = info[key];
                urlAnchor.href = info[key];
                urlAnchor.target = "_blank";
                infoValue.append(urlAnchor);
                break;

            case "client":
                const { name, url } = info[key];
                const clientAnchor = document.createElement("a");
                clientAnchor.href = url;
                clientAnchor.target = "_blank";
                clientAnchor.textContent = name;
                infoValue.append(clientAnchor);
                break;

            case "date":
                const { start_month, start_year, end_month, end_year } =
                    info[key];
                if (end_month && end_year) {
                    infoValue.textContent = `${start_month} ${start_year} - ${end_month} ${end_year}`;
                } else {
                    infoValue.textContent = `${start_month} ${start_year}`;
                }
                break;

            // TODO: Change this to use an array of objects instead of array of arrays
            case "tech":
                const techTagDiv = document.createElement("div");
                techTagDiv.classList = "tech-tag-div";
                info[key].map((value) => {
                    const tag = document.createElement("a");
                    tag.classList = "tech-tag";
                    tag.textContent = value[0];
                    tag.href = value[1];
                    tag.target = "_blank";
                    techTagDiv.append(tag);
                });
                infoValue.append(techTagDiv);
                break;

            case "resources":
                const resourceDiv = document.createElement("div");
                resourceDiv.classList = "resource-div";
                info[key].map((value) => {
                    // console.log(value)
                    const resource = document.createElement("a");
                    resource.classList = "resource";
                    resource.textContent = value.name;
                    resource.href = value.url;
                    resource.target = "_blank";
                    resourceDiv.append(resource);
                });
                // console.log(resourceDiv)
                infoValue.append(resourceDiv);
                break;

            // Otherwise just keep it simple
            default:
                infoValue.textContent = info[key];
                break;
        }

        infoRow.append(infoKey);
        infoRow.append(infoValue);
        infoContainer.append(infoRow);
    });

    parentDiv.appendChild(infoContainer);
}
