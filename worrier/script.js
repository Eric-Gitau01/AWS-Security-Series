document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const streakElement = document.getElementById('streak');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const logBtn = document.getElementById('log-btn');
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const historyList = document.getElementById('history-list');
    const milestones = document.querySelectorAll('.milestone');

    // State
    let streak = localStorage.getItem('nofapStreak') ? parseInt(localStorage.getItem('nofapStreak')) : 0;
    let lastLoggedDate = localStorage.getItem('nofapLastDate') || '';
    let challengeStarted = localStorage.getItem('nofapStarted') === 'true';

    // Motivational quotes
    const quotes = [
        {
            quote: "Discipline is choosing between what you want now and what you want most.",
            author: "Abraham Lincoln"
        },
        {
            quote: "You are stronger than your urges.",
            author: "Unknown"
        },
        {
            quote: "Every day is a new opportunity to become a better version of yourself.",
            author: "Unknown"
        },
        {
            quote: "The pain of discipline is less than the pain of regret.",
            author: "Unknown"
        },
        {
            quote: "Your future self will thank you for the sacrifices you make today.",
            author: "Unknown"
        }
    ];

    // Initialize
    updateUI();
    displayRandomQuote();
    checkDayPassed();

    // Event Listeners
    startBtn.addEventListener('click', startChallenge);
    resetBtn.addEventListener('click', resetChallenge);
    logBtn.addEventListener('click', logDay);

    // Functions
    function updateUI() {
        streakElement.textContent = streak;
        const progressPercentage = Math.min(Math.floor((streak / 90) * 100), 100);
        progressFill.style.width = `${progressPercentage}%`;
        progressText.textContent = `${progressPercentage}% Complete`;

        // Update milestone colors
        milestones.forEach(milestone => {
            const days = parseInt(milestone.getAttribute('data-days'));
            if (streak >= days) {
                milestone.style.backgroundColor = '#2ecc71'; // Green for achieved
            } else {
                milestone.style.backgroundColor = '#3498db'; // Blue for not achieved
            }
        });

        // Update button states
        if (challengeStarted) {
            startBtn.disabled = true;
            startBtn.textContent = 'Challenge Started';
            startBtn.style.backgroundColor = '#95a5a6';
        }

        // Update history
        updateHistory();
    }

    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex].quote;
        authorElement.textContent = `- ${quotes[randomIndex].author}`;
    }

    function startChallenge() {
        challengeStarted = true;
        localStorage.setItem('nofapStarted', 'true');
        streak = 1;
        lastLoggedDate = new Date().toISOString().split('T')[0];
        localStorage.setItem('nofapStreak', streak.toString());
        localStorage.setItem('nofapLastDate', lastLoggedDate);
        updateUI();
        alert('Challenge started! Stay strong!');
    }

    function resetChallenge() {
        if (confirm('Are you sure you want to reset your progress?')) {
            streak = 0;
            challengeStarted = false;
            lastLoggedDate = '';
            localStorage.removeItem('nofapStreak');
            localStorage.removeItem('nofapLastDate');
            localStorage.removeItem('nofapStarted');
            updateUI();
            alert('Progress reset. You can start fresh whenever you\'re ready!');
        }
    }

    function logDay() {
        if (!challengeStarted) {
            alert('Please start the challenge first!');
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        
        if (lastLoggedDate === today) {
            alert('You already logged today!');
            return;
        }

        streak++;
        lastLoggedDate = today;
        localStorage.setItem('nofapStreak', streak.toString());
        localStorage.setItem('nofapLastDate', lastLoggedDate);
        updateUI();
        displayRandomQuote();
        alert('Great job! Keep going!');
    }

    function checkDayPassed() {
        if (!lastLoggedDate) return;

        const lastDate = new Date(lastLoggedDate);
        const today = new Date();
        const diffTime = today - lastDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 1) {
            // More than one day passed since last log
            if (confirm(`You missed ${diffDays} days. Do you want to reset your streak?`)) {
                resetChallenge();
            }
        }
    }

    function updateHistory() {
        historyList.innerHTML = '';
        
        if (streak === 0) {
            historyList.innerHTML = '<div class="history-item">No history yet. Start your challenge!</div>';
            return;
        }

        for (let i = 1; i <= streak; i++) {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const dayText = document.createElement('span');
            dayText.textContent = `Day ${i}`;
            
            const statusText = document.createElement('span');
            statusText.textContent = 'Completed';
            statusText.style.color = '#2ecc71';
            
            historyItem.appendChild(dayText);
            historyItem.appendChild(statusText);
            historyList.appendChild(historyItem);
        }
    }

    // Change quote every 10 seconds
    setInterval(displayRandomQuote, 10000);
});