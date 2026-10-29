console.log("loading script file?");

document
  .querySelector("#btnCreateProfile")
  .addEventListener("click", createUserProfile);

async function createUserProfile(e) {
  e.preventDefault();
  // document.querySelector('#profileForm');

  //todo: defensive programming...check if nothing is there... 
  //if(!nameInput)...
  const nameInput = document.querySelector("#nameInput").value;
  const favoriteInput = document.querySelector("#favoriteInput").value;
  const commentInput = document.querySelector("#commentInput").value;

    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const dogData = await response.json();
    const dogPicValue = dogData.message;
    console.log('dogPicValue ', dogPicValue);

    //dogPicValue.message 


  const userData = {
    name: nameInput,
    favorite: favoriteInput,
    comment: commentInput,
    dogpic: dogPicValue 
  };

  console.log('userData object ', userData);
  sessionStorage.setItem("userData", JSON.stringify(userData));
  const saved = sessionStorage.getItem("userData");
  const savedUserData = JSON.parse(saved);
  console.log("Saved user data:", savedUserData);
  renderProfile(savedUserData);
}
function renderProfile(profile) {
  const output = document.querySelector("#profileOutput");
output.textContent =
  profile.name +
  " | Favorite: " + profile.favorite +
  " | Comment: " + profile.comment;

// Add dog picture
const dogImage = document.createElement("img");
dogImage.src = profile.dogpic;
dogImage.width = 250;
dogImage.alt = "Random dog picture";
dogImage.style.display = "block";
output.appendChild(dogImage)

}

async function loadOptions() {
  const response = await fetch("assets/data/data.json");

  if (!response.ok) {
    throw new Error("Could not load local JSON");
  }

  const data = await response.json();

  console.log("json data: ", data);

  const favorite = document.querySelector("#favoriteInput");
  let newOption;

  data.forEach((choice) => {
    newOption = new Option(choice.name, choice.name);
    favorite.appendChild(newOption);
  });
}
loadOptions();

const savedProfile = sessionStorage.getItem("userData");

if (savedProfile) {
  renderProfile(JSON.parse(savedProfile));
}
document.querySelector("#btnClearSession")
  .addEventListener("click", () => {
    sessionStorage.removeItem("userData");
    document.querySelector("#profileOutput").textContent = "";
    document.querySelector("#profileForm").reset();
  });