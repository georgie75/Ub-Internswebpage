document.addEventListener("DOMContentLoaded", () => {
  const associatesBtn = document.getElementById("associatesBtn");
  const bachelorsBtn = document.getElementById("bachelorsBtn");

  // Fetch and load JSON data
  fetch("./JSON/interns.json")
    .then((response) => response.json())
    .then((data) => {
      associatesBtn.addEventListener("click", () => loadInterns(data.associatesInterns));
      bachelorsBtn.addEventListener("click", () => loadInterns(data.bachelorInterns));
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
                                    <div class="d-flex flex-column text-md-center">
                                        <span>${intern.time}</span>
                                        <span>${intern.name}</span>
                                    </div>
                                </div>
                                <div class="timeline-content">
                                    <h6 class="mb-1">${intern.organization}</h6>
                                    <span class="text-secondary fs-7">${intern.position}</span>
                                    <p>${intern.description}</p>   
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            `;

      // Alternate between columns
    const half = Math.ceil(interns.length / 2);
    if (index < half) {
      leftColumn.innerHTML += internHTML;
    } else {
      rightColumn.innerHTML += internHTML;
    }
    });
  }
});
