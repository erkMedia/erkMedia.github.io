// ===== COOKIE CONSENT SECTION =====
// This handles the cookie notification popup at the bottom of the page
// once dismissed the cookie consent can be seen again deleting the local storage
document.addEventListener("DOMContentLoaded", function () {
  // Get the elements we need from the page
  const cookieConsent = document.getElementById("cookieConsent");
  const cookieAccept = document.getElementById("cookieAccept");
  const cookieOverlay = document.getElementById("cookieOverlay");

  // Check if user already accepted cookies before
  if (!localStorage.getItem("cookieConsent")) {
    // Show the cookie popup after a short delay
    setTimeout(() => {
      cookieOverlay.classList.add("show");
      cookieConsent.classList.add("show");
      // Stop page scrolling while popup is visible
      document.body.style.overflow = "hidden";
    }, 100);
  }

  // When user clicks "I understand" button
  cookieAccept.addEventListener("click", function () {
    // Remember that user accepted cookies
    localStorage.setItem("cookieConsent", "true");
    // Hide the popup
    cookieConsent.classList.remove("show");
    cookieOverlay.classList.remove("show");
    // Allow page scrolling again
    document.body.style.overflow = "";
  });

  // When user clicks "I reject" button
  cookieReject.addEventListener("click", function () {
    //I had to include this because this flag was appearing from cache? I will remove later on
    localStorage.removeItem("GDPR_REMOVAL_FLAG");
    // Hide the popup
    cookieConsent.classList.remove("show");
    cookieOverlay.classList.remove("show");
    // Allow page scrolling again
    document.body.style.overflow = "";
  });
});

// ===== WORD CLOCK SECTION =====
// This creates the text-based clock that shows time in words

// Main function that updates the clock every second
function textClock() {
  // Get current date and time
  var newDate = new Date();
  var day = newDate.getDay(); // 0=Sunday, 1=Monday, etc.
  var hours = newDate.getHours();
  var minutes = newDate.getMinutes().toString();
  var seconds = newDate.getSeconds().toString();

  // Add leading zero to minutes/seconds if needed (e.g., "05" instead of "5")
  if (minutes < 10) {
    minutes = 0 + minutes;
  }
  if (seconds < 10) {
    seconds = 0 + seconds;
  }

  // Combine minutes and seconds into one number for easy comparison
  var minsSecs = minutes + seconds;

  // If it's past half hour, we'll show the next hour (e.g., "quarter to three")
  if (minsSecs > 3230) {
    hours++;
  }

  // Show "TGIF" on Fridays (day 5)
  if (day == 5) {
    $("#tgif").html("TGIF");
  }

  // Map of hours to their corresponding word elements on the page
  var hoursObj = {
    1: "#one",
    2: "#two",
    3: "#three",
    4: "#four",
    5: "#five-hr",
    6: "#six",
    7: "#seven",
    8: "#eight",
    9: "#nine",
    10: "#ten-hr",
    11: "#eleven",
    12: "#twelve",
    13: "#one",
    14: "#two",
    15: "#three",
    16: "#four",
    17: "#five-hr",
    18: "#six",
    19: "#seven",
    20: "#eight",
    21: "#nine",
    22: "#ten-hr",
    23: "#eleven",
    24: "#midnight",
    0: "#midnight",
  };

  // Light up the correct hour word
  updateHour(hoursObj[hours]);

  // Determine which time description to show based on minutes/seconds
  if (
    (minsSecs >= 5730 && minsSecs < 6000) ||
    (minsSecs >= 0 && minsSecs < 230)
  ) {
    // Show "o'clock" or "midnight"
    if (hours !== 24 && hours !== 0) {
      updateDesc("#oclock");
    } else {
      updateDesc("#midnight");
    }
  } else if (minsSecs >= 230 && minsSecs < 730) {
    // Show "five past"
    updateDesc("#five, #past");
  } else if (minsSecs >= 730 && minsSecs < 1230) {
    // Show "ten past"
    updateDesc("#ten, #past");
  } else if (minsSecs >= 1230 && minsSecs < 1730) {
    // Show "quarter past"
    updateDesc("#quarter, #past");
  } else if (minsSecs >= 1730 && minsSecs < 2230) {
    // Show "twenty past"
    updateDesc("#twenty, #past");
  } else if (minsSecs >= 2230 && minsSecs < 2730) {
    // Show "twenty five past"
    updateDesc("#twenty, #five, #past");
  } else if (minsSecs >= 2730 && minsSecs < 3230) {
    // Show "half past"
    updateDesc("#half, #past");
  } else if (minsSecs >= 3230 && minsSecs < 3730) {
    // Show "twenty five to"
    updateDesc("#twenty, #five, #to");
  } else if (minsSecs >= 3730 && minsSecs < 4230) {
    // Show "twenty to"
    updateDesc("#twenty, #to");
  } else if (minsSecs >= 4230 && minsSecs < 4730) {
    // Show "quarter to"
    updateDesc("#quarter, #to");
  } else if (minsSecs >= 4730 && minsSecs < 5230) {
    // Show "ten to"
    updateDesc("#ten, #to");
  } else if (minsSecs >= 5230 && minsSecs < 5730) {
    // Show "five to"
    updateDesc("#five, #to");
  } else {
    // Clear all descriptions if time doesn't match any range
    updateDesc();
  }
}

