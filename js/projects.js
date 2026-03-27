const PROJECTS_URL = "../../../assets/data/all_projects.json";

// Helper function to clear all child elements from a parent div.
const clearDiv = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

const addBackButton = (parentDiv) => {
    const backButton = document.createElement("button");
    const backButtonIcon = document.createElement("i");
    backButtonIcon.classList = "fa-solid fa-arrow-left";
    // backButton.textContent = "BACK";
    backButton.append(backButtonIcon);

    backButton.setAttribute("id", "back-button");
    backButton.classList = "back-button";

    backButton.onclick = (event) => {
        getProjects();
    };

    parentDiv.appendChild(backButton);
};

const removeBackButton = () => {
    if (document.getElementById("back-button")) {
        document.getElementById("back-button").remove();
    }
};

const getProjects = () => {
    fetch(PROJECTS_URL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            removeBackButton();
            addCards(data, "projects-content", showProject);
        })
        .catch((error) => console.log("fetching projects url", error));
};

const showProject = (project) => {
    const projectsContent = document.getElementById("projects-content");
    const projectsHeader = document.getElementById("projects-header");
    const projectDiv = document.createElement("div");
    projectDiv.classList = "project-div";

    clearDiv(projectsContent);
    addBackButton(projectsHeader);

    // components/carousel.js
    addCarousel(project.photos, projectDiv);

    // components/info.js
    addInfo(project, projectDiv, "project");

    projectsContent.appendChild(projectDiv);
};

window.addEventListener(
    "load",
    function (event) {
        getProjects();
    },
    false
);
