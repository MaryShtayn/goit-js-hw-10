import './css/styles.css';

import debounce from 'lodash.debounce';

import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener(
  'input',
  debounce(e => {
    const trimmedValue = input.value.trim();
    cleanHtml();
    if (trimmedValue !== '') {
      fetchCountries(trimmedValue).then(foundData => {
        if (foundData.error) {
          Notiflix.Notify.failure(foundData.error);
        } else if (foundData.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (foundData.length >= 2 && foundData.length <= 10) {
          renderCountryList(foundData);
        } else if (foundData.length === 1) {
          renderOneCountry(foundData);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderOneCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</b></p>
            <p><b>СТОЛИЦЯ</b>: ${country.capital}</p>
            <p><b>НАСЕЛЕННЯ</b>: ${country.population}</p>
            <p><b>МОВА</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}

function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
