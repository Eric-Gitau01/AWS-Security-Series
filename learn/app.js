document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeBtn = document.getElementById('themeBtn');
    const dailyQuote = document.getElementById('dailyQuote');
    const calendar = document.getElementById('calendar');
    const currentMonthEl = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const selectedDateEl = document.getElementById('selectedDate');
    const codingHours = document.getElementById('codingHours');
    const webflowHours = document.getElementById('webflowHours');
    const designHours = document.getElementById('designHours');
    const dailyNotes = document.getElementById('dailyNotes');
    const saveNotesBtn = document.getElementById('saveNotes');
    const roadmapContainer = document.getElementById('roadmapContainer');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Progress elements
    const overallProgress = document.getElementById('overallProgress');
    const overallPercentage = document.getElementById('overallPercentage');
    const codingProgress = document.getElementById('codingProgress');
    const codingPercentage = document.getElementById('codingPercentage');
    const webflowProgress = document.getElementById('webflowProgress');
    const webflowPercentage = document.getElementById('webflowPercentage');
    const designProgress = document.getElementById('designProgress');
    const designPercentage = document.getElementById('designPercentage');
    
    // State variables
    let currentDate = new Date();
    let selectedDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let startDate = new Date(); // Today is day 1 of the journey
    
    // Motivational quotes
    const quotes = [
        "The expert in anything was once a beginner.",
        "Consistency is the key to mastery. Keep showing up!",
        "Every hour you spend learning compounds over time.",
        "The only way to learn is to do. The only way to improve is to do better.",
        "Small daily improvements lead to stunning results.",
        "You don't have to be great to start, but you have to start to be great.",
        "The future belongs to those who learn more skills and combine them in creative ways.",
        "Learning is the only thing the mind never exhausts, never fears, and never regrets.",
        "The beautiful thing about learning is that nobody can take it away from you.",
        "Skill is only developed by hours and hours of work.",
        "Design is not just what it looks like and feels like. Design is how it works.",
        "The best way to predict the future is to create it.",
        "Your work is going to fill a large part of your life, so do what you love.",
        "The more you learn, the more you earn.",
        "Code is like humor. When you have to explain it, it's bad."
    ];
    
    // UI/UX Roadmap data
    const roadmapData = [
        {
            week: 1,
            title: "Week 1: Design Fundamentals",
            days: [
                { day: 1, topic: "Design Principles", activity: "Study contrast, alignment, hierarchy" },
                { day: 2, topic: "Color Theory", activity: "Color psychology and palettes" },
                { day: 3, topic: "Typography", activity: "Font pairing and readability" },
                { day: 4, topic: "UI Patterns", activity: "Common UI components study" },
                { day: 5, topic: "Design Tools", activity: "Figma basics and shortcuts" }
            ]
        },
        {
            week: 2,
            title: "Week 2: User Research",
            days: [
                { day: 6, topic: "User Personas", activity: "Create sample personas" },
                { day: 7, topic: "User Journeys", activity: "Map basic user flows" },
                { day: 8, topic: "Usability Principles", activity: "Study Nielsen's heuristics" },
                { day: 9, topic: "Wireframing", activity: "Low-fidelity wireframe practice" },
                { day: 10, topic: "Feedback Loops", activity: "Conduct a mock user test" }
            ]
        },
        {
            week: 3,
            title: "Week 3: Interaction Design",
            days: [
                { day: 11, topic: "Microinteractions", activity: "Design button states" },
                { day: 12, topic: "Transitions", activity: "Create animation prototypes" },
                { day: 13, topic: "Responsive Design", activity: "Adapt layouts for breakpoints" },
                { day: 14, topic: "Accessibility", activity: "WCAG guidelines study" },
                { day: 15, topic: "Design Systems", activity: "Create a style guide" }
            ]
        },
        // Additional weeks would continue here...
        {
            week: 4,
            title: "Week 4: Advanced Tools",
            days: [
                { day: 16, topic: "Figma Advanced", activity: "Components and variants" },
                { day: 17, topic: "Prototyping", activity: "Create interactive prototypes" },
                { day: 18, topic: "Plugins", activity: "Explore useful Figma plugins" },
                { day: 19, topic: "Collaboration", activity: "Team libraries practice" },
                { day: 20, topic: "Design Handoff", activity: "Prepare developer specs" }
            ]
        }
    ];
    
    // Initialize the app
    init();
    
    function init() {
        // Set up event listeners
        themeBtn.addEventListener('click', toggleTheme);
        prevMonthBtn.addEventListener('click', () => navigateMonth(-1));
        nextMonthBtn.addEventListener('click', () => navigateMonth(1));
        saveNotesBtn.addEventListener('click', saveDailyData);
        
        // Hour input buttons
        document.querySelectorAll('.hour-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const task = this.dataset.task;
                const input = document.getElementById(`${task}Hours`);
                const isPlus = this.classList.contains('plus');
                let value = parseInt(input.value);
                
                if (isPlus) {
                    input.value = Math.min(value + 1, parseInt(input.max));
                } else {
                    input.value = Math.max(value - 1, 0);
                }
                
                updateDayProgress();
            });
        });
        
        // Hour input direct changes
        codingHours.addEventListener('change', updateDayProgress);
        webflowHours.addEventListener('change', updateDayProgress);
        designHours.addEventListener('change', updateDayProgress);
        
        // Tab switching
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                
                // Update active tab button
                tabBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update active tab content
                tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Load saved data
        loadProgressData();
        
        // Display a random quote
        displayRandomQuote();
        
        // Generate calendar
        generateCalendar();
        
        // Generate roadmap
        generateRoadmap();
        
        // Update UI for today
        updateSelectedDateUI();
        
        // Update progress bars
        updateProgressBars();
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        dailyQuote.textContent = `"${quotes[randomIndex]}"`;
    }
    
    function generateCalendar() {
        // Clear previous calendar
        calendar.innerHTML = '';
        
        // Add day headers
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-header';
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });
        
        // Get first day of month and total days in month
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day empty';
            calendar.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            
            // Check if this day is in the 90-day journey
            const dayDiff = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
            
            if (dayDiff < 0) {
                dayElement.classList.add('before-start');
                dayElement.innerHTML = `<div class="day-number">${day}</div>`;
            } else if (dayDiff >= 90) {
                dayElement.classList.add('after-end');
                dayElement.innerHTML = `<div class="day-number">${day}</div>`;
            } else {
                dayElement.innerHTML = `
                    <div class="day-number">${day}</div>
                    <div class="day-status" id="day-${day}-status"></div>
                `;
                
                // Check if this is today
                if (date.toDateString() === new Date().toDateString()) {
                    dayElement.classList.add('today');
                }
                
                // Check if this day is in the future
                if (date > new Date()) {
                    dayElement.classList.add('future');
                }
                
                // Add click event to select this day
                dayElement.addEventListener('click', () => {
                    selectedDate = date;
                    updateSelectedDateUI();
                });
                
                // Update day status based on progress
                updateDayStatus(dayElement, date);
            }
            
            calendar.appendChild(dayElement);
        }
        
        // Update month display
        const monthNames = ["January", "February", "March", "April", "May", "June", 
                           "July", "August", "September", "October", "November", "December"];
        currentMonthEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
    
    function navigateMonth(direction) {
        currentMonth += direction;
        
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        
        generateCalendar();
    }
    
    function generateRoadmap() {
        roadmapContainer.innerHTML = '';
        
        roadmapData.forEach(week => {
            const weekElement = document.createElement('div');
            weekElement.className = 'roadmap-week';
            
            const weekHeader = document.createElement('div');
            weekHeader.className = 'week-header';
            weekHeader.innerHTML = `
                <h3>${week.title}</h3>
                <i class="fas fa-chevron-down"></i>
            `;
            
            const weekContent = document.createElement('div');
            weekContent.className = 'week-content';
            
            week.days.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.className = 'roadmap-day';
                dayElement.innerHTML = `
                    <h4>Day ${day.day}: ${day.topic}</h4>
                    <p>${day.activity}</p>
                `;
                weekContent.appendChild(dayElement);
            });
            
            weekHeader.addEventListener('click', function() {
                weekContent.style.display = weekContent.style.display === 'none' ? 'grid' : 'none';
                this.querySelector('i').classList.toggle('fa-chevron-up');
                this.querySelector('i').classList.toggle('fa-chevron-down');
            });
            
            weekElement.appendChild(weekHeader);
            weekElement.appendChild(weekContent);
            roadmapContainer.appendChild(weekElement);
        });
    }
    
    function updateSelectedDateUI() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        selectedDateEl.textContent = selectedDate.toLocaleDateString(undefined, options);
        
        // Load data for selected date
        loadDayProgress();
        
        // Load notes for selected date
        loadDailyNotes();
    }
    
    function updateDayStatus(dayElement, date) {
        const dateKey = date.toISOString().split('T')[0];
        const progressData = JSON.parse(localStorage.getItem('progressData')) || {};
        const dayData = progressData[dateKey] || {};
        
        if (dayData.hours) {
            const hasCoding = dayData.hours.coding > 0;
            const hasWebflow = dayData.hours.webflow > 0;
            const hasDesign = dayData.hours.design > 0;
            
            if (hasCoding && hasWebflow && hasDesign) {
                dayElement.classList.add('completed');
                dayElement.querySelector('.day-status').textContent = '✓✓✓';
            } else if (hasCoding || hasWebflow || hasDesign) {
                dayElement.classList.add('partial');
                let status = '';
                if (hasCoding) status += '✓';
                if (hasWebflow) status += '✓';
                if (hasDesign) status += '✓';
                dayElement.querySelector('.day-status').textContent = status;
            }
        }
    }
    
    function loadDayProgress() {
        const dateKey = selectedDate.toISOString().split('T')[0];
        const progressData = JSON.parse(localStorage.getItem('progressData')) || {};
        const dayData = progressData[dateKey] || { hours: { coding: 0, webflow: 0, design: 0 } };
        
        codingHours.value = dayData.hours.coding || 0;
        webflowHours.value = dayData.hours.webflow || 0;
        designHours.value = dayData.hours.design || 0;
        
        // Disable inputs for future dates
        const isFuture = selectedDate > new Date();
        codingHours.disabled = isFuture;
        webflowHours.disabled = isFuture;
        designHours.disabled = isFuture;
        document.querySelectorAll('.hour-btn').forEach(btn => {
            btn.disabled = isFuture;
        });
    }
    
    function updateDayProgress() {
        const dateKey = selectedDate.toISOString().split('T')[0];
        const progressData = JSON.parse(localStorage.getItem('progressData')) || {};
        
        progressData[dateKey] = {
            hours: {
                coding: parseInt(codingHours.value) || 0,
                webflow: parseInt(webflowHours.value) || 0,
                design: parseInt(designHours.value) || 0
            }
        };
        
        localStorage.setItem('progressData', JSON.stringify(progressData));
        
        // Update calendar day status
        generateCalendar();
        
        // Update progress bars
        updateProgressBars();
    }
    
    function loadDailyNotes() {
        const dateKey = selectedDate.toISOString().split('T')[0];
        const notesData = JSON.parse(localStorage.getItem('dailyNotes')) || {};
        dailyNotes.value = notesData[dateKey] || '';
    }
    
    function saveDailyData() {
        const dateKey = selectedDate.toISOString().split('T')[0];
        const notesData = JSON.parse(localStorage.getItem('dailyNotes')) || {};
        
        // Save notes
        notesData[dateKey] = dailyNotes.value;
        localStorage.setItem('dailyNotes', JSON.stringify(notesData));
        
        // Save hours (already saved in updateDayProgress)
        
        // Show confirmation
        const originalText = saveNotesBtn.textContent;
        saveNotesBtn.textContent = 'Saved!';
        setTimeout(() => {
            saveNotesBtn.textContent = originalText;
        }, 2000);
    }
    
    function loadProgressData() {
        // This function would load any additional progress data if needed
    }
    
    function updateProgressBars() {
        const progressData = JSON.parse(localStorage.getItem('progressData')) || {};
        
        // Calculate totals
        let totalCodingHours = 0;
        let totalWebflowHours = 0;
        let totalDesignHours = 0;
        let totalDaysCompleted = 0;
        
        // Calculate days passed in the journey
        const today = new Date();
        const daysPassed = Math.min(Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1, 90);
        
        // Calculate totals from progress data
        for (let i = 0; i < daysPassed; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const dateKey = date.toISOString().split('T')[0];
            const dayData = progressData[dateKey];
            
            if (dayData && dayData.hours) {
                totalCodingHours += dayData.hours.coding || 0;
                totalWebflowHours += dayData.hours.webflow || 0;
                totalDesignHours += dayData.hours.design || 0;
                
                // Count as completed day if all tasks have some hours
                if (dayData.hours.coding > 0 && dayData.hours.webflow > 0 && dayData.hours.design > 0) {
                    totalDaysCompleted++;
                }
            }
        }
        
        // Update progress bars
        const overallPercent = Math.round((totalDaysCompleted / 90) * 100);
        overallProgress.style.width = `${overallPercent}%`;
        overallPercentage.textContent = `${overallPercent}% (${totalDaysCompleted}/90 days)`;
        
        const codingPercent = Math.round((totalCodingHours / 360) * 100);
        codingProgress.style.width = `${codingPercent}%`;
        codingPercentage.textContent = `${totalCodingHours}/360 hours`;
        
        const webflowPercent = Math.round((totalWebflowHours / 270) * 100);
        webflowProgress.style.width = `${webflowPercent}%`;
        webflowPercentage.textContent = `${totalWebflowHours}/270 hours`;
        
        const designPercent = Math.round((totalDesignHours / 180) * 100);
        designProgress.style.width = `${designPercent}%`;
        designPercentage.textContent = `${totalDesignHours}/180 hours`;
    }
});