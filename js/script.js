document.addEventListener("DOMContentLoaded", () => {
  internCards();
  interntimeline();
});

function interntimeline() {
  const associatesBtn = document.getElementById("associatesBtn");
  const bachelorsBtn = document.getElementById("bachelorsBtn");

  // Fetch and load JSON data
  fetch("./JSON/interns.json")
    .then((response) => response.json())
    .then((data) => {
      associatesBtn.addEventListener("click", () => loadInterns(data.associatesInterns));
      bachelorsBtn.addEventListener("click", () => loadInterns(data.bachelorInterns));

      // Load associates interns by default
      loadInterns(data.associatesInterns);
    });

  function loadInterns(interns) {
    const leftColumn = document.getElementById("timelineLeft");
    const rightColumn = document.getElementById("timelineRight");

    // Clear previous content
    leftColumn.innerHTML = "";
    rightColumn.innerHTML = "";

    interns.forEach((intern, index) => {
      const internHTML = `
                <div class="bsb-timeline-8 ">
                    <ul class="timeline">
                        <li class="timeline-item">
                            <div class="timeline-body">
                                <div class="timeline-meta">
                                    <div class="d-flex flex-column text-md-center date-meta">
                                        <span>${intern.time}</span>
                                        <span>${intern.name}</span>
                                    </div>
                                </div>
                                <div class="timeline-content">
                                    <h6 class="mb-1 fs-4">${intern.organization}</h6>
                                    <span class="text-secondary fs-6">${intern.position}</span>
                                    <p class=" mt-2 fw-lighter fs-6">${intern.description}</p>   
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            `;

      //  seperate into columns
      const half = Math.ceil(interns.length / 2);
      if (index < half) {
        leftColumn.innerHTML += internHTML;
      } else {
        rightColumn.innerHTML += internHTML;
      }
    });
  }

  // when the associate button is clicked turn active and remove bachelors active. when bachelors button is clicked turn active and remove associate active
  associatesBtn.addEventListener("click", () => {
    associatesBtn.classList.add("active");
    bachelorsBtn.classList.remove("active");
  });
  bachelorsBtn.addEventListener("click", () => {
    bachelorsBtn.classList.add("active");
    associatesBtn.classList.remove("active");
  });
}

function internCards() {
  const associatesContainer = document.getElementById("associates-container");
  const bachelorsContainer = document.getElementById("bachelors-container");

  // Fetch associates and bachelors data
  fetch("./JSON/interns.json")
    .then((response) => response.json())
    .then((data) => {
      // Load Associates Interns
      loadInterns(data.associatesInterns, associatesContainer);

      // Load Bachelors Interns
      loadInterns(data.bachelorInterns, bachelorsContainer);
    })
    .catch((error) => {
      console.error("Error loading intern data:", error);
    });

  function loadInterns(interns, container) {
    container.innerHTML = "";
    interns
      .filter((intern) => intern.name !== "Lunch Break")
      .forEach((intern) => {
        const internCard = `
         <div class="col d-flex justify-content-center align-content-center ">
           <div class="intern-card">
             <div class="back d-flex justify-content-center align-content-center">
               <div class="content">
                 <div class="container-fluid img-container px-0">
                   <img src="${intern.image}" class="image-f fade-in-image"
                        alt="${intern.name}" loading="lazy" />
                 </div>
                 <div class="description text-white">
                   <h6 class="mb-1 fs-6">${intern.name}</h6>
                   <span class="fw-light fs-7">${intern.position}</span>
                   <p class="mt-1">${intern.organization}</p>
                 </div>
                 ${intern.resumeLink ? `<a href="${intern.resumeLink}" class="resume-btn" target="_blank"> Resume</a>` : `<a href="#" class="resume-btn disabled" tabindex="-1" aria-disabled="true">Resume Unavailable</a>`}
               </div>
             </div>
           </div>
         </div>`;
        container.innerHTML += internCard;
      });

    const images = container.querySelectorAll("img.fade-in-image");
    images.forEach((img) => {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
      img.addEventListener("error", () => {
        console.error(`Failed to load image: ${img.src}`);
        img.classList.add("loaded"); // Optional: Remove opacity even if image fails
        img.src = "./Assets/placeholder.png"; // Optional: Set a placeholder image
      });
    });
  }
}
