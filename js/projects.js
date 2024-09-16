const projectGallery = document.querySelector("#project-gallery");
const projectModal = document.querySelector("#modal");

const projectModalImage = document.querySelector("#modal-img");

const projectModalInfo = document.querySelector("#modal-info");

const modalCloseBtn = document.querySelector(".close");

fetch("./projects.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.classList.add("gallery-item");
      projectCard.innerHTML = `
      <div class="card">
          <div class="card-front">
            <img src="${project.imageSrc}" alt="${project.title}">
          </div>
          <div class="card-back">
            <h3 class='card-title'>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-buttons home-buttons-container ">
              ${project.buttons
                .map(
                  (button) => `
                <a href="${button.href}" class="button" target="_blank">${button.text}</a>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      `;
      projectGallery.appendChild(projectCard);
      const card = projectCard.querySelector(".card");
      card.addEventListener("click", () => {
        displayModal(project);
      });
    });
  })
  .catch((error) => console.error("Error Fetching project data"));

  const displayModal = (project) => {
    projectModalImage.src = project.imageSrc;
    projectModalInfo.innerHTML = `
      <h3 class='card-title'>${project.title}</h3>
      <p>${project.description}</p>
      <div class="details">
        ${project.details.map((detail) => {
          const key = Object.keys(detail)[0];
          return `<img src="${detail[key]}" alt="${detail[key]}" >`;
        }).join('')}
      </div>
      <div class="project-buttons modal-btn home-buttons-container">
        ${project.buttons
          .map(
            (button) => `
            <a href="${button.href}" class="button" target="_blank">${button.text}</a>
          `
          )
          .join("")}
      </div>
    `;
    projectModal.style.display = "flex";
  };

modalCloseBtn.addEventListener("click", () => {
  projectModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    projectModal.style.display = "none";
  }
});
