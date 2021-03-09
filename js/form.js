import { PLACESTYPES } from './create-adv-card.js';

const typeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');
const advForm = document.querySelector('.ad-form');
const addressInput = advForm.querySelector('#address');
const mapFilterForm = document.querySelector('.map__filters');

const setPriceInputValues = (option) => {
  priceInput.min = PLACESTYPES[option.value].minPrice;
  priceInput.placeholder = PLACESTYPES[option.value].minPrice;
};

Array.from(typeSelect.children).forEach(option => {
  if(option.selected == true) {
    setPriceInputValues(option);
  }
});

typeSelect.addEventListener('change', (evt) => {
  setPriceInputValues(evt.target);
});

timeinSelect.addEventListener('change', (evt) => {
  timeoutSelect.querySelector(`option[value='${evt.target.value}']`).selected = true;
});

const setFormState = (formName, isActive, ...formFilters) => {
  if(isActive) {
    formName.classList.add('ad-form--disabled');
  } else {
    formName.classList.remove('ad-form--disabled');
  }
  formFilters.forEach(param => {
    Array.from(formName.querySelectorAll(param)).forEach(filter => {
      if(filter.innerText !== 'Адрес (координаты)')
        filter.disabled = isActive;
    });
  })
};

const formateAddressInput = (lat, lng) => {
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

export { addressInput, advForm, mapFilterForm, setFormState, formateAddressInput };

