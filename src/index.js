import './css/styles.css';
import debounce from 'lodash.debounce';
import  { fetchCountries }  from  './fetchCountries';

const DEBOUNCE_DELAY = 300;

const formSearch = document.querySelector('#search-box');


formSearch.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));   

function onInput(evt) {
    evt.preventDefault();
    const value = formSearch.value.trim();     
    console.log(value);
    fetchCountries(value).then((result) => console.log(result));
    

     
}