// Turn off all time description words, then turn on the ones we need
function updateDesc(classes) {
  $(".desc").removeClass("active"); // Turn off all description words
  $(classes).addClass("active"); // Turn on the words we want
}
// Turn off all hour words, then turn on the current hour
function updateHour(classes) {
  $(".hr").removeClass("active"); // Turn off all hour words
  $(classes).addClass("active"); // Turn on the current hour word
}
// Update the clock every second (1000 milliseconds)
setInterval(function () {
  textClock();
}, 1000);

// ===== PAGE NAVIGATION SECTION =====
// Handle what happens when user clicks navigation links

// When user navigates to clock section, restart the fade-in animation
window.addEventListener("hashchange", function () {
  if (window.location.hash === "#clock") {
    // Reset animation by turning it off and on again
    document.getElementById("clock").style.animation = "none";
    setTimeout(() => {
      document.getElementById("clock").style.animation =
        "clockFadeIn 1s forwards";
    }, 10);
  }
});

// Set default page section to clock if no section is selected
function setDefaultSection() {
  if (!window.location.hash) {
    window.location.hash = "clock";
  }
}

// Restart the clock animations when needed
function restartClockAnimation() {
  const clockSection = document.getElementById("clock");
  if (clockSection) {
    // Find all clock lines and restart their animations
    const lines = document.querySelectorAll('[id^="line-"]');
    lines.forEach((line) => {
      line.style.animation = "none"; // Turn off animation
      line.offsetHeight; // Force browser to notice the change
      line.style.animation = null; // Turn animation back on
    });

    // Also restart the menu animation
    const hoverMenu = document.getElementById("hover_menu");
    if (hoverMenu) {
      hoverMenu.style.animation = "none";
      hoverMenu.offsetHeight;
      hoverMenu.style.animation = null;
    }
  }
}

// When page loads, set up default section and animations
window.addEventListener("load", () => {
  setDefaultSection();
  if (window.location.hash === "#clock") {
    restartClockAnimation();
  }
});

// When user navigates between sections, restart clock animations if needed
window.addEventListener("hashchange", () => {
  if (window.location.hash === "#clock") {
    restartClockAnimation();
  }
});

// ===== EXPERT PROFILES SECTION =====
// Load and display expert profiles from JSON file

function loadExperts() {
  // Get expert data from the experts.json file
  fetch("experts.json")
    .then((response) => {
      // Check if the file loaded successfully
      if (!response.ok) {
        throw new Error("Could not load experts file");
      }
      return response.json(); // Convert to JavaScript object
    })
    .then((experts) => {
      // Find the container where we'll put the expert cards
      const container = document.getElementById("experts-container");
      container.innerHTML = ""; // Clear any existing content

      // Create a card for each expert
      experts.forEach((expert) => {
        // Create the main card container
        const expertCard = document.createElement("div");
        expertCard.className = "expert-card";

        // Create left side (image and basic info)
        const imageContainer = document.createElement("div");
        imageContainer.className = "expert-image-container";

        // Create profile picture
        const expertImg = document.createElement("img");
        expertImg.src = `images/${expert.image}`;
        expertImg.alt = `${expert.name}`;
        expertImg.className = "expert-image";

        // Create name and title section
        const expertInfo = document.createElement("div");
        expertInfo.className = "expert-info";
        const expertName = document.createElement("h3");
        expertName.className = "expert-name";
        expertName.textContent = expert.name;
        const expertTitle = document.createElement("p");
        expertTitle.className = "expert-title";
        expertTitle.textContent = expert.title;
        // Create right side (biography)
        const expertBio = document.createElement("div");
        expertBio.className = "expert-bio";
        const bioText = document.createElement("p");
        bioText.textContent = expert.bio;
        // Put all the pieces together
        expertInfo.appendChild(expertName);
        expertInfo.appendChild(expertTitle);
        imageContainer.appendChild(expertImg);
        imageContainer.appendChild(expertInfo);
        expertBio.appendChild(bioText);
        expertCard.appendChild(imageContainer);
        expertCard.appendChild(expertBio);
        // Add the completed card to the page
        container.appendChild(expertCard);
      });
    })
    .catch((error) => {
      console.error("Error loading experts:", error);
      // Show placeholder content if experts file fails to load
      const container = document.getElementById("experts-container");
      container.innerHTML = `
        <div class="expert-card">
          <div class="expert-image-container">
            <img src="images/placeholder.jpg" alt="Placeholder" class="expert-image">
            <div class="expert-info">
              <h3 class="expert-name">Expert Name</h3>
              <p class="expert-title">Expert Title</p>
            </div>
          </div>
          <div class="expert-bio">
            <p>Expert bio will appear here. This is placeholder text that will be replaced when the experts data loads properly.</p>
          </div>
        </div>
      `;
    });
}

