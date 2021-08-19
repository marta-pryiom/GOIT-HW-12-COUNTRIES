import { refs } from './refs';
import fetchCountries from './fetchCountries';
import cardCountryEl from '../templates/countryCard.hbs';
import listCountryEl from '../templates/listOfCards.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

var debounce = require('lodash.debounce');

refs.input.addEventListener('input', debounce(countrySearchInputHandler, 500));

function countrySearchInputHandler(e) {
  e.preventDefault();
  InputClear();
  const searchQuery = e.target.value;

  fetchCountries(searchQuery)
    .then(elems => {
      if (elems.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      } else if (elems.status === 404) {
        console.log(elems.status);
        error({
          text: 'No country has been found. Please enter a more specific query!',
        });
      } else if (elems.length === 1) {
        onRenderCountryCard(elems);
      } else if (elems.length <= 10) {
        onRenderListCountries(elems);
      }
    })
    .catch(error => {
      error({
        text: 'You must enter query parameters!',
      });
      console.log(Error);
    });
}

function InputClear() {
  refs.countriesList.innerHTML = '';
  refs.cardCountry.innerHTML = '';
}
function onRenderListCountries(country) {
  const listMarkup = listCountryEl(country);

  refs.countriesList.insertAdjacentHTML('beforeend', listMarkup);
}

function onRenderCountryCard(country) {
  const markup = cardCountryEl(country);

  refs.cardCountry.innerHTML = markup;
}
