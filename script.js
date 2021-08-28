'use strict';

const selects = document.querySelectorAll('.currency__select');
const btn = document.querySelector('.btn');
const inputFrom = document.getElementById('currency__from');
const inputTo = document.getElementById('currency__to');
const error = document.querySelector('.error-message');
const errorText = document.querySelector('.error-text');

fetch('http://api.frankfurter.app/currencies')
  .then(response => response.json())
  .then(data => showCurrencies(data));

function showCurrencies(data) {
  let currencies = Object.entries(data);
  currencies.forEach(item => {
    selects[0].innerHTML += `<option value="${item[0]}" title="${item[1]}">${item[0]}</option>`;
    selects[1].innerHTML += `<option value="${item[0]}" title="${item[1]}">${item[0]}</option>`;
  });
}

btn.addEventListener('click', () => {
  let currencyFrom = selects[0].value;
  let currencyTo = selects[1].value;
  let value = inputFrom.value;

  if (currencyFrom !== currencyTo && value > 0 && /^\d+$/.test(value)) {
    convertValue(currencyFrom, currencyTo, value);
  } else if (currencyFrom === currencyTo) {
    error.classList.add('show');
    errorText.textContent = 'Convertible currencies must be different';
  } else if (value <= 0) {
    error.classList.add('show');
    errorText.textContent = 'The quantity must be greater than zero';
  } else if (!/^\d+$/.test(value)) {
    error.classList.add('show');
    errorText.textContent = 'Please enter a valid value';
  }
});

function convertValue(currencyFrom, currencyTo, value) {
  const host = 'api.frankfurter.app';
  fetch(`https://${host}/latest?amount=${value}&from=${currencyFrom}&to=${currencyTo}`)
    .then(resp => resp.json())
    .then(data => {
      inputTo.value = Object.values(data.rates)[0];
      console.log(data);
    });
}

inputFrom.addEventListener('focus', () => {
  inputTo.value = '';
  removeError();
});

selects.forEach(select => select.addEventListener('click', removeError));

function removeError() {
  error.classList.remove('show');
  errorText.textContent = '';
}
