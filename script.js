'use strict';

const selects = document.querySelectorAll('.currency__select');
const btn = document.querySelector('.btn');
const inputFrom = document.getElementById('currency__from');
const inputFor = document.getElementById('currency__to');

fetch('http://data.fixer.io/api/latest?access_key=3a26863294adbb697ffc3f35e514f2db')
  .then(response => response.json())
  .then(data => showCurrencies(data));

function showCurrencies(data) {
  let currencies = Object.entries(data.rates);
  currencies.forEach(item => {
    selects[0].innerHTML += `<option value="{item[0]}">${item[0]}</option>`;
    selects[1].innerHTML += `<option value="{item[0]}">${item[0]}</option>`;
  });
}

btn.addEventListener('click', () => {
  let currencyFrom = selects[0].value;
  let currencyTo = selects[1].value;
  let value = inputFrom.value;

  if (currencyFrom !== currencyTo) {
    converValue(currencyFrom, currencyTo, value);
  } else {
  }
});

function converValue(currencyFrom, currencyTo, value) {
  fetch(
    `http://data.fixer.io/api/convert?access_key=3a26863294adbb697ffc3f35e514f2db&from=${currencyFrom}&to=${currencyTo}&=amount=${value}`
  )
    .then(response => response.json())
    .then(text => console.log(text));
}
