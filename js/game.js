// Game State
let score = 0;
let timeLeft = 60;
let gameInterval;
let targetInterval;
let isGameOver = false;
let difficulty = 'medium'; // easy, medium, hard

// DOM Elements
const startGameBtn = document.getElementById('start-game-btn');
const gameInstructions = document.getElementById('game-instructions');
const gameArea = document.getElementById('game-area');
const targetContainer = document.getElementById('target-container');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreDisplay = document.getElementById('final-score');
const playAgainBtn = document.getElementById('play-again-btn');
const restartGameBtn = document.getElementById('restart-game-btn');
const leaderboardScreen = document.getElementById('leaderboard-screen');
const leaderboardList = document.getElementById('leaderboard-list');
const viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');
const backToMenuBtn = document.getElementById('back-to-menu-btn');
const settingsMenu = document.getElementById('settings-menu');
const difficultySelect = document.getElementById('difficulty');
const saveSettingsBtn = document.getElementById('save-settings-btn');
const closeSettingsBtn = document.getElementById('close-settings-btn');

// Sound Effects (placeholders)
const hitSound = new Audio('assets/hit.mp3'); // You'll need to add these files
const missSound = new Audio('assets/miss.mp3');
const gameOverSound = new Audio('assets/gameover.mp3');

// Game Configuration based on difficulty
const gameConfig = {
    easy: {
        targetSpawnRate: 1200, // ms
        targetLifetime: 1500, // ms
        maxTargets: 3
    },
    medium: {
        targetSpawnRate: 800,
        targetLifetime: 1000,
        maxTargets: 5
    },
    hard: {
        targetSpawnRate: 400,
        targetLifetime: 700,
        maxTargets: 7
    }
};

// --- Game Functions ---

function startGame() {
    score = 0;
    timeLeft = 60;
    isGameOver = false;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;
    targetContainer.innerHTML = ''; // Clear any existing targets

    gameInstructions.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    leaderboardScreen.classList.add('hidden');
    settingsMenu.classList.add('hidden');
    gameArea.classList.remove('hidden');
    restartGameBtn.classList.add('hidden'); // Hide restart button initially

    // Set intervals based on current difficulty
    const currentConfig = gameConfig[difficulty];
    gameInterval = setInterval(updateGame, 1000);
    targetInterval = setInterval(spawnTarget, currentConfig.targetSpawnRate);
}

function updateGame() {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

function spawnTarget() {
    if (isGameOver) return;

    const currentConfig = gameConfig[difficulty];
    const existingTargets = document.querySelectorAll('.target').length;
    if (existingTargets >= currentConfig.maxTargets) {
        return; // Don't spawn if max targets reached
    }

    const target = document.createElement('div');
    target.classList.add('target');
    target.textContent = '+1'; // Visual feedback for score

    // Random position
    const containerRect = targetContainer.getBoundingClientRect();
    const targetSize = 50; // Defined in CSS
    const maxX = containerRect.width - targetSize;
    const maxY = containerRect.height - targetSize;

    target.style.left = `${Math.random() * maxX}px`;
    target.style.top = `${Math.random() * maxY}px`;

    target.addEventListener('click', hitTarget);
    targetContainer.appendChild(target);

    // Remove target after its lifetime
    setTimeout(() => {
        if (target.parentNode) {
            target.removeEventListener('click', hitTarget);
            target.parentNode.removeChild(target);
            if (!isGameOver) {
                // Only penalize if not game over and target was missed
                missSound.play(); // Play miss sound
                score = Math.max(0, score - 1); // Penalize for missing
                scoreDisplay.textContent = score;
            }
        }
    }, currentConfig.targetLifetime);
}

function hitTarget(event) {
    if (isGameOver) return;

    score++;
    scoreDisplay.textContent = score;
    hitSound.play(); // Play hit sound

    const target = event.target;
    target.classList.add('hit'); // Add hit class for visual feedback
    target.removeEventListener('click', hitTarget);

    // Remove target after animation
    setTimeout(() => {
        if (target.parentNode) {
            target.parentNode.removeChild(target);
        }
    }, 200); // Match CSS transition duration
}

function endGame() {
    isGameOver = true;
    clearInterval(gameInterval);
    clearInterval(targetInterval);
    gameOverSound.play(); // Play game over sound

    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
    gameArea.classList.add('hidden');

    saveScore(score);
    displayLeaderboard();
}

function restartGame() {
    // This function is for the in-game restart button, if implemented
    // For now, playAgainBtn handles full restart
    startGame();
}

// --- Leaderboard Functions ---

function getLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('tapFuryLeaderboard')) || [];
    return leaderboard.sort((a, b) => b.score - a.score).slice(0, 10); // Top 10 scores
}

function saveScore(newScore) {
    const leaderboard = getLeaderboard();
    const playerName = prompt('Game Over! Enter your name for the leaderboard:', 'Player');
    if (playerName) {
        leaderboard.push({ name: playerName, score: newScore });
        localStorage.setItem('tapFuryLeaderboard', JSON.stringify(leaderboard));
    }
}

function displayLeaderboard() {
    const leaderboard = getLeaderboard();
    leaderboardList.innerHTML = '';
    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = '<li>No scores yet! Play a game to get started.</li>';
        return;
    }
    leaderboard.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${index + 1}. ${entry.name}</span><span>${entry.score}</span>`;
        leaderboardList.appendChild(li);
    });
}

// --- Settings Functions ---

function loadSettings() {
    const savedDifficulty = localStorage.getItem('tapFuryDifficulty');
    if (savedDifficulty) {
        difficulty = savedDifficulty;
        difficultySelect.value = savedDifficulty;
    }
}

function saveSettings() {
    difficulty = difficultySelect.value;
    localStorage.setItem('tapFuryDifficulty', difficulty);
    alert('Settings saved!');
    settingsMenu.classList.add('hidden');
    gameInstructions.classList.remove('hidden'); // Go back to main menu
}

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    displayLeaderboard(); // Display on initial load if needed

    startGameBtn.addEventListener('click', startGame);
    playAgainBtn.addEventListener('click', startGame);
    restartGameBtn.addEventListener('click', restartGame);

    viewLeaderboardBtn.addEventListener('click', () => {
        gameOverScreen.classList.add('hidden');
        gameInstructions.classList.add('hidden');
        settingsMenu.classList.add('hidden');
        leaderboardScreen.classList.remove('hidden');
        displayLeaderboard();
    });

    backToMenuBtn.addEventListener('click', () => {
        leaderboardScreen.classList.add('hidden');
        gameInstructions.classList.remove('hidden');
    });

    // Event listener for settings button (assuming you'll add one in HTML)
    // For now, let's add a placeholder button in instructions for testing
    const settingsButtonPlaceholder = document.createElement('button');
    settingsButtonPlaceholder.id = 'open-settings-btn';
    settingsButtonPlaceholder.classList.add('btn', 'secondary');
    settingsButtonPlaceholder.textContent = 'Settings';
    gameInstructions.appendChild(settingsButtonPlaceholder);

    settingsButtonPlaceholder.addEventListener('click', () => {
        gameInstructions.classList.add('hidden');
        settingsMenu.classList.remove('hidden');
    });

    saveSettingsBtn.addEventListener('click', saveSettings);
    closeSettingsBtn.addEventListener('click', () => {
        settingsMenu.classList.add('hidden');
        gameInstructions.classList.remove('hidden');
    });
});
