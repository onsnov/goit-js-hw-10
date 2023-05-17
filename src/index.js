import './css/styles.css';
import debounce from 'lodash.debounce';
import API from "./fetchCountries.js";

const DEBOUNCE_DELAY = 300;

const formSearch = document.querySelector('#search-box');
// console.log(formSearch);

formSearch.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));   
// formSearch.addEventListener('input', (onInput));   

function onInput(evt) {
    evt.preventDefault();
    // const input = evt.target;
    const value = formSearch.value.trim();   
    //  console.log(value);
    API.fetchCountries(value)
    .then((result) => console.log(result));
     
}


