import { houseTypeFilter } from './form.js';
import { createAdvertisementCard } from './create-adv-card.js';

const setHouseTypeFilter = (advertisementArr, map) => {
  houseTypeFilter.addEventListener('change', (evt) => {
    advertisementArr.forEach(advertisement => {
      if(advertisement.offer.type !== evt.target.value) {
        map.removeLayer(advertisement.marker);
      } else {
        advertisement.marker
          .addTo(map)
          .bindPopup(createAdvertisementCard(advertisement));
      }
    });
  });
};

export { setHouseTypeFilter };
