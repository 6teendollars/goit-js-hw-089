import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let period = null;
let leftTime = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      refs.buttonStart.disabled = true;
    } else {
      refs.buttonStart.disabled = false;
    }
  },
};


refs.buttonStart.addEventListener('click', onClick);

function onClick() {
  period = new Date(refs.inputDate.value).getTime() - Date.now();
  leftTime = convertMs(period);
  changeTimeOnTimer(leftTime);

  const timeInterval = setInterval(() => {
    period = new Date(refs.inputDate.value).getTime() - Date.now();
    leftTime = convertMs(period);
    refs.inputDate.disabled = true;
    refs.buttonStart.disabled = true;
    leftTime = convertMs(period);
    changeTimeOnTimer(leftTime);

    if (period < 1000) {
      clearInterval(timeInterval);
      refs.inputDate.disabled = false;
      refs.buttonStart.disabled = false;
    }
  }, 1000);
}

function changeTimeOnTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = changeTextContent(days);
  refs.hours.textContent = changeTextContent(hours);
  refs.minutes.textContent = changeTextContent(minutes);
  refs.seconds.textContent = changeTextContent(seconds);
}

function changeTextContent(value) {
  return String(value).padStart(2, '0');
}

flatpickr('#datetime-picker', options);
