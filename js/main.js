import { toggleFormState, setUserFormSubmit, setAdvertisementFormChange } from './form.js';
import { initializeMap } from './map.js';

setAdvertisementFormChange();
toggleFormState('add', true);
initializeMap();
setUserFormSubmit();
