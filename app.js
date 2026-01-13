const player = document.getElementById("player");
const thumbnail = document.getElementById("thumbnail");
const loader = document.getElementById("loader");
const muteBtn = document.getElementById("muteBtn");

const downloadBtn = document.getElementById("downloadBtn");

let isMuted = true;

/* Get VIDEO_ID from URL */
function getVideoIdFromPath() {
  const path = window.location.pathname.replace("/", "").trim();
  return path || null;
}

const videoId = getVideoIdFromPath();

downloadBtn.addEventListener("click", openInPlayStore);


if (!videoId) {
  loader.style.display = "none";
  // Redirect to the specified website if no video ID is found
   window.location.replace("https://sites.google.com/view/bhg-universal-studio");

} else {
  /* Thumbnail (UI only) */
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  thumbnail.style.backgroundImage = `url(${thumbUrl})`;

  /* 🔒 AUTOPLAY + MUTED (REQUIRED) */
player.src =
  `https://www.youtube.com/embed/${videoId}` +
  `?autoplay=1` +
  `&mute=1` +
  `&playsinline=1` +
  `&controls=0` +
  `&rel=0` +
  `&modestbranding=1` +
  `&iv_load_policy=3` +
  `&fs=0` +
  `&disablekb=1` +
  `&cc_load_policy=0`;


  player.onload = () => {
    loader.style.display = "none";
    thumbnail.style.display = "none";
  };
}

/* 🔊 CUSTOM MUTE / UNMUTE */
muteBtn.addEventListener("click", () => {
  if (!videoId) return;

  // 🔥 USER-INITIATED RESTART WITH SOUND
  player.src =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1` +
    `&mute=0` +
    `&playsinline=1` +
    `&controls=0` +
    `&rel=0` +
    `&modestbranding=1` +
    `&iv_load_policy=3` +
    `&fs=0` +
    `&disablekb=1`;

  muteBtn.style.display = "none"; 
});



function openInPlayStore() {
 window.location.href = "https://play.google.com/store/apps/details?id=com.BHG.harmandirsahib";
}

function openInApp() {
  if (!videoId) return;
  
  const appUrl = `harmandirsahib://video/${videoId}`;
  
  window.location.href = appUrl;

  setTimeout(function() {
      window.location.href = "https://play.google.com/store/apps/details?id=com.BHG.harmandirsahib";
  }, 2000);
  

}

