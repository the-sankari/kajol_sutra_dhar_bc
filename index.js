const cardElements = document.querySelectorAll(".m-card");
const projectPreview = document.querySelector(".project-preview");
const cardContainer = document.querySelector(".m-card-container");
const projectData = [];

// Check if project data is available, if not fetch it from an external source
if (projectData.length === 0) {
  fetch("./projects.json") // keeping the json file in root folder
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("projects", JSON.stringify(data)); // Store data in local storage for future use
      projectData.push(...data); // Update projectData array
    });
}

cardElements.forEach((card, index) => {
  card.addEventListener("click", (event) => {
    const scrollLeft = event.currentTarget.clientWidth * index;
    const previewId = card.dataset.previewId;

    // Find the matching project data based on previewId
    const matchingProject = projectData.find(
      (project) => project.id === parseInt(previewId)
    );

    if (matchingProject) {
      // Update preview content with loading container
      projectPreview.innerHTML = `
        <div class="project-preview-loading">
          <svg class="loading-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#3498db" stroke-width="4" stroke-linecap="round" fill="none" stroke-dasharray="125.66370614359179, 125.66370614359179" stroke-dashoffset="0" animation-duration=".00001s" animation-iteration-count="infinite" />
          </svg>
          <span class="loading-text">Loading...</span>
        </div>
      `;
      // Add the "active" class to trigger animation
      projectPreview.classList.add("project-preview-loading", "active");

      setTimeout(() => {
        const previewContent = `
          <img
            src="./assets/projects-img/project-${previewId}.png"
            width="50%"
            class="project-preview-img"
            alt="Project-pokemon"
          />
          <div class="project-details" >
              <h2>${matchingProject.title}</h2>
              <p>${matchingProject.description}</p>
              <div class="home-button-container">
                  <a target="_blank" href="${matchingProject.buttons[0].href}" class="button ${matchingProject.buttons[0].className}" >${matchingProject.buttons[0].text}</a>
                  <a target="_blank" href="${matchingProject.buttons[1].href}" class="button ${matchingProject.buttons[1].className}">${matchingProject.buttons[1].text}</a>
              </div>
          </div>
        `;
        projectPreview.innerHTML = previewContent;
        // Optionally remove animation classes after transition
        projectPreview.classList.remove("project-preview-loading", "active");
      }, 1500);
    } else {
      console.error("Project data not found for previewId:", previewId);
    }
  });
});
