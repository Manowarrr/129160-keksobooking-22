import { setAddressInput, activateForm, filterForm, advertisementForm, setFilterFormChange, setAdvertisementFormChange } from './form.js';
import { filterAdvertisements } from './filter.js';
import { createAdvertisementCard } from './create-adv-card.js';
import { getData, debounce } from './api.js';
import { errorMessage } from './modal.js';

const DEFAULT_LOCATION = {
  lat: 35.6895,
  lng: 139.69171,
};
/* global L:readonly */
const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  DEFAULT_LOCATION,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const pinsLayer = L.layerGroup()

const createAdvertisementPins = (advertisements) => {
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
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

  setAddressInput(DEFAULT_LOCATION);

  mainPinMarker.on('moveend', (evt) => {
    const newAddress = evt.target.getLatLng();
    setAddressInput(
      {
        lat: newAddress.lat,
        lng: newAddress.lng,
      },
    );
  });

  pinsLayer.addTo(map);

  map.on('load', () => {
    activateForm(advertisementForm);
    getData(
      (advertisements) => {
        createAdvertisementPins(advertisements);
        setFilterFormChange(debounce(() => createAdvertisementPins(advertisements), 500));
        activateForm(filterForm);
        setAdvertisementFormChange(advertisements);
      },
      (err) => {
        errorMessage(err);
      });
  })
    .setView(DEFAULT_LOCATION, 10);
};

const setMainMarkerLocationToDefault = () => {
  mainPinMarker.setLatLng(new L.LatLng(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng));
  setAddressInput(DEFAULT_LOCATION);
};

export { initializeMap, setMainMarkerLocationToDefault, createAdvertisementPins };
