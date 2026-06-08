/* ----------------------------------------
    Music & sound effects 
   ---------------------------------------- */

// --- Background music & music icon state transition ---
function toggleMusic() {
  const audio = document.getElementById("bg-music");
  const icon = document.getElementById("music-icon");
  const badge = document.getElementById("music-icon-badge");

  // Audio volume
  audio.volume = 0.25; // 25%

  // Fade out
  icon.style.opacity = "0";

  setTimeout(() => {
    if (audio.paused) {
      // Turn on the audio
      audio.play();
      icon.src = "assets/images/ui/music-on-icon.svg";
      icon.alt = "Music On";
      badge.textContent = "Music On";

    } else {
      // Turn off the audio
      audio.pause();
      icon.src = "assets/images/ui/music-off-icon.svg";
      icon.alt = "Music Off";
      badge.textContent = "Music Off";
    }

    // Fade in
    icon.style.opacity = "1";
  }, 200);
}

// --- Unlock & warm up audio for hover & click sounds on first interaction
let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;

  ["hoverSound", "clickSound"].forEach(id => {
    const sound = document.getElementById(id);
    sound.play().then(() => {
      sound.pause();
      sound.currentTime = 0;      
    }).catch(() => {});
  });

  audioUnlocked = true;

  // Removes both listeners once the audio is unlocked
  document.removeEventListener("click", unlockAudio);
  document.removeEventListener("mouseover", unlockAudio);
}

// Listen for the first hover or click to unlock the audio
document.addEventListener("click", unlockAudio);
document.addEventListener("mouseover", unlockAudio);

// --- Hover sound ---
function playHoverSound(hoverSound) {
  if (!audioUnlocked) return;
  const sound = document.getElementById("hoverSound");
  sound.currentTime = 0;
  sound.play();
}

// Attach all elements
document.querySelectorAll(".hover-sound").forEach(el => {
  el.addEventListener("mouseenter", () => playHoverSound("hoverSound"));
});

// --- Click sound --- */
function playClickSound(clickSound) {
  const sound = document.getElementById("clickSound");
  sound.currentTime = 0;
  sound.play();
}

// Attach all elements
document.querySelectorAll(".click-sound").forEach(el => {
  el.addEventListener("click", () => playClickSound("clickSound"));
});

// --- Meow sound ---
function playMeowSound(meowSound) {
  const sound = document.getElementById("meowSound");
  sound.currentTime = 0;
  sound.play();

  // Sound volume
  sound.volume = 0.75; // 75%
}

// Attach all elements
document.querySelectorAll(".meow-sound").forEach(el => {
  el.addEventListener("click", () => playMeowSound("meowSound"));
});

/* ----------------------------------------
    Hero 
   ---------------------------------------- */

// --- Intro tagline & typing animation ---
const phrases = ["Welcome to", "Sip, stay and be loved", "Coffee, cats and good vibes"];
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

    // Delete backwards
    typingText.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      phrasesIndex = (phrasesIndex + 1) % phrases.length;

      // Pause before typing next phrase
      setTimeout(type, 600);
      return;
    }
  }

  // Typing speed
  setTimeout(type, isDeleting ? 60 : 100);
}

type();

/* ----------------------------------------
    Menu 
   ---------------------------------------- */

// --- Filter buttons ---
function filterBtns() {
  const filterBtn = document.querySelectorAll(".filter-btn");
  const menuItem = document.querySelectorAll(".item-card");

  // Show hot drinks on load
  menuItem.forEach(item => {
    const match = item.dataset.category === "hot-drinks";
    item.style.display = match ? "grid" : "none";
  });

  // Listen for a click on each filter button
  filterBtn.forEach(btn => {
    btn.addEventListener("click", () => {

      // Remove active style from all buttons, then add it to clicked one
      filterBtn.forEach(b => b.classList.remove("filter-btn-active"));
      btn.classList.add("filter-btn-active");

      // Get the category from the button's id
      const filter = btn.id.replace("-btn", "");

      // Show or hide each card based on whether it matches the selected category
      menuItem.forEach(item => {
        const match = item.dataset.category === filter;
        item.style.display = match ? "grid" : "none";
      });
    });
  });
}

// Run the fuction once the index.html is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  filterBtns();

  // Hide confirmation section on load
  document.getElementById("confirmation-order").style.display = "none";
});

/* ----------------------------------------
    Order form and confirmation order 
   ---------------------------------------- */

function showSection(sectionId) {

  // Hide all sections
  document.querySelectorAll("section").forEach(sec => {
    sec.style.display = "none";
  });

  // Show the target section
  document.getElementById(sectionId).style.display = "block";

  window.scrollTo({ top: 0, behavior: "instant" }); // Scroll back to the top
}

document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault(); // Stops the page from reloading

  // Show the confirmation-order section
  showSection("confirmation-order");
});