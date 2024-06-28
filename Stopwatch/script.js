let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCounter = 1;
let totalLapTime = 0;

const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');
const totalLapsDisplay = document.getElementById('totalLaps');

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 100);
        startStopBtn.textContent = 'Stop';
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
    }
    running = !running;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    running = false;
    startStopBtn.textContent = 'Start';
    timeDisplay.textContent = '00:00:00.0';
    laps.innerHTML = '';
    lapCounter = 1;
    difference = 0;
    totalLapTime = 0;
    totalLapsDisplay.textContent = 'Total Lap Time: 00:00:00.0';
});

lapBtn.addEventListener('click', () => {
    if (running) {
        const lapTime = timeDisplay.textContent;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(li);
        lapCounter++;

        const [h, m, s, ms] = lapTime.split(/[:.]/).map(Number);
        const lapMilliseconds = (h * 3600 + m * 60 + s) * 1000 + ms * 100;
        totalLapTime += lapMilliseconds;
        updateTotalLapTimeDisplay();
    }
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 100);

    timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${milliseconds}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function updateTotalLapTimeDisplay() {
    const hours = Math.floor(totalLapTime / 3600000);
    const minutes = Math.floor((totalLapTime % 3600000) / 60000);
    const seconds = Math.floor((totalLapTime % 60000) / 1000);
    const milliseconds = Math.floor((totalLapTime % 1000) / 100);

    totalLapsDisplay.textContent = `Total Lap Time: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${milliseconds}`;
}
