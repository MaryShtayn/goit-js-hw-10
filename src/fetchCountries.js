import Notiflix from 'notiflix';
import { countryList, countryInfo } from './index.js';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const QUERY = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${QUERY}`).then(response => {
    if (response.status === 404) {
      return { error: 'Oops, there is no country with that name' };
    }

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}
