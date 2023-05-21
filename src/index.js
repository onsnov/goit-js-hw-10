import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(serachCounrty, DEBOUNCE_DELAY));

function serachCounrty(event) {
  event.preventDefault();
  const value = refs.input.value.trim();
  // console.log(value);
  if (value == '' || value == ' ') {
    return;
  }

  fetchCountries(value).then(onCreateCard).catch(onFetchError);
}

function onCreateCard(array) {
  if (array.length === 1) {
    oneCounty(array);
  } else {
    countryList(array);
  }
}

function countryList(array) {
  if (array.length > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  const list = array
    .map(({ name, flags }) => {
      return `
        <li class="card-item">
        <img class="card-img" src="${flags.svg}" alt="${flags.alt}">
        <h2 class="card-title">${name.official}</h2>
       </li>
       `;
    })
    .join('');

  // console.log(list);

  clearPage();
  refs.countryList.insertAdjacentHTML('beforeend', list);
}

function oneCounty(array) {
  const country = array
    .map(({ name, flags, capital, population, languages }) => {
      return `
        <div class="card-heading">
            <img class="card-img card-img--big" src="${flags.svg}" alt="${
        flags.alt
      }">
            <h2 class="card-title">${name.official}</h2>
        </div>
        <div class="card-body">
            <p class="card-text"><b>Capital:</b> ${capital}</p>
            <p class="card-text"><b>Population:</b> ${population}</p>
            <p class="card-text"><b>Languages:</b> ${Object.values(
              languages
            ).join(', ')}</p>
        </div>
        `;
    })
    .join('');

  // refs.countryInfo.innerHTML(country);
  // console.log(country)

  clearPage();
  refs.countryInfo.insertAdjacentHTML('beforeend', country);
}

function clearPage() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
}
