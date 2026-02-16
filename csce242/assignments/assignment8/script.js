// Constants
const ex1Link = document.getElementById("ex1Link");
const ex2Link = document.getElementById("ex2Link");

const exercise1 = document.getElementById("exercise1");
const exercise2 = document.getElementById("exercise2");

const minutesRange = document.getElementById("minutesRange");
const rangeValue = document.getElementById("rangeValue");
const rangeMessage = document.getElementById("rangeMessage");

const countdownMessage = document.getElementById("countdownMessage");

const menuToggle = document.getElementById("menuToggle");
const menuItems = document.getElementById("menuItems");
const arrow = document.getElementById("arrow");

// ---------- Helpers ----------
const showExercise1 = () => {
  exercise1.classList.remove("hidden");
  exercise2.classList.add("hidden");
};

const showExercise2 = () => {
  exercise2.classList.remove("hidden");
  exercise1.classList.add("hidden");
  updateCountdown();
};

const toggleMenu = () => {
  menuItems.classList.toggle("open");
  arrow.textContent = menuItems.classList.contains("open") ? "▲" : "▼";
};

const updateSliderText = () => {
  const minutes = Number(minutesRange.value);
  rangeValue.textContent = `${minutes} minutes`;

  // Messages by interval (include emoji)
  if (minutes > 45) {
    rangeMessage.textContent = "🍳 Plenty of time bacon and eggs moment.";
  } else if (minutes >= 30) {
    rangeMessage.textContent = "📚 Solid buffer review your notes real quick.";
  } else if (minutes >= 15) {
    rangeMessage.textContent = "🚗 Start getting ready you’re in the safe zone.";
  } else {
    rangeMessage.textContent = "🏃 Hurry up this is a sprint!";
  }
};

const minutesUntilClassAt830 = () => {
  const now = new Date();

  const classTime = new Date();
  classTime.setHours(8, 30, 0, 0);

  // positive = minutes until class, negative = minutes after class started
  const diffMs = classTime - now;
  return Math.round(diffMs / 60000);
};

const updateCountdown = () => {
  const mins = minutesUntilClassAt830();

  // Match the required buckets
  if (mins > 15) {
    countdownMessage.textContent = `You have ${mins} minutes left. 😌 You’re chilling.`;
  } else if (mins >= 10) {
    countdownMessage.textContent = `You only have ${mins} minutes left. ☕ Grab your coffee.`;
  } else if (mins >= 5) {
    countdownMessage.textContent = `Only ${mins} minutes left. 🚶 Start moving now.`;
  } else if (mins >= 0) {
    countdownMessage.textContent = `${mins} minutes until class. 🏃 Go go go!`;
  } else if (mins >= -5) {
    countdownMessage.textContent = `You’re ${Math.abs(mins)} minutes late. 😬 Slide in quietly.`;
  } else if (mins >= -15) {
    countdownMessage.textContent = `You’re ${Math.abs(mins)} minutes late. 🫠 You missed the start.`;
  } else {
    countdownMessage.textContent = "You missed class :( 💀";
  }
};

// ---------- Events ----------
ex1Link.addEventListener("click", (e) => {
  e.preventDefault();
  showExercise1();
});

ex2Link.addEventListener("click", (e) => {
  e.preventDefault();
  showExercise2();
});

menuToggle.addEventListener("click", toggleMenu);

minutesRange.addEventListener("input", updateSliderText);

// ---------- Init ----------
updateSliderText();
updateCountdown();
