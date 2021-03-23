import { PLACESTYPES } from './create-adv-card.js';
import { sendData } from './api.js';
import { createErrorSendDataMessage, createSuccessSendDataMessage } from './create-message.js';

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
const roomNumberSelect = document.querySelector('#room_number');
const roomCapasitySelect = document.querySelector('#capacity');

const addSelectEventListener = (select) => {
  select.addEventListener('change', () => {
    const roomIndex = roomNumberSelect.options.selectedIndex;
    const capacityIndex = roomCapasitySelect.options.selectedIndex;
    if(roomIndex < capacityIndex) {
      select.setCustomValidity('Введенное количество комнат не соответствует количеству гостей!');
    } else if((roomIndex == 3 || capacityIndex == 3) && roomIndex != capacityIndex) {
      select.setCustomValidity('Введенное количество комнат не соответствует количеству гостей!');
    } else {
      select.setCustomValidity('');
    }
    select.reportValidity();
  });
}

const setAdvertisementFormChange = () => {
  typeSelect.addEventListener('change', (evt) => {
    priceInput.min = PLACESTYPES[evt.target.value].minPrice;
    priceInput.placeholder = PLACESTYPES[evt.target.value].minPrice;
  });

  timeinSelect.addEventListener('change', (evt) => {
    timeoutSelect.options.selectedIndex = evt.target.options.selectedIndex;
  });

  addSelectEventListener(roomNumberSelect);
  addSelectEventListener(roomCapasitySelect);
}

const toggleFormState = (action, toggle) => {
  mapForm.classList[action]('ad-form--disabled');
  advertisementForm.classList[action]('ad-form--disabled');
  mapFormInputs.forEach(element => {
    element.disabled = toggle;
  });
  advertisementFormInputs.forEach(element => {
    element.disabled = toggle;
  });
  mapFormFeatures.disabled = toggle;
  advertisementFormPhoto.disabled = toggle;
}

const setAddressInput = (lat, lng) => {
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const setUserFormSubmit = () => {
  advertisementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        createSuccessSendDataMessage();
        advertisementForm.reset();
        setAddressInput(35.6895, 139.69171);
      },
      () => createErrorSendDataMessage(),
      new FormData(evt.target),
    );
  });
};

export { setAddressInput, toggleFormState, setUserFormSubmit, setAdvertisementFormChange, mapForm };

