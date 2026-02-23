// Associative arrays (objects): key = display text, value = youtube embed url
const happySongs = {
  "Sk8er boi": "https://www.youtube.com/embed/TIy3n2b7V9k",
  "Mr. Brightside": "https://www.youtube.com/embed/gGdGFtwCNBE",
  "Magic": "https://www.youtube.com/embed/Cq-NShfefks",
  "Gypsy": "https://www.youtube.com/embed/mwgg1Pu6cNg",
  "I Want You Back": "https://www.youtube.com/embed/x0q1H9xWOA8"
};

const sadSongs = {
  "Song For Another Time": "https://www.youtube.com/embed/lZ0QFmzl1kw",
  "Stay Together For The Kids": "https://www.youtube.com/embed/45RYX77veK0",
  "Scott Street": "https://www.youtube.com/embed/W-Khe7DInxo",
  "Fix You by Coldplay": "https://www.youtube.com/embed/k4V3Mo61fJM",
  "How to Save a Life": "https://www.youtube.com/embed/cjVQ36NhbMk"
};

// Elements
const moodSelect = document.getElementById("moodSelect");
const songLinks = document.getElementById("songLinks");
const videoWrap = document.getElementById("videoWrap");
const videoFrame = document.getElementById("videoFrame");

// Helpers
const clearSongs = () => {
  songLinks.innerHTML = "";
};

const hideVideo = () => {
  videoWrap.classList.add("hidden");
  videoFrame.src = "";
};

const showVideo = (embedUrl) => {
  videoFrame.src = embedUrl;
  videoWrap.classList.remove("hidden");
};

const makeSongLink = (title, embedUrl) => {
  const a = document.createElement("a");
  a.href = "#";
  a.textContent = title;

  a.addEventListener("click", (e) => {
    e.preventDefault();
    showVideo(embedUrl);
  });

  return a;
};

const loadSongsForMood = (mood) => {
  clearSongs();
  hideVideo();

  let songs = null;

  if (mood === "happy") {
    songs = happySongs;
  } else if (mood === "sad") {
    songs = sadSongs;
  } else {
    return;
  }

  for (const title in songs) {
    const link = makeSongLink(title, songs[title]);
    songLinks.appendChild(link);
  }
};

// Events
moodSelect.addEventListener("change", () => {
  loadSongsForMood(moodSelect.value);
});

// Init
hideVideo();