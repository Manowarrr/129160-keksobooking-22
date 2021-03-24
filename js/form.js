import { PLACESTYPES } from './create-adv-card.js';
import { sendData } from './api.js';
import { setMainMarkerLocationToDefault, createAdvertisementPins } from './map.js';
import { errorMessage, successMessage } from './modal.js';

const typeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');
const advertisementForm = document.querySelector('.ad-form');
const advertisementFormInputs = advertisementForm.querySelectorAll('.ad-form__element');
const advertisementFormPhoto = advertisementForm.querySelector('.ad-form-header');
const addressInput = advertisementForm.querySelector('#address');
const filterForm = document.querySelector('.map__filters');
const filterFormInputs = filterForm.querySelectorAll('.map__filter');
const filterFormFeatures = filterForm.querySelector('.map__features');
const roomNumberSelect = document.querySelector('#room_number');
const roomCapasitySelect = document.querySelector('#capacity');

const activateForm = (form) => {
  form.classList.remove('ad-form--disabled');

  if(filterForm.isEqualNode(form)) {
    filterFormInputs.forEach(element => {
      element.disabled = false;
    });
    filterFormFeatures.disabled = false;
  }

  if(advertisementForm.isEqualNode(form)) {
    advertisementFormInputs.forEach(element => {
      element.disabled = false;
    });
    advertisementFormPhoto.disabled = false;
  }
}

const deactivateForm = (form) => {
  form.classList.add('ad-form--disabled');
  if(filterForm.isEqualNode(form)) {
    filterFormInputs.forEach(element => {
      element.disabled = true;
    });
    filterFormFeatures.disabled = true;
  }

  if(advertisementForm.isEqualNode(form)) {
    advertisementFormInputs.forEach(element => {
      element.disabled = true;
    });
    advertisementFormPhoto.disabled = true;
  }
}

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

const setAddressInput = (coordinates) => {
  addressInput.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

const setUserFormSubmit = () => {
  advertisementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        successMessage();
        advertisementForm.reset();
      },
      () => errorMessage(),
      new FormData(evt.target),
    );
  });
};

const setAdvertisementFormChange = (advertisements) => {

  const resetState = () => {
    filterForm.reset();
    setMainMarkerLocationToDefault();
    createAdvertisementPins(advertisements)
  };

  typeSelect.addEventListener('change', (evt) => {
    priceInput.min = PLACESTYPES[evt.target.value].minPrice;
    priceInput.placeholder = PLACESTYPES[evt.target.value].minPrice;
  });

  timeinSelect.addEventListener('change', () => {
    timeoutSelect.options.selectedIndex = timeinSelect.selectedIndex;
  });

  timeoutSelect.addEventListener('change', () => {
    timeinSelect.options.selectedIndex = timeoutSelect.selectedIndex;
  });

  addSelectEventListener(roomNumberSelect);
  addSelectEventListener(roomCapasitySelect);

  advertisementForm.addEventListener('reset', () => setTimeout(resetState) );

  setUserFormSubmit();
}

const setFilterFormChange = (cb) => {
  filterForm.addEventListener('change', () => {
    cb();
  })
};

export { setAddressInput, activateForm, deactivateForm, filterForm, advertisementForm, setUserFormSubmit, setAdvertisementFormChange, setFilterFormChange };

