/* ===========================================================
    MUSIC/SOUNDS
   =========================================================== */

// Background music
function toggleMusic() {
  const audio = document.getElementById("bg-music");
  const offState = document.getElementById("music-off-icon");
  const onState = document.getElementById("music-on-icon");
  const label = document.getElementById("label")

  // Audio volume
  audio.volume = 0.25; // 25%

  if (audio.paused) {
    // Turn on the audio
    audio.play();
    offState.style.opacity = "0";
    setTimeout(() => {
      offState.style.display = "none";
      onState.style.display = "inline";
      setTimeout(() => onState.style.opacity = "1", 10);
    }, 200); 
    label.textContent = "Music On";

  } else {
    // Turn off the audio
    audio.pause();
    onState.style.opacity = "0";
    setTimeout(() => {
      offState.style.display = "inline";
      onState.style.display = "none"; 
      setTimeout(() => offState.style.opacity = "1", 10);
    }, 200);
    label.textContent = "Music Off";
  }
} 


/* ===========================================================
    HERO
   =========================================================== */

// Intro tagline (typing animation)
const phrases = ["Welcome to", "Sip, stay and be loved."];
const typingText = document.getElementById("typing-text");
const cursor = document.getElementById("cursor");

let phrasesIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phrasesIndex];

  if (!isDeleting) {
    // Type foward
    typingText.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      // Pause at the end before deleting
      setTimeout(() => { isDeleting = true; type(); }, 1800);
      return;
    }

  } else {
    // Delete backward
    typingText.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      phrasesIndex =(phrasesIndex + 1) % phrases.length

      // Pause before typing next phrase
      setTimeout(type, 600);
      return;
    }
  }

  // Typing speed
  setTimeout(type, isDeleting ? 60 : 100);
}

type();