const heroes = [
    {
      name: "Luffy",
      power: "Gear 5 🌀",
      image: "https://th.bing.com/th/id/OIP.WRtzvEiRLYiZ1kUhhOOTOwHaEK?w=286&h=181&c=7&r=0&o=5&pid=1.7"
    },
    {
      name: "Gojo",
      power: "Limitless + Infinity 🧿",
      image: "https://th.bing.com/th/id/OIP.JBKabovmlAFz44Bt1RTe9gHaEK?w=301&h=180&c=7&r=0&o=5&pid=1.7"
    },
    {
      name: "Kakashi",
      power: "Chidori ⚡",
      image: "https://th.bing.com/th/id/OIP.tIclBla7uqvIg_u1ckTKfQHaEK?w=271&h=180&c=7&r=0&o=5&pid=1.7"
    },
    {
      name: "Zoro",
      power: "Three Sword Style 🗡️",
      image: "https://th.bing.com/th/id/OIP.ROoQvqOPtB6VAIYkilGnOAHaHa?w=203&h=203&c=7&r=0&o=5&pid=1.7"
    },
    {
      name: "Trafalgar D. Water Law",
      power: "ROOM - Op Op Fruit 💉",
      image: "https://th.bing.com/th/id/OIP.6xctekG-_sqQod_E6cnyMQHaEK?w=288&h=180&c=7&r=0&o=5&pid=1.7"
    },
    {
        name: "Kilua",
        power: "Godspeed ⚡",
        image: "https://th.bing.com/th/id/OIP.eQImgwNO5zO5rJKuAiLM8QHaFD?w=263&h=180&c=7&r=0&o=5&pid=1.7"
    }
  ];
  
  // Event Handling for Summoning a Hero
  const summonSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387'); // Example sound

  document.getElementById("summonBtn").addEventListener("click", () => {
    const hero = heroes[Math.floor(Math.random() * heroes.length)];
    document.getElementById("heroContainer").innerHTML = `
      <div class="character-box">
        <h3>${hero.name}</h3>
        <img src="${hero.image}" alt="${hero.name}" />
        <p class="power">Power: ${hero.power}</p>
      </div>
    `;
    summonSound.play();
  });
  
  
  // Image Slideshow (auto change every 3 sec)
  const slideshowImages = [
    "https://img.freepik.com/free-photo/illustration-anime-city_23-2151779683.jpg?uid=R154664640&semt=ais_hybrid&w=740",
    "https://img.freepik.com/premium-photo/fight-samurai-robot-dojo-sci-fi-action-scene-illustration-digital-painting_37402-1224.jpg?w=996",
    "https://img.freepik.com/free-photo/anime-style-character-with-fire_23-2151152178.jpg?uid=R154664640&semt=ais_hybrid&w=740",
    "https://img.freepik.com/free-photo/illustration-anime-character-rain_23-2151394669.jpg?uid=R154664640&semt=ais_hybrid&w=740",
    "https://img.freepik.com/premium-photo/female-hunter-with-bow-battlefield-digital-art-style-illustration-painting_37402-459.jpg?uid=R154664640&semt=ais_hybrid&w=740",
  ];
  let slideIndex = 0;
  setInterval(() => {
    slideIndex = (slideIndex + 1) % slideshowImages.length;
    document.getElementById("animeImage").src = slideshowImages[slideIndex];
  }, 3000);
  
  // Tabs logic
  function showTab(tabId) {
    // Hide all tab-content elements
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.remove('active'));
  
    // Show the selected tab-content
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
      selectedTab.classList.add('active');
    }
  }
  
  // Keypress Detection
  document.addEventListener("keypress", (e) => {
    console.log(`You pressed: ${e.key}`);
  });
  
  // Secret double-click Easter egg
  document.getElementById("heroContainer").addEventListener("dblclick", () => {
    alert("🧠 Secret Technique Activated!");
  });
  
  // Form Validation
  document.getElementById("ninjaForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
  
    let message = "";
  
    if (!name || !email || password.length < 8) {
      message = "⚠️ Please fill in all fields correctly!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      message = "✉️ Invalid email format!";
    } else {
      message = `✅ Welcome, ${name}-san! You’ve joined the academy.`;
    }
  
    document.getElementById("formFeedback").innerText = message;
  });

  // Guess the Character Game
const characters = heroes.map(h => h.name.toLowerCase());
let selectedCharacter = "";

document.getElementById("gameBtn").addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * characters.length);
  selectedCharacter = characters[randomIndex];
  document.getElementById("gameMessage").textContent = "Guess the character!";
  document.getElementById("resultMessage").textContent = "";
  document.getElementById("guessInput").value = "";
});

// Handle guess submission
document.getElementById("submitGuess").addEventListener("click", () => {
  const userGuess = document.getElementById("guessInput").value.trim().toLowerCase();
  if (!selectedCharacter) {
    document.getElementById("resultMessage").textContent = "❗ Start the game first!";
    return;
  }
  if (userGuess === selectedCharacter) {
    document.getElementById("resultMessage").textContent = "🎉 Correct! You guessed the hero!";
  } else {
    document.getElementById("resultMessage").textContent = "❌ Incorrect. Try again!";
  }
});

// Reset game
document.getElementById("resetGame").addEventListener("click", () => {
  selectedCharacter = "";
  document.getElementById("gameMessage").textContent = "Try guessing the character again!";
  document.getElementById("resultMessage").textContent = "";
  document.getElementById("guessInput").value = "";
});

  