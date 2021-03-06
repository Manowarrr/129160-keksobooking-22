import { createAdvertisementCard } from './create-adv-card.js';
import {createAdvertisement, SIMILAR_ADVERTISEMENT_COUNT} from './data.js';
import './form.js';

const map = document.querySelector('#map-canvas');
const similarAdvertisements = new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(() => createAdvertisement());

map.appendChild(createAdvertisementCard(similarAdvertisements[0]));
