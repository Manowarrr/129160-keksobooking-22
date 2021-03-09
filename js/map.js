import { advForm, mapFilterForm, setFormState, formateAddressInput } from './form.js';
import { createAdvertisementCard } from './create-adv-card.js';

/* global L:readonly */

const initializeMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      setFormState(mapFilterForm, false, '.map__filter', '.map__features');
      setFormState(advForm, false, '.ad-form__element');
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
    iconUrl: '../img/main-pin.svg',
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

  formateAddressInput(35.6895, 139.69171);

  mainPinMarker.on('moveend', (evt) => {
    const newAddress = evt.target.getLatLng();
    formateAddressInput(newAddress.lat, newAddress.lng);
  });

  return map;
}

const createAdvertisementPins = (map, advertisementsArr) => {
  advertisementsArr.forEach(adv => {
    const lat = adv.location.x;
    const lng = adv.location.y;
    const icon = L.icon({
      iconUrl: '../img/pin.svg',
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
}

export { initializeMap, createAdvertisementPins };
