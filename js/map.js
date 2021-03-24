import { setAddressInput, toggleFormState } from './form.js';
import { filterAdvertisements, setMapFormChange } from './filter.js';
import { createAdvertisementCard } from './create-adv-card.js';
import { getData } from './api.js';
import { createErrorGetDataMessage } from './create-message.js';

/* global L:readonly */
const createAdvertisementPins = (map, pinsLayer, advertisements) => {
  pinsLayer.clearLayers();

  filterAdvertisements(advertisements).forEach(adv => {
    const lat = adv.location.lat;
    const lng = adv.location.lng;
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
      .addTo(pinsLayer)
      .bindPopup(createAdvertisementCard(adv));
  });
};

const initializeMap = () => {

  const map = L.map('map-canvas');

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

  const pinsLayer = L.layerGroup()
  pinsLayer.addTo(map);

  map.on('load', () => {
    toggleFormState('remove', false);
    getData(
      (advertisements) => {
        createAdvertisementPins(map, pinsLayer, advertisements);
        setMapFormChange(() => createAdvertisementPins(map, pinsLayer, advertisements));
      },
      (err) => {
        createErrorGetDataMessage(err);
      });
  })
    .setView({
      lat: 35.6895,
      lng: 139.69171,
    }, 10);
};

export { initializeMap };
