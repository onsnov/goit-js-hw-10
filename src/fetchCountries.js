export function fetchCountries(name) {

  const URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;

  function fetchCountries(name) {
    return fetch(`${URL}?aq=${name}&searchIn=title&pageSize=10`).then(res =>
      res.json()
    );
  }
  // fetchCountries('Spain');
}