function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId;

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);

function start() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);

  startButton.disabled = true;
}
function stop() {
  clearInterval(intervalId);
  startButton.disabled = false;
  intervalId = null;
}

console.log(startButton);
console.log(stopButton);
