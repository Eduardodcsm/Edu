const App = {
    // --- CORE PROPERTIES ---
    data: {
        userProfile: null,
        settings: null,
        vocabulary: [],
        progress: null,
        achievements: [],
        studyHistory: [],
        content: {
            levels: {}, // Populated from JSON
        },
        currentPage: 'home',
        currentLevel: 'A1',
    },

    // --- INITIALIZATION ---
    async init() {
        console.log("Initializing Solomiya Ukrainian Learning App...");
        this.DOM.cacheDOM();
        this.DOM.addEventListeners();
        try {
            await this.Content.init(); // Wait for content to load
            this.DataManager.loadAll();
            this.UI.init();
            this.Router.navigateTo(this.data.currentPage, true);
            this.User.checkDailyLogin();
            console.log("App initialized successfully.");
        } catch (error) {
            console.error("Fatal error during initialization:", error);
            this.UI.showError("Could not load learning content. Please check your connection and try again.");
        }
    },

    // --- DOM MANAGEMENT ---
    DOM: {
        els: {},
        cacheDOM() {
            this.els.appContainer = document.getElementById('app-container');
            this.els.mainContent = document.getElementById('main-content');
            this.els.pageContent = document.getElementById('page-content');
            this.els.sidebar = document.getElementById('main-sidebar');
            this.els.sidebarToggle = document.getElementById('sidebar-toggle');
            this.els.navLinks = document.querySelectorAll('.nav-link');
            this.els.mobileMenuBtn = document.getElementById('mobile-menu-btn');
            this.els.userProfileToggle = document.getElementById('user-profile-toggle');
            this.els.userProfileMenu = document.querySelector('.user-profile-menu');
            this.els.streakValue = document.getElementById('streak-value');
            this.els.xpValue = document.getElementById('xp-value');
            this.els.darkModeToggle = document.getElementById('dark-mode-toggle');
            this.els.darkModeCheckbox = document.getElementById('dark-mode-checkbox');
        },
        addEventListeners() {
            this.els.sidebarToggle.addEventListener('click', () => this.els.sidebar.classList.toggle('collapsed'));
            this.els.mobileMenuBtn.addEventListener('click', () => this.els.sidebar.classList.toggle('open'));
            this.els.userProfileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.els.userProfileMenu.classList.toggle('open');
            });
            
            document.addEventListener('click', (e) => {
                if (!this.els.userProfileMenu.contains(e.target)) {
                    this.els.userProfileMenu.classList.remove('open');
                }
            });
            
            this.els.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    App.Router.navigateTo(e.currentTarget.dataset.page);
                    this.els.sidebar.classList.remove('open');
                });
            });
            
            this.els.darkModeCheckbox.addEventListener('change', (e) => {
                 App.UI.setTheme(e.target.checked ? 'dark' : 'light');
            });
        }
    },

    // --- ROUTER ---
    Router: {
        navigateTo(page, isInitial = false) {
            if (!page || App.data.currentPage === page && !isInitial) return;
            App.data.currentPage = page;
            
            const pageRenderer = App.Pages[page];
            if (pageRenderer) {
                App.DOM.els.pageContent.innerHTML = '<div class="loading-spinner"></div>';
                // Use a short timeout to allow the spinner to render before the main content
                setTimeout(() => {
                   App.DOM.els.pageContent.innerHTML = pageRenderer.render();
                   if(pageRenderer.init) pageRenderer.init();
                   App.UI.updateActiveNav(page);
                }, 50);
            } else {
                App.DOM.els.pageContent.innerHTML = `<h2>Page not found: ${page}</h2>`;
            }
        },
    },

    // --- PAGE RENDERERS ---
    Pages: {
        home: {
            render() {
                const user = App.data.userProfile;
                const wordOfTheDay = App.Content.getWordOfTheDay();
                if (!user || !wordOfTheDay) return '<div class="loading-spinner"></div>';
                return `
                    <div id="page-home">
                        <div class="welcome-header">
                            <h1>Привіт, ${user.name}!</h1>
                            <p>Welcome back! Ready to learn some Ukrainian?</p>
                        </div>
                        <div class="stats-grid">
                            <div class="card">
                                <h4>Words Learned</h4>
                                <p class="ukrainian-text">${App.data.vocabulary.filter(v => v.mastery > 0).length}</p>
                            </div>
                            <div class="card">
                                <h4>Modules Completed</h4>
                                <p class="ukrainian-text">${Object.values(App.data.progress.modulesCompleted).flat().length}</p>
                            </div>
                            <div class="card">
                                <h4>Current Level</h4>
                                <p class="ukrainian-text">${user.level}</p>
                            </div>
                        </div>
                        <div class="card">
                            <h3>Word of the Day</h3>
                            <div class="d-flex justify-between align-center">
                                 <div>
                                    <p class="ukrainian-text">${wordOfTheDay.ukrainian}</p>
                                    <p><em>${wordOfTheDay.english}</em></p>
                                 </div>
                                 <button class="btn btn-outline" onclick="App.Audio.speak('${wordOfTheDay.ukrainian}')">🔊</button>
                            </div>
                        </div>
                    </div>
                `;
            }
        },
        lessons: {
            render() {
                const levels = Object.keys(App.data.content.levels);
                let levelSelectorHTML = levels.map(level => {
                    const levelData = App.data.content.levels[level];
                    return `
                    <div class="card level-card ${level === App.data.currentLevel ? 'active' : ''}" onclick="App.Pages.lessons.selectLevel(event, '${level}')">
                        <h3>${level}</h3>
                        <p>${levelData.name}</p>
                    </div>
                `}).join('');

                return `
                    <div id="page-lessons">
                        <h2>Lessons</h2>
                        <div class="level-selector">${levelSelectorHTML}</div>
                        <h3 id="module-list-header">Modules for Level ${App.data.currentLevel}</h3>
                        <div class="module-grid" id="module-grid-container">
                            ${this.renderModules(App.data.currentLevel)}
                        </div>
                    </div>
                `;
            },
            renderModules(level) {
                const modules = App.data.content.levels[level]?.modules || [];
                if (modules.length === 0) {
                    return `<div class="card"><p>Modules for level ${level} are coming soon!</p></div>`;
                }
                return modules.map((mod, index) => `
                    <div class="card module-card">
                        <div class="module-content">
                            <h4>${mod.title}</h4>
                            <p>${mod.description}</p>
                        </div>
                        <div class="module-footer">
                            <div class="progress-bar">
                                <div class="progress-bar-inner" style="width: ${App.User.getModuleProgress(level, index)}%;"></div>
                            </div>
                            <button class="btn btn-primary" onclick="App.Pages.lessons.startLesson('${level}', ${index}, 0)">Start</button>
                        </div>
                    </div>
                `).join('');
            },
            selectLevel(event, level) {
                App.data.currentLevel = level;
                document.getElementById('module-list-header').innerText = `Modules for Level ${level}`;
                document.getElementById('module-grid-container').innerHTML = this.renderModules(level);
                document.querySelectorAll('.level-card').forEach(c => c.classList.remove('active'));
                event.currentTarget.classList.add('active');
            },
            startLesson(levelId, moduleId, lessonIndex) {
                const module = App.data.content.levels[levelId].modules[moduleId];
                const lesson = module.lessons[lessonIndex];
                
                let contentHTML = `
                    <div id="lesson-view">
                        <div class="lesson-header">
                            <h2>${lesson.title}</h2>
                            <span>${lessonIndex + 1} / ${module.lessons.length}</span>
                        </div>
                        <div class="progress-bar mb-3">
                            <div class="progress-bar-inner" style="width: ${((lessonIndex + 1) / module.lessons.length) * 100}%;"></div>
                        </div>
                        <div class="card lesson-content">${lesson.content}</div>
                        <div class="lesson-nav">
                            ${lessonIndex > 0 ? `<button class="btn btn-outline" onclick="App.Pages.lessons.startLesson('${levelId}', ${moduleId}, ${lessonIndex - 1})">Previous</button>` : '<div></div>'}
                            ${lessonIndex < module.lessons.length - 1 ? `<button class="btn btn-primary" onclick="App.Pages.lessons.startLesson('${levelId}', ${moduleId}, ${lessonIndex + 1})">Next</button>` : `<button class="btn btn-success" onclick="App.Pages.lessons.finishModule('${levelId}', ${moduleId})">Finish Module</button>`}
                        </div>
                    </div>
                `;
                App.DOM.els.pageContent.innerHTML = contentHTML;
            },
            finishModule(levelId, moduleId) {
                App.User.addXP(25);
                App.User.completeModule(levelId, moduleId);
                App.UI.showToast("Module completed! +25 XP");
                App.Router.navigateTo('lessons');
            }
        },
        practice: {
            render() {
                return `
                <div id="page-practice">
                    <h2>Practice Zone</h2>
                    <div class="module-grid">
                        <div class="card practice-card" style="cursor: pointer;" onclick="App.Practice.start('flashcards')">
                            <h4>Flashcards</h4>
                            <p>Review vocabulary with spaced repetition.</p>
                        </div>
                        <div class="card practice-card" style="cursor: pointer;" onclick="App.Practice.start('pronunciation')">
                            <h4>Pronunciation</h4>
                            <p>Record and compare your pronunciation.</p>
                        </div>
                        <div class="card practice-card" style="cursor: pointer;" onclick="App.Practice.start('quiz')">
                            <h4>Vocabulary Quiz</h4>
                            <p>Test your knowledge with various quiz types.</p>
                        </div>
                    </div>
                </div>`;
            }
        },
        community: { render() { return `<div class="card"><h2>Community (Coming Soon)</h2><p>Connect with other learners, find language partners, and join study groups.</p></div>`; } },
        progress: { render() { return `<div class="card"><h2>My Progress (Coming Soon)</h2><p>Track your learning journey, view achievements, and set goals.</p></div>`; } },
        resources: { render() { return `<div class="card"><h2>Resources (Coming Soon)</h2><p>Find useful links, grammar tables, and cultural notes.</p></div>`; } },
        settings: { 
             render() { 
                 return `<div class="card"><h2>Settings (Coming Soon)</h2><p>Manage your account, preferences, and data.</p></div>`;
            }
        },
    },
    
    // --- PRACTICE MODULES ---
    Practice: {
        start(type) {
            const container = App.DOM.els.pageContent;
            switch(type) {
                case 'flashcards':
                    this.Flashcards.start();
                    break;
                default:
                    container.innerHTML = `<div class="card"><h2>${type} practice is not available yet.</h2></div>`;
            }
        },
        
        Flashcards: {
            currentCard: null,
            deck: [],
            
            start() {
                this.deck = [...App.data.vocabulary].sort(() => 0.5 - Math.random()).slice(0, 10); // Random 10 cards
                if (this.deck.length === 0) {
                     App.DOM.els.pageContent.innerHTML = `<h2>No Vocabulary Found</h2><p>Start some lessons to build your vocabulary list first.</p><button class="btn btn-primary" onclick="App.Router.navigateTo('lessons')">Go to Lessons</button>`;
                     return;
                }
                App.DOM.els.pageContent.innerHTML = `
                    <div id="flashcard-practice">
                        <h2 class="text-center">Flashcards</h2>
                        <div id="flashcard-container"></div>
                        <div class="flashcard-actions d-flex justify-between" style="max-width: 500px; margin: 2rem auto;"></div>
                    </div>
                `;
                this.nextCard();
            },
            
            nextCard() {
                if (this.deck.length === 0) {
                    App.DOM.els.pageContent.innerHTML = `<div class="card text-center"><h2>Practice Complete!</h2><p>You've reviewed all cards for this session.</p><button class="btn btn-primary" onclick="App.Router.navigateTo('practice')">Back to Practice</button></div>`;
                    return;
                }
                this.currentCard = this.deck.pop();
                this.renderCard();
            },
            
            renderCard() {
                const cardContainer = document.getElementById('flashcard-container');
                cardContainer.innerHTML = `
                     <div class="flashcard" onclick="this.classList.toggle('flipped')">
                        <div class="flashcard-face flashcard-front">
                            <p class="ukrainian-text flashcard-word">${this.currentCard.ukrainian}</p>
                            <button class="btn btn-outline" onclick="event.stopPropagation(); App.Audio.speak('${this.currentCard.ukrainian}')">🔊</button>
                        </div>
                        <div class="flashcard-face flashcard-back">
                            <p><strong>${this.currentCard.english}</strong></p>
                            <p class="ipa-text">[${this.currentCard.ipa}]</p>
                            <p><em>${this.currentCard.example}</em></p>
                        </div>
                    </div>
                `;
                
                const actionsContainer = document.querySelector('.flashcard-actions');
                actionsContainer.innerHTML = `
                    <button class="btn btn-error" onclick="App.Practice.Flashcards.handleAnswer(0)">Review</button>
                    <button class="btn btn-secondary" onclick="App.Practice.Flashcards.handleAnswer(1)">Learning</button>
                    <button class="btn btn-success" onclick="App.Practice.Flashcards.handleAnswer(2)">Known</button>
                `;
            },
            
            handleAnswer(masteryLevel) {
                // In a real SRS, this would update the card's review schedule
                const vocabItem = App.data.vocabulary.find(v => v.ukrainian === this.currentCard.ukrainian);
                if(vocabItem) vocabItem.mastery = masteryLevel;
                App.User.addXP(masteryLevel + 1);
                App.DataManager.save('vocabulary');
                this.nextCard();
            }
        }
    },

    // --- DATA & CONTENT ---
    DataManager: {
        save(key) {
            try {
                localStorage.setItem(`solomiya_${key}`, JSON.stringify(App.data[key]));
            } catch (e) {
                console.error(`Failed to save ${key}:`, e);
            }
        },
        load(key) {
            try {
                const data = localStorage.getItem(`solomiya_${key}`);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                console.error(`Failed to load ${key}:`, e);
                return null;
            }
        },
        loadAll() {
            const user = this.load('userProfile');
            if (user) {
                App.data.userProfile = user;
                App.data.settings = this.load('settings');
                App.data.vocabulary = this.load('vocabulary');
                App.data.progress = this.load('progress');
                App.data.achievements = this.load('achievements');
                App.data.studyHistory = this.load('studyHistory');
            } else {
                // First time user
                App.data.userProfile = { name: 'Student', level: 'A1', xp: 0, streak: 0, longestStreak: 0, lastLogin: null, joinDate: new Date().toISOString() };
                App.data.settings = { theme: 'light', audioAutoplay: true };
                App.data.vocabulary = App.Content.getInitialVocabulary();
                App.data.progress = { lessonsCompleted: [], modulesCompleted: {}, quizzesCompleted: [] };
                App.data.achievements = [];
                App.data.studyHistory = [];
                this.saveAll();
            }
        },
        saveAll() {
            // Don't save content, as it's loaded from JSON
            const keysToSave = ['userProfile', 'settings', 'vocabulary', 'progress', 'achievements', 'studyHistory'];
            keysToSave.forEach(key => this.save(key));
        }
    },
    
    Content: {
        fullVocabulary: [],
        async init() {
            try {
                const response = await fetch('./data/content.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const contentData = await response.json();
                App.data.content.levels = contentData.levels;
                this.fullVocabulary = contentData.vocabulary;
                console.log("Content loaded from JSON.");
            } catch (error) {
                console.error("Failed to load content:", error);
                throw error; // Re-throw to be caught by the main init
            }
        },
        getInitialVocabulary() {
            return this.fullVocabulary.map(v => ({ ...v, mastery: 0, lastReviewed: null, timesCorrect: 0, timesIncorrect: 0 }));
        },
        getWordOfTheDay() {
            const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
            const vocab = this.fullVocabulary;
            if (!vocab || vocab.length === 0) return {ukrainian: "Слава", english: "Glory", ipa: "slava", example: "Слава Україні!"};
            return vocab[dayOfYear % vocab.length];
        },
    },
    
    // --- USER & GAMIFICATION ---
    User: {
        addXP(amount) {
            App.data.userProfile.xp += amount;
            App.UI.updateHeader();
            App.DataManager.save('userProfile');
            // Check for level up
        },
        checkDailyLogin() {
            const today = new Date().toDateString();
            const lastLogin = App.data.userProfile.lastLogin;
            
            if (today !== lastLogin) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                if (lastLogin === yesterday.toDateString()) {
                    App.data.userProfile.streak++;
                } else {
                    App.data.userProfile.streak = 1;
                }
                
                App.data.userProfile.lastLogin = today;
                this.addXP(5); // Daily login bonus
                App.UI.showToast(`Welcome back! +5 XP. Streak: ${App.data.userProfile.streak} days.`);
                App.DataManager.save('userProfile');
            }
             App.UI.updateHeader();
        },
        completeModule(levelId, moduleId) {
            if (!App.data.progress.modulesCompleted[levelId]) {
                App.data.progress.modulesCompleted[levelId] = [];
            }
            if (!App.data.progress.modulesCompleted[levelId].includes(moduleId)) {
                App.data.progress.modulesCompleted[levelId].push(moduleId);
                App.DataManager.save('progress');
            }
        },
        getModuleProgress(levelId, moduleId) {
            // For now, it's just completed or not. Could be more granular later.
            return App.data.progress.modulesCompleted[levelId]?.includes(moduleId) ? 100 : 0;
        }
    },

    // --- UI & FEEDBACK ---
    UI: {
        init() {
            this.setTheme(App.data.settings.theme, true);
            this.updateHeader();
        },
        updateActiveNav(page) {
            App.DOM.els.navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.page === page);
            });
        },
        updateHeader() {
            App.DOM.els.streakValue.innerText = App.data.userProfile.streak;
            App.DOM.els.xpValue.innerText = App.data.userProfile.xp;
            App.DOM.els.userProfileToggle.innerText = App.data.userProfile.name.charAt(0).toUpperCase();
        },
        setTheme(theme, isInitial = false) {
            document.body.dataset.theme = theme;
            App.DOM.els.darkModeCheckbox.checked = theme === 'dark';
            if(!isInitial) {
                App.data.settings.theme = theme;
                App.DataManager.save('settings');
                this.showToast(`Theme set to ${theme}`);
            }
        },
        showToast(message, type = 'success') {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.textContent = message;
            document.body.appendChild(toast);
            
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.background = type === 'error' ? 'var(--error-color)' : 'var(--primary-color)';
            toast.style.color = 'white';
            toast.style.padding = '1rem 2rem';
            toast.style.borderRadius = '8px';
            toast.style.zIndex = '9999';
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease, bottom 0.5s ease';
            
            setTimeout(() => { 
                toast.style.opacity = '1';
                toast.style.bottom = '40px';
            }, 100);
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.bottom = '20px';
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        },
        showError(message) {
            App.DOM.els.pageContent.innerHTML = `<div class="card text-center" style="border-color: var(--error-color);"><h2>An Error Occurred</h2><p>${message}</p></div>`;
        }
    },

    // --- AUDIO ---
    Audio: {
        speak(text) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel(); // Cancel any previous speech
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'uk-UA';
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
            } else {
                App.UI.showToast("Text-to-speech is not supported in your browser.", "error");
            }
        }
    }
};

// --- Start the App ---
document.addEventListener('DOMContentLoaded', () => {
    // Bind `this` for all methods within App modules
    for (const module of Object.values(App)) {
        if (typeof module === 'object' && module !== null) {
            for(const method of Object.keys(module)) {
                if(typeof module[method] === 'function') {
                    module[method] = module[method].bind(App);
                }
            }
        }
    }
    App.init();
});
