document.addEventListener("DOMContentLoaded", () => {
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
});
