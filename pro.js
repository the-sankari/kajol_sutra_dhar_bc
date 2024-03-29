class Project {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.imageSrc = data.imageSrc;
    this.description = data.description;
    this.buttons = data.buttons;
  }

  createProjectPreview() {
    const projectPreview = document.createElement("div");
    projectPreview.classList.add("project-preview");
    projectPreview.dataset.previewId = this.id;

    const projectPreviewImg = document.createElement("img");
    projectPreviewImg.src = this.imageSrc;
    projectPreviewImg.width = "50%";
    projectPreviewImg.classList.add("project-preview-img");
    projectPreviewImg.alt = `Project - ${this.title}`;

    const projectDetails = document.createElement("div");
    projectDetails.classList.add("project-details");

    const projectTitle = document.createElement("h3");
    projectTitle.classList.add("project-title");
    projectTitle.textContent = this.title;

    const projectDesc = document.createElement("p");
    projectDesc.classList.add("projects-desc");
    projectDesc.textContent = this.description;

    const homeButtonContainer = document.createElement("div");
    homeButtonContainer.classList.add("home-button-container");

    this.buttons.forEach((button) => {
      const buttonElement = document.createElement("a");
      buttonElement.classList.add("button", button.className);
      buttonElement.href = button.href;
      buttonElement.textContent = button.text;

      homeButtonContainer.appendChild(buttonElement);
    });

    projectDetails.appendChild(projectTitle);
    projectDetails.appendChild(projectDesc);
    projectDetails.appendChild(homeButtonContainer);
    projectPreview.appendChild(projectPreviewImg);
    projectPreview.appendChild(projectDetails);

    return projectPreview;
  }

  createMCard() {
    const mCard = document.createElement("div");
    mCard.classList.add("m-card");
    mCard.dataset.previewId = this.id;

    const mCardImg = document.createElement("img");
    mCardImg.src = this.imageSrc;
    mCardImg.width = "250px";
    mCardImg.height = "100%";
    mCardImg.alt = `Project - ${this.title}`;

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info", "hidden");

    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.dataset.cardTitle = this.title;
    cardTitle.textContent = this.title;

    cardInfo.appendChild(cardTitle);
    mCard.appendChild(mCardImg);
    mCard.appendChild(cardInfo);

    return mCard;
  }
}

function fetchAndDisplayProjects() {
  fetch("./assets/db/projects.json")
    .then((response) => response.json())
    .then((data) => {
      const projects = data.map((projectData) => new Project(projectData));
      const projectPreviewContainer = document.querySelector(
        ".project-preview-container"
      );
      const mCardContainer = document.querySelector(".m-card-container");

      projects.forEach((project) => {
        projectPreviewContainer.appendChild(project.createProjectPreview());
        mCardContainer.appendChild(project.createMCard());
      });
    });
}

fetchAndDisplayProjects();
