const houseTypeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomNumberFilter = document.querySelector('#housing-rooms');
const guestNumberFilter = document.querySelector('#housing-guests');

const filterByHouseType = (advertisement) => {
  return houseTypeFilter.value === 'any' || houseTypeFilter.value === advertisement.offer.type;
};

const filterByPrice = (advertisement) => {
  switch(priceFilter.value) {
    case 'low':
      return advertisement.offer.price < 10000;
    case 'middle':
      return (advertisement.offer.price >= 10000) && (advertisement.offer.price <= 50000);
    case 'high':
      return advertisement.offer.price > 50000;
    default:
      return true;
  }
};

const filterByRoomNumber = (advertisement) => {
  return roomNumberFilter.value === 'any' || +roomNumberFilter.value === advertisement.offer.rooms;
};

const filterByGuestNumber = (advertisement) => {
  return guestNumberFilter.value === 'any' || +guestNumberFilter.value === advertisement.offer.guests
};

const filterByFeatures = (advertisement) => {
  const features = document.querySelectorAll('input[type="checkbox"]:checked');
  return Array.from(features).map(feature => feature.value).every(feature => advertisement.offer.features.includes(feature));
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
