import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const DEBOUNCE_DELAY = 300;

const formSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');



formSearch.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));   

function onInput(evt) {
    evt.preventDefault();
   
    const value = formSearch.value.trim();
   
    fetchCountries(value).then(renderCountries).catch(onEror)
}


function renderCountries(arrayOfcountries) {
   if (arrayOfcountries.length === 1) {
     oneCounty(arrayOfcountries);
   } else {
     onCountryList(arrayOfcountries);
   }
    console.log(arrayOfcountries)
}

function alertMatches() { 
     Notify.info(
       'Too many matches found. Please enter a more specific name.'
     );
}


function onCountryList(arrayOfcountries) {
  if (arrayOfcountries.length > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  const list = arrayOfcountries
    .map(({ name, flags }) => {
      return `
        <li class="card-item">
        <img class="card-img" src="${flags.svg}" alt="${flags.alt}">
        <h2 class="card-title">${name.official}</h2>
       </li>
       `;
    })
      .join('');    
    clearPage();
    countryList.insertAdjacentHTML('beforeend', list);
}

    function oneCounty(arrayOfcountries) {
      const country = arrayOfcountries
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
        </div>)
        `;
        }).join('');
         clearPage();
         countryInfo.insertAdjacentHTML('beforeend', country);
    }


function clearPage() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}

function onEror(error) {
  console.log(error);
  //     Notify.failure("Oops, there is no country with that name");
};