import { PLACESTYPES } from './create-adv-card.js';

const typeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');

const setPriceInputValues = (option) => {
  priceInput.setAttribute('min', PLACESTYPES[option.value].minPrice);
  priceInput.setAttribute('placeholder', PLACESTYPES[option.value].minPrice);
};

Array.from(typeSelect.children).forEach(option => {
  if(option.hasAttribute('selected')) {
    setPriceInputValues(option);
  }
});

typeSelect.addEventListener('change', (evt) => {
  setPriceInputValues(evt.target);
});

timeinSelect.addEventListener('change', (evt) => {
  Array.from(timeoutSelect.children).forEach(child => {
    if(child.value === evt.target.value && !child.hasAttribute('selected')) {
      child.setAttribute('selected', 'selected');
    } else {
      child.removeAttribute('selected');
    }
  });
});
