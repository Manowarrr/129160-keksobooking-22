const houseTypeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomNumberFilter = document.querySelector('#housing-rooms');
const guestNumberFilter = document.querySelector('#housing-guests');
const DEFAULT_SELECT_VALUE = 'any';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const filterByHouseType = (advertisement) => {
  return houseTypeFilter.value === DEFAULT_SELECT_VALUE || houseTypeFilter.value === advertisement.offer.type;
};

const filterByPrice = (advertisement) => {
  switch(priceFilter.value) {
    case 'low':
      return advertisement.offer.price < LOW_PRICE;
    case 'middle':
      return (advertisement.offer.price >= LOW_PRICE) && (advertisement.offer.price <= HIGH_PRICE);
    case 'high':
      return advertisement.offer.price > HIGH_PRICE;
    default:
      return true;
  }
};

const filterByRoomNumber = (advertisement) => {
  return roomNumberFilter.value === DEFAULT_SELECT_VALUE || +roomNumberFilter.value === advertisement.offer.rooms;
};

const filterByGuestNumber = (advertisement) => {
  return guestNumberFilter.value === DEFAULT_SELECT_VALUE || +guestNumberFilter.value === advertisement.offer.guests
};

const filterByFeatures = (advertisement) => {
  const features = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(feature => feature.value);
  return features.every(feature => advertisement.offer.features.indexOf(feature) >= 0);
};

const filterAdvertisements = (advertisements) => {
  return advertisements.filter(advertisement => {
    return filterByHouseType(advertisement) &&
           filterByPrice(advertisement) &&
           filterByRoomNumber(advertisement) &&
           filterByGuestNumber(advertisement)  &&
           filterByFeatures(advertisement);
  });
};

export { filterAdvertisements };
