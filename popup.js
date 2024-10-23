document.addEventListener("DOMContentLoaded", () => {
    const moodPalette = document.getElementById("moodPalette");
    const suggestionBox = document.getElementById("suggestion");
    const quoteBox = document.getElementById("quote");
    const moodHistory = document.getElementById("moodHistory");
    const logMoodBtn = document.getElementById("logMoodBtn");

    const activities = {
        happy: "Listen to your favorite song!",
        sad: "Watch a funny movie!",
        excited: "Go for a walk and enjoy the sun!",
        relaxed: "Read a book or meditate.",
        angry: "Try some deep breathing exercises."
    };

    const quotes = {
        happy: "Happiness is not something ready-made. It comes from your own actions.",
        sad: "Every day may not be good, but there is something good in every day.",
        excited: "The only way to do great work is to love what you do.",
        relaxed: "Sometimes the most productive thing you can do is relax.",
        angry: "For every minute you are angry you lose sixty seconds of happiness."
    };

    moodPalette.addEventListener("click", (event) => {
        const mood = event.target.getAttribute("data-mood");
        if (mood) {
            displaySuggestion(mood);
        }
    });

    logMoodBtn.addEventListener("click", () => {
        const selectedMood = suggestionBox.textContent.split(" ")[0].toLowerCase();
        logMood(selectedMood);
    });

    function displaySuggestion(mood) {
        suggestionBox.textContent = activities[mood];
        quoteBox.textContent = quotes[mood];
    }

    function logMood(mood) {
        chrome.storage.local.get("moods", (data) => {
            const moods = data.moods || [];
            moods.push({ mood, date: new Date().toLocaleString() });
            chrome.storage.local.set({ moods }, loadMoodHistory);
        });
    }

    function loadMoodHistory() {
        chrome.storage.local.get("moods", (data) => {
            const moods = data.moods || [];
            moodHistory.innerHTML = "";
            moods.forEach(entry => {
                const li = document.createElement("li");
                li.textContent = `${entry.date}: ${entry.mood}`;
                moodHistory.appendChild(li);
            });
        });
    }

    loadMoodHistory();
});
