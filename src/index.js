import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const DEBOUNCE_DELAY = 300;

const formSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');



formSearch.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));   

function onInput(evt) {
    evt.preventDefault();
    onClearInpun();
    
    const value = formSearch.value.trim();     
    // if (!value)  Notify.success('Sol lucet omnibus') ;
    // console.log(value);
    fetchCountries(value)
        .then(renderCountries)
        .then(res => {
        
      if (res.length=== '') {
        throw new Error(res.status);
      }
        //  return res.json();
        
    })
    
        // .then((res) => {
        //     if (res.length > 10) alertMatches();
        //     return;} 
                    
}
function onClearInpun(){ 
    countryList.innerHTML = '';
    
}

function renderCountries(countries) {
  if (countries.length > 10) {
    alertMatches();
    return;
  }
}

function alertMatches() { 
     Notify.info(
       'Too many matches found. Please enter a more specific name.'
     );
}






