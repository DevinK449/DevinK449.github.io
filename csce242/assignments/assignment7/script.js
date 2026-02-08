// Constants
const geometryBox = document.getElementById("geometryBox");
const triangle = document.getElementById("triangle");

const dateInput = document.getElementById("dateInput");
const dateText = document.getElementById("dateText");

const sunImage = document.getElementById("sunImage");
const imageFrame = document.getElementById("imageFrame");

// Image sources
const normalImage = "images/sun.png";
const sunnyImage = "images/sun.png";

// Arrow functions
const toggleTriangle = () => {
  triangle.classList.toggle("hidden");
};

const formatDate = (value) => {
  if (value === "") return "";

  const parts = value.split("-");
  return parts[1] + "/" + parts[2] + "/" + parts[0];
};

const showDate = () => {
  const formatted = formatDate(dateInput.value);

  if (formatted === "") {
    dateText.textContent = "";
  } else {
    dateText.textContent = "You picked the date: " + formatted;
  }
};

const changeImage = () => {
  const isSunny = sunImage.src.includes("Sunny");

  sunImage.src = isSunny ? normalImage : sunnyImage;
  imageFrame.classList.toggle("active", !isSunny);
};

// Events
geometryBox.addEventListener("click", toggleTriangle);
dateInput.addEventListener("change", showDate);
sunImage.addEventListener("click", changeImage);
