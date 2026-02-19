const bubblesWrap = document.getElementById("bubbles");

const rand = (min, max) => Math.random() * (max - min) + min;

const spawnBubbles = () => {
  bubblesWrap.innerHTML = "";
  const rect = bubblesWrap.getBoundingClientRect();

  
  for (let i = 0; i < 22; i++) {
    const b = document.createElement("span");
    b.className = "bubble";

    const size = Math.floor(rand(8, 18));
    const x = Math.floor(rand(10, rect.width - 10));
    const dur = rand(3.5, 7.5);
    const delay = rand(0, 5.0);
    const opacity = rand(0.35, 0.85);

    b.style.left = `${x}px`;
    b.style.setProperty("--s", `${size}px`);
    b.style.setProperty("--d", `${dur}s`);
    b.style.setProperty("--delay", `${delay}s`);
    b.style.setProperty("--o", opacity.toFixed(2));

    b.style.bottom = `${Math.floor(rand(-70, rect.height * 0.35))}px`;

    bubblesWrap.appendChild(b);
  }
};

window.addEventListener("load", spawnBubbles);
window.addEventListener("resize", spawnBubbles);
