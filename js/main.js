import { addressInput, advForm, mapFilterForm, setFormState } from './form.js';
import { initializeMap, createAdvertisementPins } from './map.js';
import { createAdvertisement, SIMILAR_ADVERTISEMENT_COUNT } from './data.js';

const advertisements = new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(() => createAdvertisement());
addressInput.disabled = true;
setFormState(mapFilterForm, true, '.map__filter', '.map__features');
setFormState(advForm, true, '.ad-form__element');
const map = initializeMap();
createAdvertisementPins(map, advertisements);
