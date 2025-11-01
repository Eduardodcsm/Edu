/* ==============================================
main.js
This file contains all the JavaScript for the FinFreedom website.
- Mobile Menu Toggle
- Rotating Message Handler
- Financial Health Quiz
- Mindset Self-Assessment Quiz
==============================================
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Handler ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Rotating Message Handler ---
    const messageElement = document.getElementById('rotating-message-text');

    if (messageElement) {
        const messages = [
            '"A budget is telling your money where to go, instead of wondering where it went."',
            '"Do not save what is left after spending, but spend what is left after saving."',
            '"An investment in knowledge pays the best interest."',
            '"Time is more valuable than money. You can get more money, but you cannot get more time."',
            '"It\'s not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for."',
            '"The stock market is a device for transferring money from the impatient to the patient."',
            '"Financial peace isn\'t the acquisition of stuff. It’s learning to live on less than you make."',
            '"You must gain control over your money or the lack of it will forever control you."'
        ];
        let messageIndex = 0;
        const changeMessage = () => {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.textContent = messages[messageIndex];
                messageIndex = (messageIndex + 1) % messages.length;
                messageElement.style.opacity = '1';
            }, 500);
        };
        changeMessage();
        setInterval(changeMessage, 6000); // Changed from 60000ms to 6000ms
    }

    // --- Financial Health Quiz Handler ---
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        const quizQuestions = [
            {
                question: "How often do you track your spending?",
                options: [
                    { text: "Regularly (daily/weekly)", score: 3 },
                    { text: "Sometimes (monthly/occasionally)", score: 2 },
                    { text: "Rarely or never", score: 1 }
                ]
            },
            {
                question: "Do you have an emergency fund that covers at least 3 months of living expenses?",
                options: [
                    { text: "Yes, fully funded", score: 3 },
                    { text: "Partially, I'm still building it", score: 2 },
                    { text: "No, I don't have one", score: 1 }
                ]
            },
            {
                question: "How much of your income do you save or invest each month?",
                options: [
                    { text: "15% or more", score: 3 },
                    { text: "5% to 14%", score: 2 },
                    { text: "Less than 5% or nothing", score: 1 }
                ]
            },
            {
                question: "Regarding high-interest debt (like credit cards), you...",
                options: [
                    { text: "Have none or pay it off in full every month", score: 3 },
                    { text: "Carry a balance sometimes", score: 2 },
                    { text: "Consistently carry a balance and pay interest", score: 1 }
                ]
            }
        ];

        let quizHTML = '';
        quizQuestions.forEach((q, index) => {
            quizHTML += `<div class="quiz-question">`;
            quizHTML += `<p class="font-semibold text-lg mb-4">${index + 1}. ${q.question}</p>`;
            quizHTML += `<div class="quiz-options" data-question-index="${index}">`;
            q.options.forEach((opt, optIndex) => {
                quizHTML += `
                    <input type="radio" id="q${index}_opt${optIndex}" name="question${index}" value="${opt.score}">
                    <label for="q${index}_opt${optIndex}">${opt.text}</label>
                `;
            });
            quizHTML += `</div></div>`;
        });
        quizHTML += `<button id="submit-quiz-btn">See My Results</button>`;
        quizContainer.innerHTML = quizHTML;

        const submitButton = document.getElementById('submit-quiz-btn');
        submitButton.addEventListener('click', () => {
            let totalScore = 0;
            let questionsAnswered = 0;
            quizQuestions.forEach((_, index) => {
                const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
                if (selectedOption) {
                    totalScore += parseInt(selectedOption.value);
                    questionsAnswered++;
                }
            });

            if (questionsAnswered < quizQuestions.length) {
                alert('Please answer all questions to see your results.');
                return;
            }

            displayResults(totalScore);
        });

        const displayResults = (score) => {
            const resultsContainer = document.getElementById('quiz-results');
            let resultHTML = '';

            if (score >= 10) { // Good
                resultHTML = `
                    <div class="result-good p-6 rounded-lg">
                        <h3 class="font-bold text-2xl mb-2 text-green-800">Excellent Financial Shape!</h3>
                        <p class="text-green-700">You have strong financial habits. You're in control of your spending, saving well, and managing debt effectively. Your focus should be on optimizing your investments and long-term strategy.</p>
                    </div>
                `;
            } else if (score >= 6) { // Average
                resultHTML = `
                    <div class="result-average p-6 rounded-lg">
                        <h3 class="font-bold text-2xl mb-2 text-yellow-800">On the Right Track, But Room to Grow.</h3>
                        <p class="text-yellow-700">You're doing some things right, but there are key areas for improvement. Focus on making your budgeting more consistent, accelerating your emergency fund savings, and creating a clear plan to eliminate high-interest debt.</p>
                    </div>
                `;
            } else { // Needs Improvement
                resultHTML = `
                    <div class="result-improve p-6 rounded-lg">
                        <h3 class="font-bold text-2xl mb-2 text-red-800">Time for a Financial Reset.</h3>
                        <p class="text-red-700">Your current habits are holding you back from your financial goals. The good news is you can change this, starting now. Your absolute first step is to create and stick to a detailed budget. This page is the perfect place to start.</p>
                    </div>
                `;
            }
            resultsContainer.innerHTML = resultHTML;
            resultsContainer.classList.remove('hidden');
            quizContainer.classList.add('hidden');
        };
    }

    // --- Mindset Self-Assessment Quiz Handler ---
    const mindsetQuizContainer = document.getElementById('mindset-quiz-container');
    if (mindsetQuizContainer) {
        const mindsetQuizQuestions = [
            {
                question: "When you think about money, you primarily feel:",
                options: [
                    { text: "Anxious and stressed, worried about not having enough.", score: 1 },
                    { text: "Neutral, it's just a tool.", score: 2 },
                    { text: "Hopeful and excited, focused on the opportunities it creates.", score: 3 }
                ]
            },
            {
                question: "You receive an unexpected $1,000 bonus. What's your first instinct?",
                options: [
                    { text: "Spend it on something you've been wanting.", score: 1 },
                    { text: "Save it for a rainy day.", score: 2 },
                    { text: "Invest it or use it to pay down debt.", score: 3 }
                ]
            },
            {
                question: "How often do you read books or listen to podcasts about finance and personal growth?",
                options: [
                    { text: "Rarely or never.", score: 1 },
                    { text: "Occasionally, when something catches my eye.", score: 2 },
                    { text: "Regularly, I actively seek out new knowledge.", score: 3 }
                ]
            },
            {
                question: "When you see a wealthy person, your first thought is often:",
                options: [
                    { text: "'They probably got lucky or had unfair advantages.'", score: 1 },
                    { text: "'Good for them, but that's not achievable for me.'", score: 2 },
                    { text: "'I wonder what I can learn from their journey.'", score: 3 }
                ]
            }
        ];

        let mindsetQuizHTML = '';
        mindsetQuizQuestions.forEach((q, index) => {
            mindsetQuizHTML += `<div class="quiz-question">`;
            mindsetQuizHTML += `<p class="font-semibold text-lg mb-4">${index + 1}. ${q.question}</p>`;
            mindsetQuizHTML += `<div class="quiz-options" data-question-index="${index}">`;
            q.options.forEach((opt, optIndex) => {
                mindsetQuizHTML += `
                    <input type="radio" id="mq${index}_opt${optIndex}" name="mquestion${index}" value="${opt.score}">
                    <label for="mq${index}_opt${optIndex}">${opt.text}</label>
                `;
            });
            mindsetQuizHTML += `</div></div>`;
        });
        mindsetQuizHTML += `<button id="submit-mindset-quiz-btn">Reveal My Mindset</button>`;
        mindsetQuizContainer.innerHTML = mindsetQuizHTML;

        const submitMindsetButton = document.getElementById('submit-mindset-quiz-btn');
        submitMindsetButton.addEventListener('click', () => {
            let totalScore = 0;
            let questionsAnswered = 0;
            mindsetQuizQuestions.forEach((_, index) => {
                const selectedOption = document.querySelector(`input[name="mquestion${index}"]:checked`);
                if (selectedOption) {
                    totalScore += parseInt(selectedOption.value);
                    questionsAnswered++;
                }
            });

            if (questionsAnswered < mindsetQuizQuestions.length) {
                alert('Please answer all questions to see your results.');
                return;
            }

            displayMindsetResults(totalScore);
        });

        const displayMindsetResults = (score) => {
            const resultsContainer = document.getElementById('mindset-quiz-results');
            let resultHTML = '';

            if (score >= 10) { // Abundance Mindset
                resultHTML = `
                    <div class="result-good p-6 rounded-lg">
                        <h3 class="font-bold text-2xl mb-2 text-green-800">Abundance Mindset!</h3>
                        <p class="text-green-700">You see the world as full of opportunities. You believe in your ability to grow, learn, and create wealth. You focus on possibilities, not limitations. Keep cultivating this mindset, as it's the fertile ground for financial success.</p>
                    </div>
                `;
            } else if (score >= 6) { // Mixed Mindset
                resultHTML = `
                    <div class="result-average p-6 rounded-lg">
                        <h3 class="font-bold text-2xl mb-2 text-yellow-800">A Mix of Scarcity and Abundance.</h3>
                        <p class="text-yellow-700">You have moments of both scarcity and abundance thinking. While you see potential, you're sometimes held back by fear or limiting beliefs. Your goal is to consciously challenge your scarcity thoughts and choose the abundance perspective more often.</p>
                    </div>
                `;
            } else { // Scarcity Mindset
                resultHTML = `
                    <div class="result-improve p-6 rounded-lg">
                        <h3 class="font-bold text-2xl mb-2 text-red-800">Primarily a Scarcity Mindset.</h3>
                        <p class="text-red-700">Your thoughts about money are likely dominated by fear, anxiety, and a belief in limitation. This mindset can sabotage your financial progress. The first step is awareness. Recognize these thoughts and begin to challenge them. Focus on gratitude and small, positive financial actions.</p>
                    </div>
                `;
            }
            resultsContainer.innerHTML = resultHTML;
            resultsContainer.classList.remove('hidden');
            mindsetQuizContainer.classList.add('hidden');
        };
    }
});
