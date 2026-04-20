// Background music
function toggleMusic() {
  const audio = document.getElementById("bg-music");
  const music_off = document.getElementById("music-off-icon");
  const music_on = document.getElementById("music-on-icon");
  const label = document.getElementById("label")

  audio.volume = 0.25; // 25% volume

  if (audio.paused) { // Turns on the audio
    audio.play();
    music_off.style.opacity = "0";
    setTimeout(() => {
      music_off.style.display = "none";
      music_on.style.display = "inline";
      setTimeout(() => music_on.style.opacity = "1", 10);
    }, 200); 
    label.textContent = "Music On";

  } else { // Turns off the audio
    audio.pause();
    music_on.style.opacity = "0";
    setTimeout(() => {
      music_off.style.display = "inline";
      music_on.style.display = "none"; 
      setTimeout(() => music_off.style.opacity = "1", 10);
    }, 200);
    label.textContent = "Music Off";
  }
} 