// ===== LEGAL PAGES SECTION =====
// Load license and privacy policy content from JSON file
// License
function loadLicenseContent() {
  // Get legal content from the license.json file
  fetch("license.json")
    .then((response) => response.json())
    .then((data) => {
      // Find the license section on the page
      const licenseSection = document.getElementById("license");
      const licenseContainer = licenseSection.querySelector(".contact-text");
      licenseContainer.innerHTML = ""; // Clear existing content

      // Add the main title
      const title = document.createElement("h3");
      title.className = "terms-title";
      title.textContent = data.license.title;
      licenseContainer.appendChild(title);

      // Add each section of the license
      data.license.sections.forEach((section) => {
        // Add section title
        const sectionTitle = document.createElement("h4");
        sectionTitle.textContent = section.title;
        sectionTitle.className = "section-title";
        licenseContainer.appendChild(sectionTitle);

        // Add section content
        const sectionContent = document.createElement("p");
        sectionContent.textContent = section.content;
        sectionContent.style.marginBottom = "1rem";
        licenseContainer.appendChild(sectionContent);
      });

      // Add footer text
      const licenseFooter = document.createElement("p");
      licenseFooter.className = "footer-text";
      licenseFooter.textContent = data.license.footer;
      licenseContainer.appendChild(licenseFooter);

      // Add back arrow to return to contact page
      const backArrow = document.createElement("a");
      backArrow.href = "#contact";
      backArrow.className = "back-arrow";
      backArrow.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
      licenseContainer.appendChild(backArrow);
    })
    .catch((error) => {
      console.error("Error loading license content:", error);
      // Show error message if license file fails to load
      const licenseContainer = document
        .getElementById("license")
        .querySelector(".contact-text");
      licenseContainer.innerHTML = `
        <p>License information failed to load.</p>
        <a href="#contact" class="contact-text"><i class="fas fa-arrow-left"></i></a>
      `;
    });
}
// Privacy
function loadPrivacyContent() {
  // Get legal content from the license.json file (privacy is in same file)
  fetch("license.json")
    .then((response) => response.json())
    .then((data) => {
      // Find the privacy section on the page
      const privacySection = document.getElementById("privacy");
      const privacyContainer = privacySection.querySelector(".contact-text");
      privacyContainer.innerHTML = ""; // Clear existing content

      // Add the main title
      const title = document.createElement("h3");
      title.className = "terms-title";
      title.textContent = data.privacy.title;
      privacyContainer.appendChild(title);

      // Add each section of the privacy policy
      data.privacy.sections.forEach((section) => {
        // Add section title
        const sectionTitle = document.createElement("h4");
        sectionTitle.className = "section-title";
        sectionTitle.textContent = section.title;
        privacyContainer.appendChild(sectionTitle);

        // Add section content
        const sectionContent = document.createElement("p");
        sectionContent.textContent = section.content;
        sectionContent.style.marginBottom = "1rem";
        privacyContainer.appendChild(sectionContent);
      });

      // Add footer text
      const privacyFooter = document.createElement("p");
      privacyFooter.className = "footer-text";
      privacyFooter.textContent = data.privacy.footer;
      privacyContainer.appendChild(privacyFooter);

      // Add back arrow to return to contact page
      const backArrow = document.createElement("a");
      backArrow.href = "#contact";
      backArrow.className = "back-arrow";
      backArrow.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
      privacyContainer.appendChild(backArrow);
    })
    .catch((error) => {
      console.error("Error loading privacy content:", error);
      // Show error message if privacy file fails to load
      const privacyContainer = document
        .getElementById("privacy")
        .querySelector(".contact-text");
      privacyContainer.innerHTML = `
        <p>Privacy information failed to load.</p>
        <a href="#contact" class="contact-text"><i class="fas fa-arrow-left"></i></a>
      `;
    });
}

// ===== INITIALIZE EVERYTHING =====
// When the page loads, start all the functions
document.addEventListener("DOMContentLoaded", function () {
  loadPrivacyContent(); // Load privacy policy
  loadLicenseContent(); // Load license information
  loadExperts(); // Load expert profiles
});
