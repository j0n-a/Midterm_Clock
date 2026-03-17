// Functions to run and update a clock and time left until midterm ends
// Last edited: MAR 16, 2026

console.log("clockFunctions.js was successfully loaded");

// Set the initial end time for the midterm to 10:50 am
let endTime = new Date();
endTime.setHours(10, 50, 0, 0);

window.onload = function() {
    const examName = prompt("What is the exam called?");
    if (examName) {
        document.getElementById('exam-title').textContent = `${examName} Clock`;
    }
    openPrompt();
}

// make the updateClock function
function updateClock() {
    const now = new Date();
    const withSeconds = document.getElementsByName("secondsCheck")[0];

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    if (withSeconds.checked) {
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('clock').textContent = `Current time: ${hours}:${minutes}:${seconds}`;
    } else {
        document.getElementById('clock').textContent = `Current time: ${hours}:${minutes}`;
    }
    updateTimeLeft();
}

// make the updateTimeLeft function
function updateTimeLeft() {
    const now = new Date();
    const diff = endTime - now;
    var timeLeftFormatting = document.getElementById('time-left');
    const withSeconds = document.getElementsByName("secondsCheck")[0];
    if (diff > 0 && diff <= 5 * 60 * 1000) {
        timeLeftFormatting.style.color = "orange";
        timeLeftFormatting.style.fontWeight = "bold";
    }
    if (diff <= 0) {
        timeLeftFormatting.textContent = "Your exam time is up. Turn in your exam now.";
        timeLeftFormatting.style.color = "red";
        timeLeftFormatting.style.fontWeight = "bold";
        return;
    }
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (withSeconds.checked || diff <= 5 * 60 * 1000) {
        const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);
        timeLeftFormatting.textContent = `Time left: ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
    } else {
        timeLeftFormatting.textContent = `Time left: ${hoursLeft}h ${minutesLeft}m`;
    }  
}

// make a script to show the endtime
function showEndTime() {
    const endHours = String(endTime.getHours()).padStart(2, '0');
    const endMinutes = String(endTime.getMinutes()).padStart(2, '0');
    document.getElementById('end-time').textContent = `Your exam ends at: ${endHours}:${endMinutes}`;
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