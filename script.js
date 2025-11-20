/* CLOCK */
function tick() {
  const now = new Date();
  time.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  date.textContent = now.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" });
}
setInterval(tick, 1000);
tick();

/* WALLPAPER SYSTEM */
const LIGHT_FOLDER = "Light/";
const DARK_FOLDER  = "Dark/";

const lightWallpapers = ["light1.jpg","light2.jpg","light3.jpg","light4.jpg","light5.jpg"]
  .map(n => LIGHT_FOLDER + n);

const darkWallpapers = ["dark1.jpg","dark2.jpg","dark3.jpg","dark4.jpg","dark5.jpg"]
  .map(n => DARK_FOLDER + n);

let isDark = true;

function preload(arr) {
  arr.forEach(src => { let i = new Image(); i.src = src; });
}
preload(lightWallpapers);
preload(darkWallpapers);

const wallpaperDIV = document.querySelector(".wallpaper-container");

function applyWallpaper() {
  const list = isDark ? darkWallpapers : lightWallpapers;
  const chosen = list[Math.floor(Math.random() * list.length)];

  const img = new Image();
  img.src = chosen;

  img.onload = () => {
    wallpaperDIV.style.backgroundImage = `url("${img.src}")`;
    document.body.style.opacity = "1";
  };
}
applyWallpaper();

/* SEARCH */
const q = document.getElementById("q");

q.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const s = q.value.trim();
    if (!s) return;

    const isURL = /^(https?:\/\/)|([\w-]+\.[\w]+)/i.test(s);

    window.location.href = isURL
      ? (s.startsWith("http") ? s : "https://" + s)
      : "https://www.google.com/search?q=" + encodeURIComponent(s);
  }
});

/* THEME TOGGLE (SHIFT + C) */
document.addEventListener("keydown", e => {
  if (e.shiftKey && e.key.toLowerCase() === "c") {
    isDark = !isDark;
    document.body.classList.toggle("dark", isDark);
    document.body.classList.toggle("light", !isDark);
    applyWallpaper();
  }
});
