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
    const value = formSearch.value.trim();     
    if (!value)  Notify.success('Sol lucet omnibus') ;
    // console.log(value);
    fetchCountries(value)
        .then((res) =>
            console.log(value));
         
}

function onClearInpun(){ 
    countryList.innerHTML = '';
}






