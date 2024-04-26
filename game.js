//Iteration 1: Declare variables required for this game
let score = 0;
let escapedZombies = 0;
let seconds = 60;
let isGameOver = false;
let isGameWon = false;

// Iteration 1.2: Add shotgun sound
const shotgunSound = new Audio("./assets/shotgun.wav");

// Iteration 1.3: Add background sound
const backgroundSound = new Audio("./assets/bgm.mp3");

// Iteration 1.4: Add lives
let lives = 4;

// Iteration 2: Write a function to make a zombie
function makeZombie() {
    const zombie = document.createElement("img");
    zombie.className = "zombie";
    const index = getRandomInt(0, zombies.length - 1);
    zombie.src = zombies[index];
    zombie.style.left = Math.random() * 500 + "px";
    document.body.appendChild(zombie);
    zombie.addEventListener("click", () => destroyZombie(zombie));
    setTimeout(() => {
        if (!zombie.classList.contains("shot")) {
            zombie.remove();
            escapedZombies++;
            checkGameOver();
        }
    }, 3000);
}

// Iteration 3: Write a function to check if the player missed a zombie
function checkMissedZombie() {
    escapedZombies++;
    checkGameOver();
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
    zombie.classList.add("shot");
    score++;
    shotgunSound.play();
    setTimeout(() => {
        zombie.remove();
        if (score === 60) {
            isGameWon = true;
            checkGameOver();
        }
    }, 200);
}

// Iteration 5: Creating timer
function startTimer() {
    const timerElement = document.getElementById("timer");
    const timer = setInterval(() => {
        seconds--;
        timerElement.textContent = "Time Left: " + seconds + "s";
        if (seconds <= 0) {
            clearInterval(timer);
            checkGameOver();
        }
    }, 1000);
}

// Iteration 6: Write a code to start the game by calling the first zombie
function startGame() {
    backgroundSound.play();
    startTimer();
    makeZombie();
}

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Call startGame function to begin the game
startGame();
