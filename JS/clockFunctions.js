// Functions to run and update a clock and time left until midterm ends
// Last edited: OCT 24, 2025

console.log("clockFunctions.js was successfully loaded");

// Set the initial end time for the midterm to 10:50 am
let endTime = new Date();
endTime.setHours(10, 50, 0, 0);

// make the updateClock function
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `Current time: ${hours}:${minutes}:${seconds}`;
    updateTimeLeft();
}

// make the updateTimeLeft function
function updateTimeLeft() {
    const now = new Date();
    const diff = endTime - now;
    var timeLeftFormatting = document.getElementById('time-left');
    if (diff > 0 && diff <= 5 * 60 * 1000) {
        timeLeftFormatting.style.color = "orange";
        timeLeftFormatting.style.fontWeight = "bold";
    }
    if (diff <= 0) {
        timeLeftFormatting.textContent = "Your midterm time is up. Turn in your exam now.";
        timeLeftFormatting.style.color = "red";
        timeLeftFormatting.style.fontWeight = "bold";
        return;
    }
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);
    timeLeftFormatting.textContent = `Time left: ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
}

// make a script to show the endtime
function showEndTime() {
    const endHours = String(endTime.getHours()).padStart(2, '0');
    const endMinutes = String(endTime.getMinutes()).padStart(2, '0');
    document.getElementById('end-time').textContent = `Your Midterm ends at: ${endHours}:${endMinutes}`;
}

// make the openPrompt function for the button
function openPrompt() {
    const input = prompt("Enter new end time (HH:MM, 24-hour):", "12:00");
    var timeLeftFormatting = document.getElementById('time-left');
    if (!input) return;
    const [h, m] = input.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) {
        alert("Invalid format!");
        return;
    }
    endTime = new Date();
    endTime.setHours(h, m, 0, 0);
    timeLeftFormatting.style.color = "#679de9";
    timeLeftFormatting.style.fontWeight = "initial";
    showEndTime();
}

// show/update clock with current time
setInterval(updateClock, 1000);
updateClock();
showEndTime();