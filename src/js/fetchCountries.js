function fetchCountries(name) {
  const BASE_URL = `https://restcountries.eu/rest/v2/name/${name}`;
  return fetch(BASE_URL).then(response => response.json());
}
export default fetchCountries;
