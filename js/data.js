import { randomInteger, getRandomArrayElement, randomFloat } from './util.js';

const TITLES = [
  'Это заголовок № 1.',
  'Это заголовок № 2.',
];

const DESCRIPTIONS = [
  'Это описание № 1.',
  'Это описание № 2.',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const SIMILAR_ADVERTISEMENT_COUNT = 10;

const createAdvertisement = () => {
  let latitude = randomFloat(35.65000, 35.70000, 5);
  let longitude = randomFloat(139.70000, 139.80000, 5);

  return {
    author: {avatar: `img/avatars/user0${randomInteger(1, 8)}.png`},
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${latitude}, ${longitude}`,
      price: randomInteger(1, 1000),
      type: getRandomArrayElement(TYPES),
      rooms: randomInteger(1, 4),
      guests: randomInteger(1, 10),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: new Array(randomInteger(1, 6)).fill(null).map((item, i) => FEATURES[i]),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: new Array(randomInteger(3, 10)).fill(null).map(() => getRandomArrayElement(PHOTOS)),
    },
    location: {
      x: latitude,
      y: longitude,
    },
  };
};

export { createAdvertisement, SIMILAR_ADVERTISEMENT_COUNT };

