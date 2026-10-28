
console.log("Loading script file!");

// Load local JSON when the page starts
async function loadOptions() {
  try {
    const response = await fetch("assets/data/data.json");

    if (!response.ok) {
      throw new Error("Could not load local JSON");
    }

    const data = await response.json();

    console.log("JSON data:", data);

    const favorite = document.querySelector("#favoriteInput");

    data.forEach((choice) => {
      const newOption = new Option(
        `${choice.emoji} ${choice.name}`,
        choice.id
      );

      favorite.appendChild(newOption);
    });
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

// Handle form submission
document
  .querySelector("#profileForm")
  .addEventListener("submit", createUserProfile);

async function createUserProfile(e) {
  e.preventDefault();

  const nameInput = document.querySelector("#nameInput").value.trim();
  const favoriteInput = document.querySelector("#favoriteInput").value;
  const commentInput = document.querySelector("#commentInput").value.trim();

  // Defensive programming: validate input
  if (!nameInput || !favoriteInput || !commentInput) {
    alert("Please complete all fields.");
    return;
  }

  try {
    // Fetch a random dog image from the external API
    const response = await fetch(
      "https://dog.ceo/api/breeds/image/random"
    );

    if (!response.ok) {
      throw new Error("Dog API request failed");
    }

    const dogPicValue = await response.json();

    console.log("Dog API data:", dogPicValue);

    // Build one object using the form and API data
    const userData = {
      name: nameInput,
      favorite: favoriteInput,
      comment: commentInput,
      dogpic: dogPicValue.message
    };

    console.log("User data object:", userData);

    // Save the object in sessionStorage
    sessionStorage.setItem(
      "userData",
      JSON.stringify(userData)
    );

    // Retrieve and parse the saved object
    const savedData = JSON.parse(
      sessionStorage.getItem("userData")
    );

    console.log("Retrieved user data:", savedData);

    // Render the retrieved object
    renderProfile(savedData);

  } catch (error) {
    console.error("Error creating profile:", error);
  }
}

// Display the profile in the DOM
function renderProfile(userData) {
  const output = document.querySelector("#profileOutput");
  output.replaceChildren();

  const heading = document.createElement("h2");
  heading.textContent = "Your Profile";

  const name = document.createElement("p");
  name.textContent = `Name: ${userData.name}`;

  const favorite = document.createElement("p");
  favorite.textContent = `Favorite ID: ${userData.favorite}`;

  const comment = document.createElement("p");
  comment.textContent = `Comment: ${userData.comment}`;

  const dogImage = document.createElement("img");
  dogImage.src = userData.dogpic;
  dogImage.alt = "Random dog";
  dogImage.width = 250;

  output.append(heading, name, favorite, comment, dogImage);
}

// Restore saved data after a page refresh
function restoreProfile() {
  const saved = sessionStorage.getItem("userData");

  if (saved) {
    const userData = JSON.parse(saved);
    renderProfile(userData);
  }
}

// Start the application
loadOptions();
restoreProfile();
