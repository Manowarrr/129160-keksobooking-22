import { setAddressInput, toggleFormState } from './form.js';
import { createAdvertisementCard } from './create-adv-card.js';
import { createAdvertisement, SIMILAR_ADVERTISEMENT_COUNT } from './data.js';

const advertisements = new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(() => createAdvertisement());

/* global L:readonly */
const createAdvertisementPins = (map, advertisementsArr) => {
  advertisementsArr.forEach(adv => {
    const lat = adv.location.x;
    const lng = adv.location.y;
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(createAdvertisementCard(adv));
  });
};

const initializeMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      toggleFormState('remove', false);
    })
    .setView({
      lat: 35.6895,
      lng: 139.69171,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.6895,
      lng: 139.69171,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  setAddressInput(35.6895, 139.69171);

  mainPinMarker.on('moveend', (evt) => {
    const newAddress = evt.target.getLatLng();
    setAddressInput(newAddress.lat, newAddress.lng);
  });

  createAdvertisementPins(map, advertisements);
};

export { initializeMap, createAdvertisementPins };
