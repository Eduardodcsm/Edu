# Tap Fury - Quick Reaction Game

## Project Brief
"Tap Fury" is a professional, fully functional, and interactive quick-reaction game website optimized for mobile devices. It's built with clean HTML5, CSS3, and vanilla JavaScript, designed for optimal performance and easy hosting on GitHub Pages.

## Game Description
Test your reflexes and speed! Targets will appear on the screen, and your goal is to tap them as quickly as possible. The game features a dynamic difficulty system, a scoring mechanism, and a local leaderboard to track your best scores.

## Features
- **Quick Reaction Gameplay:** Tap targets as they appear to score points.
- **Progressive Difficulty:** The game speeds up as you play, offering an engaging challenge.
- **Local Leaderboard:** Your top 10 scores are saved locally using `localStorage`.
- **Settings Menu:** Adjust game difficulty (Easy, Medium, Hard).
- **Responsive Design:** Optimized for seamless play across various mobile and desktop screen sizes.
- **Sound Effects:** Auditory feedback for hits, misses, and game over.
- **Production-Ready:** Clean, modular, and well-commented code with no external dependencies.

## How to Play
1.  **Start the Game:** Click the "Start Game" button on the landing page.
2.  **Tap Targets:** As circular targets appear in the game area, tap them as quickly as possible.
3.  **Score Points:** Each successful tap increases your score. Missing a target will result in a small penalty.
4.  **Time Limit:** You have 60 seconds to achieve the highest score.
5.  **Game Over:** The game ends when the time runs out. Your score will be displayed, and you'll have the option to enter your name for the leaderboard.

## Difficulty Settings
Access the "Settings" menu from the main screen to choose your preferred difficulty:
- **Easy:** Slower target spawn rate, longer target lifetime, fewer maximum simultaneous targets.
- **Medium:** Balanced challenge.
- **Hard:** Faster target spawn rate, shorter target lifetime, more maximum simultaneous targets.

## Installation and Local Setup
No installation is required! As a pure HTML/CSS/JS project:
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/tap-fury.git
    cd tap-fury
    ```
2.  **Open `index.html`:** Simply open the `index.html` file in your preferred web browser.

## Hosting on GitHub Pages
This project is designed for effortless deployment to GitHub Pages:
1.  **Push to GitHub:** Ensure your project is pushed to a GitHub repository.
2.  **Repository Settings:** Go to your repository on GitHub. Click on the **`Settings`** tab.
3.  **Pages Section:** In the left sidebar, click on **`Pages`**.
4.  **Deployment Source:** Under "Build and deployment", select **"Deploy from a branch"**.
5.  **Branch and Folder:** Choose your main branch (e.g., `main` or `master`) and select the **`/ (root)`** folder.
6.  **Save:** Click the **`Save`** button.
7.  **Access Your Site:** GitHub will automatically build and deploy your site. After a few minutes, your game will be live at a URL similar to `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`.

## Project Structure
```
.                 
├── index.html        # Main game page
├── css/              # Stylesheets
│   └── style.css     # Main styling for the game
├── js/               # JavaScript files
│   └── game.js       # Core game logic and interactivity
├── assets/           # Game assets (sounds, images - to be added)
├── README.md         # Project documentation and guide
└── .gitignore        # Standard Git ignore file
```

## Technologies Used
-   HTML5
-   CSS3
-   Vanilla JavaScript

## Accessibility
-   Semantic HTML for improved screen reader compatibility.
-   Sufficient color contrast for readability.
-   Keyboard navigation support for interactive elements.
-   Mobile touch targets designed for ease of use.

## Contributing
Feel free to fork this repository, suggest improvements, or submit pull requests. If you find any issues or have ideas for new features, please open an issue.