const gallery = document.getElementById("gallery");

const modal = document.getElementById("songModal");
const closeModalBtn = document.getElementById("closeModalBtn");

const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");
const modalArtist = document.getElementById("modalArtist");
const modalAlbum = document.getElementById("modalAlbum");
const modalGenre = document.getElementById("modalGenre");

class Song {
  constructor(title, artist, album, year, genre, coverFile, youtubeCode) {
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.year = year;
    this.genre = genre;
    this.coverFile = coverFile;
    this.youtubeCode = youtubeCode;
  }

  getCard = () => {
    const card = document.createElement("section");
    card.classList.add("song-card");

    const top = document.createElement("div");
    top.classList.add("card-top");

    const titleEl = document.createElement("h3");
    titleEl.classList.add("song-title");
    titleEl.textContent = this.title;

    const artistEl = document.createElement("p");
    artistEl.classList.add("song-artist");
    artistEl.textContent = `By ${this.artist}`;

    top.append(titleEl, artistEl);

    const img = document.createElement("img");
    img.classList.add("cover");
    img.src = `images/${this.coverFile}`;
    img.alt = `${this.title} cover`;

    card.append(top, img);

    card.addEventListener("click", () => {
      openModal(this);
    });

    return card;
  };
}

const openModal = (song) => {
  modalTitle.textContent = song.title;
  modalArtist.textContent = `by ${song.artist}`;
  modalAlbum.textContent = `${song.album}, ${song.year}`;
  modalGenre.textContent = `${song.genre}`;

  // Use youtubeCode as required
  modalVideo.src = `https://www.youtube.com/embed/${song.youtubeCode}`;

  modal.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "none";
  modalVideo.src = ""; // stop video
};

closeModalBtn.addEventListener("click", closeModal);

// click outside modal content closes it
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

const songs = [
  new Song(
    "The Reason",
    "Hoobastank",
    "The Reason",
    2003,
    "Rock",
    "reason.jpg",
    "fV4DiAyExN0"
  ),

  new Song(
    "Payphone",
    "Maroon 5",
    "Overexposed",
    2012,
    "Pop",
    "payphone.jpg",
    "KRaWnd3LJfs"
  ),

  new Song(
    "Jukebox",
    "Kid Quill",
    "94.3 The Reel",
    2017,
    "Hip-Hop",
    "jukebox.jpg",
    "nhb1DUBCAC4"
  ),

  new Song(
    "The Show Goes On",
    "Lupe Fiasco",
    "Lasers",
    2010,
    "Hip-Hop",
    "show.jpg",
    "Rmp6zIr5y4U"
  )
];

const loadGallery = () => {
  gallery.innerHTML = "";
  songs.forEach((song) => {
    gallery.appendChild(song.getCard());
  });
};

loadGallery();