import './css/styles.css';
import debounce from 'lodash.debounce';
import API from "./fetchCountries"

const DEBOUNCE_DELAY = 300;

const formSearch = document.querySelector('#search-box');
// console.log(formSearch);

formSearch.addEventListener('input',debounce((onInput), DEBOUNCE_DELAY))  ;   

function onInput(evt) {
    evt.preventDefault();
    const input = evt.currentTarget;
    const value = input.value.trim();   
    API.fetchCountries(value)
    .then((result) => console.log(result));
    // console.log(value);
  
}


