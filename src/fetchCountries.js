const URL = "https://restcountries.com/v3.1/all";


function fetchCountries(name){ 
    // return 
    fetch(
      `${URL}?aq=${name}&searchIn=title&pageSize=10`
    ).then(res => res.json());
}
// fetchCountries('Spain');

export default { fetchCountries };
