
const startPauseButton = document.getElementById('start-pause-btn');
const resetButton = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer');
const startSound = document.getElementById('start-sound');
const warningSound = document.getElementById('warning-sound');

let timer = 150; // 2분 30초 (150초)
let interval = null;
let isTimerRunning = false;

function updateDisplay() {
    const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
    const seconds = (timer % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startPauseTimer() {
    if (!isTimerRunning) {
        startSound.play();
        interval = setInterval(() => {
            if (timer > 0) {
                timer--;
                updateDisplay();
                if (timer === 30) {
                    warningSound.play();
                }
            } else {
                clearInterval(interval);
            }
        }, 1000);
        startPauseButton.textContent = 'PAUSE';
        isTimerRunning = true;
    } else {
        clearInterval(interval);
        startPauseButton.textContent = 'START';
        isTimerRunning = false;
    }
}

function resetTimer() {
    clearInterval(interval);
    timer = 150;
    updateDisplay();
    startPauseButton.textContent = 'START';
    isTimerRunning = false;
}

startPauseButton.addEventListener('click', startPauseTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
