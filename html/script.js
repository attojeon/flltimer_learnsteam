
const startPauseButton = document.getElementById('start-pause-btn');
const resetButton = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer');
const startSound = document.getElementById('start-sound');
const warningSound = document.getElementById('warning-sound');

let timer = 150; // 2분 30초 (150초)
let interval = null;
let isTimerRunning = false;

function updateDisplay() {
    let minutes, seconds;
    if (timer >= 0) {
        // 정상적인 타이머 표시
        minutes = Math.floor(timer / 60).toString().padStart(2, '0');
        seconds = (timer % 60).toString().padStart(2, '0');
    } else {
        // 타이머가 0 이하일 때 경과 시간 표시
        const elapsed = Math.abs(timer); // 음수 값을 양수로 변환
        minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        seconds = (elapsed % 60).toString().padStart(2, '0');
    }
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startPauseTimer() {
    if (!isTimerRunning) {
        startSound.play(); // 0초가 되었을 때 사운드 재생
        interval = setInterval(() => {
            if (timer > 0) {
                timer--;
            } else {
                timer--; // 0초에 도달한 후 계속 감소시켜 경과 시간을 표시
            }
            updateDisplay();

            if (timer === 30) {
                warningSound.play();
            } else if (timer === 0) {
                startSound.play(); // 0초가 되었을 때 사운드 재생
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

// function startPauseTimer() {
//     if (!isTimerRunning) {
//         startSound.play();
//         interval = setInterval(() => {
//             if (timer > 0) {
//                 timer--;
//                 updateDisplay();
//                 if (timer === 30) {
//                     warningSound.play();
//                 }
//             } else if (timer === 0) {
//                 timer--;
//                 updateDisplay();
//                 startSound.play();
//             }
//             else {
//                 clearInterval(interval);
//                 console.log('Timer is already 0', timer);
//             }
//         }, 1000);
//         startPauseButton.textContent = 'PAUSE';
//         isTimerRunning = true;
//     } else {
//         clearInterval(interval);
//         startPauseButton.textContent = 'START';
//         isTimerRunning = false;
//     }
// }

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
