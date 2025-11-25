// A utility function to make creating DOM elements easier
function createEl(tag, options = {}) {
    const el = document.createElement(tag);
    if (options.className) el.className = options.className;
    if (options.id) el.id = options.id;
    if (options.textContent) el.textContent = options.textContent;
    if (options.innerHTML) el.innerHTML = options.innerHTML;
    if (options.attributes) {
        for (const [key, value] of Object.entries(options.attributes)) {
            el.setAttribute(key, value);
        }
    }
    if (options.onClick) {
        el.addEventListener('click', options.onClick);
    }
    if (options.children && Array.isArray(options.children)) {
        options.children.forEach(child => child && el.appendChild(child));
    }
    return el;
}

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
            await this.Content.init();
            this.DataManager.loadAll();
            this.UI.init();
            await this.Router.navigateTo(this.data.currentPage, true);
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
            this.els.darkModeCheckbox = document.getElementById('dark-mode-checkbox');
            this.els.toastContainer = document.getElementById('toast-container');
        },
        addEventListeners() {
            this.els.sidebarToggle.addEventListener('click', () => this.els.sidebar.classList.toggle('collapsed'));
            this.els.mobileMenuBtn.addEventListener('click', () => this.els.sidebar.classList.toggle('open'));
            
            this.els.userProfileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.els.userProfileMenu.classList.toggle('open');
            });
            
            document.addEventListener('click', () => {
                this.els.userProfileMenu.classList.remove('open');
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

            // Add listeners for the new buttons in the user profile dropdown
            this.els.userProfileMenu.addEventListener('click', (e) => {
                if (e.target.dataset.page) {
                    App.Router.navigateTo(e.target.dataset.page);
                } else if (e.target.id === 'logout-btn') {
                    // Handle logout
                    App.UI.showToast("Logged out successfully.");
                }
            });
        }
    },

    // --- ROUTER ---
    Router: {
        async navigateTo(page, isInitial = false) {
            if (!page || (App.data.currentPage === page && !isInitial)) return;
            App.data.currentPage = page;
            
            const pageRenderer = App.Pages[page];
            App.DOM.els.pageContent.innerHTML = ''; // Clear previous content
            App.DOM.els.pageContent.appendChild(createEl('div', { className: 'loading-spinner' }));

            // Allow spinner to render
            await new Promise(resolve => setTimeout(resolve, 50));

            App.DOM.els.pageContent.innerHTML = ''; // Clear spinner

            if (pageRenderer) {
                pageRenderer.render();
                if (pageRenderer.init) {
                    pageRenderer.init();
                }
                App.UI.updateActiveNav(page);
            } else {
                App.DOM.els.pageContent.appendChild(createEl('h2', { textContent: `Page not found: ${page}` }));
            }
        },
    },

    // --- PAGE RENDERERS ---
    Pages: {
        home: {
            render() {
                const user = App.data.userProfile;
                const wordOfTheDay = App.Content.getWordOfTheDay();
                if (!user || !wordOfTheDay) {
                    App.DOM.els.pageContent.appendChild(createEl('div', { className: 'loading-spinner' }));
                    return;
                }

                App.DOM.els.pageContent.appendChild(
                    createEl('div', {
                        id: 'page-home',
                        children: [
                            createEl('div', {
                                className: 'welcome-header',
                                children: [
                                    createEl('h1', { textContent: `Привіт, ${user.name}!` }),
                                    createEl('p', { textContent: 'Welcome back! Ready to learn some Ukrainian?' })
                                ]
                            }),
                            createEl('div', {
                                className: 'stats-grid',
                                children: [
                                    createEl('div', { className: 'card', innerHTML: `<h4>Words Learned</h4><p class="ukrainian-text">${App.data.vocabulary.filter(v => v.mastery > 0).length}</p>` }),
                                    createEl('div', { className: 'card', innerHTML: `<h4>Modules Completed</h4><p class="ukrainian-text">${Object.values(App.data.progress.modulesCompleted).flat().length}</p>` }),
                                    createEl('div', { className: 'card', innerHTML: `<h4>Current Level</h4><p class="ukrainian-text">${user.level}</p>` })
                                ]
                            }),
                            createEl('div', {
                                className: 'card',
                                children: [
                                    createEl('h3', { textContent: 'Word of the Day' }),
                                    createEl('div', {
                                        className: 'd-flex justify-between align-center',
                                        children: [
                                            createEl('div', { innerHTML: `<p class="ukrainian-text">${wordOfTheDay.ukrainian}</p><p><em>${wordOfTheDay.english}</em></p>` }),
                                            createEl('button', {
                                                className: 'btn btn-outline',
                                                textContent: '🔊',
                                                attributes: { 'aria-label': 'Speak word' },
                                                onClick: () => App.Audio.speak(wordOfTheDay.ukrainian)
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                );
            }
        },
        lessons: {
             render() {
                const fragment = document.createDocumentFragment();
                const pageContainer = createEl('div', { id: 'page-lessons' });
                
                pageContainer.appendChild(createEl('h2', { textContent: 'Lessons' }));

                const levelSelector = createEl('div', { className: 'level-selector' });
                const levels = Object.keys(App.data.content.levels);
                levels.forEach(level => {
                    const levelData = App.data.content.levels[level];
                    const card = createEl('div', {
                        className: `card level-card ${level === App.data.currentLevel ? 'active' : ''}`,
                        innerHTML: `<h3>${level}</h3><p>${levelData.name}</p>`,
                        onClick: (e) => this.selectLevel(e, level)
                    });
                    levelSelector.appendChild(card);
                });
                pageContainer.appendChild(levelSelector);

                pageContainer.appendChild(createEl('h3', { id: 'module-list-header', textContent: `Modules for Level ${App.data.currentLevel}` }));
                
                const moduleGrid = createEl('div', { className: 'module-grid', id: 'module-grid-container' });
                pageContainer.appendChild(moduleGrid);
                
                fragment.appendChild(pageContainer);
                App.DOM.els.pageContent.appendChild(fragment);
                
                this.renderModules(App.data.currentLevel); // Initial module render
            },
            renderModules(level) {
                const container = document.getElementById('module-grid-container');
                container.innerHTML = ''; // Clear previous modules
                const modules = App.data.content.levels[level]?.modules || [];

                if (modules.length === 0) {
                    container.appendChild(createEl('div', { className: 'card', innerHTML: `<p>Modules for level ${level} are coming soon!</p>` }));
                    return;
                }

                modules.forEach((mod, index) => {
                    const card = createEl('div', {
                        className: 'card module-card',
                        children: [
                            createEl('div', { className: 'module-content', innerHTML: `<h4>${mod.title}</h4><p>${mod.description}</p>` }),
                            createEl('div', {
                                className: 'module-footer',
                                children: [
                                    createEl('div', { className: 'progress-bar', innerHTML: `<div class="progress-bar-inner" style="width: ${App.User.getModuleProgress(level, index)}%;"></div>` }),
                                    createEl('button', { className: 'btn btn-primary', textContent: 'Start', onClick: () => this.startLesson(level, index, 0) })
                                ]
                            })
                        ]
                    });
                     container.appendChild(card);
                });
            },
            selectLevel(event, level) {
                App.data.currentLevel = level;
                document.getElementById('module-list-header').innerText = `Modules for Level ${level}`;
                document.querySelectorAll('.level-card').forEach(c => c.classList.remove('active'));
                event.currentTarget.classList.add('active');
                this.renderModules(level);
            },
            startLesson(levelId, moduleId, lessonIndex) {
                const module = App.data.content.levels[levelId].modules[moduleId];
                const lesson = module.lessons[lessonIndex];
                
                const fragment = document.createDocumentFragment();
                const lessonView = createEl('div', { id: 'lesson-view' });

                lessonView.append(
                    createEl('div', { className: 'lesson-header', innerHTML: `<h2>${lesson.title}</h2><span>${lessonIndex + 1} / ${module.lessons.length}</span>` }),
                    createEl('div', { className: 'progress-bar mb-3', innerHTML: `<div class="progress-bar-inner" style="width: ${((lessonIndex + 1) / module.lessons.length) * 100}%;"></div>` }),
                    createEl('div', { className: 'card lesson-content', innerHTML: lesson.content })
                );

                const nav = createEl('div', { className: 'lesson-nav' });
                if (lessonIndex > 0) {
                    nav.appendChild(createEl('button', { className: 'btn btn-outline', textContent: 'Previous', onClick: () => this.startLesson(levelId, moduleId, lessonIndex - 1) }));
                } else {
                    nav.appendChild(createEl('div'));
                }

                if (lessonIndex < module.lessons.length - 1) {
                    nav.appendChild(createEl('button', { className: 'btn btn-primary', textContent: 'Next', onClick: () => this.startLesson(levelId, moduleId, lessonIndex + 1) }));
                } else {
                    nav.appendChild(createEl('button', { className: 'btn btn-success', textContent: 'Finish Module', onClick: () => this.finishModule(levelId, moduleId) }));
                }
                lessonView.appendChild(nav);
                
                fragment.appendChild(lessonView);
                App.DOM.els.pageContent.innerHTML = '';
                App.DOM.els.pageContent.appendChild(fragment);
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
                 App.DOM.els.pageContent.append(
                    createEl('div', { id: 'page-practice', 
                        children: [
                        createEl('h2', { textContent: 'Practice Zone' }),
                        createEl('div', { className: 'module-grid', children: [
                            createEl('div', { className: 'card practice-card', style: 'cursor: pointer;', innerHTML: `<h4>Flashcards</h4><p>Review vocabulary with spaced repetition.</p>`, onClick: () => App.Practice.start('flashcards') }),
                            createEl('div', { className: 'card practice-card', style: 'cursor: pointer;', innerHTML: `<h4>Pronunciation</h4><p>Record and compare your pronunciation.</p>`, onClick: () => App.Practice.start('pronunciation') }),
                            createEl('div', { className: 'card practice-card', style: 'cursor: pointer;', innerHTML: `<h4>Vocabulary Quiz</h4><p>Test your knowledge with various quiz types.</p>`, onClick: () => App.Practice.start('quiz') })
                        ]})
                    ]})
                 );
            }
        },
        _createComingSoonPage(title, text) {
            return {
                render() {
                    App.DOM.els.pageContent.appendChild(
                        createEl('div', { className: 'card', children: [
                            createEl('h2', { textContent: `${title} (Coming Soon)` }),
                            createEl('p', { textContent: text })
                        ]})
                    );
                }
            };
        },
        community: null, // Will be initialized below
        progress: null,
        resources: null,
        settings: null,
    },
    
    // --- PRACTICE MODULES ---
    Practice: {
         start(type) {
            App.DOM.els.pageContent.innerHTML = ''; // Clear page
            switch(type) {
                case 'flashcards':
                    this.Flashcards.start();
                    break;
                default:
                    App.DOM.els.pageContent.appendChild(createEl('div', { className: 'card', innerHTML: `<h2>${type} practice is not available yet.</h2>` }));
            }
        },
        
        Flashcards: {
            currentCard: null,
            deck: [],
            
            start() {
                this.deck = [...App.data.vocabulary].sort(() => 0.5 - Math.random()).slice(0, 10);
                if (this.deck.length === 0) {
                     App.DOM.els.pageContent.append(
                         createEl('h2', { textContent: 'No Vocabulary Found' }),
                         createEl('p', { textContent: 'Start some lessons to build your vocabulary list first.' }),
                         createEl('button', { className: 'btn btn-primary', textContent: 'Go to Lessons', onClick: () => App.Router.navigateTo('lessons') })
                     );
                     return;
                }
                
                App.DOM.els.pageContent.append(
                    createEl('div', { id: 'flashcard-practice', children: [
                        createEl('h2', { className: 'text-center', textContent: 'Flashcards' }),
                        createEl('div', { id: 'flashcard-container' }),
                        createEl('div', { className: 'flashcard-actions d-flex justify-between', style: 'max-width: 500px; margin: 2rem auto;' })
                    ]})
                );
                this.nextCard();
            },
            
            nextCard() {
                if (this.deck.length === 0) {
                    App.DOM.els.pageContent.innerHTML = '';
                    App.DOM.els.pageContent.appendChild(
                        createEl('div', { className: 'card text-center', children: [
                            createEl('h2', { textContent: 'Practice Complete!' }),
                            createEl('p', { textContent: "You've reviewed all cards for this session." }),
                            createEl('button', { className: 'btn btn-primary', textContent: 'Back to Practice', onClick: () => App.Router.navigateTo('practice') })
                        ]})
                    );
                    return;
                }
                this.currentCard = this.deck.pop();
                this.renderCard();
            },
            
            renderCard() {
                const cardContainer = document.getElementById('flashcard-container');
                cardContainer.innerHTML = '';
                
                const flashcard = createEl('div', {
                    className: 'flashcard',
                    onClick: (e) => e.currentTarget.classList.toggle('flipped'),
                    children: [
                        createEl('div', { className: 'flashcard-face flashcard-front', children: [
                            createEl('p', { className: 'ukrainian-text flashcard-word', textContent: this.currentCard.ukrainian }),
                            createEl('button', { className: 'btn btn-outline', textContent: '🔊', attributes: { 'aria-label': 'Speak word' }, onClick: (e) => { e.stopPropagation(); App.Audio.speak(this.currentCard.ukrainian); } })
                        ]}),
                        createEl('div', { className: 'flashcard-face flashcard-back', innerHTML: `<p><strong>${this.currentCard.english}</strong></p><p class="ipa-text">[${this.currentCard.ipa}]</p><p><em>${this.currentCard.example}</em></p>`})
                    ]
                });
                cardContainer.appendChild(flashcard);
                
                const actionsContainer = document.querySelector('.flashcard-actions');
                actionsContainer.innerHTML = '';
                actionsContainer.append(
                    createEl('button', { className: 'btn btn-error', textContent: 'Review', onClick: () => this.handleAnswer(0) }),
                    createEl('button', { className: 'btn btn-secondary', textContent: 'Learning', onClick: () => this.handleAnswer(1) }),
                    createEl('button', { className: 'btn btn-success', textContent: 'Known', onClick: () => this.handleAnswer(2) })
                );
            },
            
            handleAnswer(masteryLevel) {
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
                App.data.settings = this.load('settings') || { theme: 'dark', audioAutoplay: true };
                App.data.vocabulary = this.load('vocabulary') || [];
                App.data.progress = this.load('progress') || { lessonsCompleted: [], modulesCompleted: {}, quizzesCompleted: [] };
                App.data.achievements = this.load('achievements') || [];
                App.data.studyHistory = this.load('studyHistory') || [];
            } else {
                // First time user
                App.data.userProfile = { name: 'Student', level: 'A1', xp: 0, streak: 0, longestStreak: 0, lastLogin: null, joinDate: new Date().toISOString() };
                App.data.settings = { theme: 'dark', audioAutoplay: true };
                App.data.vocabulary = App.Content.getInitialVocabulary();
                App.data.progress = { lessonsCompleted: [], modulesCompleted: {}, quizzesCompleted: [] };
                App.data.achievements = [];
                App.data.studyHistory = [];
                this.saveAll();
            }
        },
        saveAll() {
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
                throw error;
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
            const toast = createEl('div', { className: `toast toast-${type}`, textContent: message });
            App.DOM.els.toastContainer.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('show');
            }, 100);

            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        },
        showError(message) {
            App.DOM.els.pageContent.innerHTML = '';
            App.DOM.els.pageContent.appendChild(
                createEl('div', { className: 'card text-center', style: 'border-color: var(--error-color);', children: [
                    createEl('h2', { textContent: 'An Error Occurred' }),
                    createEl('p', { textContent: message })
                ]})
            );
        }
    },

    // --- AUDIO ---
    Audio: {
        speak(text) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
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

// --- Initialize Pages & Start App ---
App.Pages.community = App.Pages._createComingSoonPage('Community', 'Connect with other learners, find language partners, and join study groups.');
App.Pages.progress = App.Pages._createComingSoonPage('My Progress', 'Track your learning journey, view achievements, and set goals.');
App.Pages.resources = App.Pages._createComingSoonPage('Resources', 'Find useful links, grammar tables, and cultural notes.');
App.Pages.settings = App.Pages._createComingSoonPage('Settings', 'Manage your account, preferences, and data.');

document.addEventListener('DOMContentLoaded', () => App.init());
