import Notiflix from 'notiflix';

const Notiflix = require('notiflix');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

const refs = {
  form: document.querySelector('.form'),
  delayInp: document.querySelector('input[name="delay"]'),
  stepInp: document.querySelector('input[name="step"]'),
  amountInp: document.querySelector('input[name="amount"]'),
  button: document.querySelector('button[type="submit"]'),
};

refs.form.addEventListener('submit', evt => {
  evt.preventDefault();
  const delay = Number(refs.delayInp.value);
  const step = Number(refs.stepInp.value);
  const amount = Number(refs.amountInp.value);
  let currentDelay = delay;
  for (let i = 1; i <= amount; i += 1) {
    const promise = createPromise(i, currentDelay);
    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    currentDelay += step;
  }
});
