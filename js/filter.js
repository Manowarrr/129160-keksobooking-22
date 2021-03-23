import { mapForm } from './form.js';

const houseTypeFilter = mapForm.querySelector('#housing-type');
const priceFilter = mapForm.querySelector('#housing-type');
const roomNumberFilter = mapForm.querySelector('#housing-rooms');
const guestNumberFilter = mapForm.querySelector('#housing-guests');

const filterByHouseType = (advertisement) => {
  return houseTypeFilter.value === 'any' || houseTypeFilter.value === advertisement.offer.type;
}

const filterByPrice = (advertisement) => {
  if(priceFilter.value === 'low') {
    return advertisement.offer.price < 10000;
  } else if(priceFilter.value === 'middle') {
    return (advertisement.offer.price >= 10000) && (advertisement.offer.price <= 50000)
  } else if(priceFilter.value === 'high') {
    return advertisement.offer.price > 50000;
  }
  return true;
}

const filterByRoomNumber = (advertisement) => {
  return roomNumberFilter.value === 'any' || +roomNumberFilter.value === advertisement.offer.rooms;
}

const filterByGuestNumber = (advertisement) => {
  return guestNumberFilter.value === 'any' || +guestNumberFilter.value === advertisement.offer.guests
}

const groupFilters = (advertisement) => {
  return filterByHouseType(advertisement) &&
         filterByPrice(advertisement) &&
         filterByRoomNumber(advertisement) &&
         filterByGuestNumber(advertisement);
}

const filterAdvertisements = (advertisements) => {
  return advertisements.filter(advertisement => groupFilters(advertisement));
}

const setMapFormChange = (cb) => {
  mapForm.addEventListener('change', () => {
    cb();
  })
}

export { filterAdvertisements, setMapFormChange };
