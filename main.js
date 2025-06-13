/* ==============================================
main.js
This file contains all the JavaScript for the FinFreedom website.
- Mobile Menu Toggle
- Rotating Message Handler
- Financial Health Quiz
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
        setInterval(changeMessage, 60000);
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
});
