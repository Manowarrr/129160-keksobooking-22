import { deactivateForm, filterForm, advertisementForm } from './form.js';
import { initializeMap } from './map.js';

deactivateForm(filterForm);
deactivateForm(advertisementForm);
initializeMap();
