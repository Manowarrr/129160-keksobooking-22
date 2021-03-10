import { PLACESTYPES } from './create-adv-card.js';

const typeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');
const advertisementForm = document.querySelector('.ad-form');
const advertisementFormInputs = advertisementForm.querySelectorAll('.ad-form__element');
const advertisementFormPhoto = advertisementForm.querySelector('.ad-form-header');
const addressInput = advertisementForm.querySelector('#address');
const mapForm = document.querySelector('.map__filters');
const mapFormInputs = mapForm.querySelectorAll('.map__filter');
const mapFormFeatures = mapForm.querySelector('.map__features');

const setPriceInputValues = (option) => {
  priceInput.min = PLACESTYPES[option.value].minPrice;
  priceInput.placeholder = PLACESTYPES[option.value].minPrice;
};

Array.from(typeSelect.children).forEach(option => {
  if(option.selected) {
    setPriceInputValues(option);
  }
});

typeSelect.addEventListener('change', (evt) => {
  setPriceInputValues(evt.target);
});

timeinSelect.addEventListener('change', (evt) => {
  timeoutSelect.options.selectedIndex = evt.target.options.selectedIndex;
});

const setInactiveFormState = () => {
  mapForm.classList.add('ad-form--disabled');
  advertisementForm.classList.add('ad-form--disabled');
  mapFormInputs.forEach(element => {
    element.disabled = true;
  });
  advertisementFormInputs.forEach(element => {
    element.disabled = true;
  });
  mapFormFeatures.disabled = true;
  advertisementFormPhoto.disabled = true;
};

const setActiveFormState = () => {
  mapForm.classList.remove('ad-form--disabled');
  advertisementForm.classList.remove('ad-form--disabled');
  mapFormInputs.forEach(element => {
    element.disabled = false;
  });
  advertisementFormInputs.forEach(element => {
    element.disabled = false;
  });
  mapFormFeatures.disabled = false;
  advertisementFormPhoto.disabled = false;
};


const setAddressInput = (lat, lng) => {
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

export { setInactiveFormState, setActiveFormState, setAddressInput };

