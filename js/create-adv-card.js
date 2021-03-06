const PLACESTYPES = {
  palace: {
    type: 'Дворец',
    minPrice: '10000',
  },
  flat: {
    type: 'Квартира',
    minPrice: '1000',
  },
  house: {
    type: 'Дом',
    minPrice: '5000',
  },
  bungalow: {
    type: 'Бунгало',
    minPrice: '0',
  },
}

const makeSimilarElementsFromArray = (arr, element) => {

  const listFragment = document.createDocumentFragment();

  arr.forEach(item => {
    const elem = document.createElement(element)
    if(element == 'li') {
      elem.classList.add('popup__feature', `popup__feature--${item}`);
    } else {
      elem.width = 45;
      elem.height = 40;
      elem.alt = 'Фотография жилья';
      elem.src = item;
      elem.classList.add('popup__photo');
    }
    listFragment.appendChild(elem);
  });

  return listFragment;
}

const createAdvertisementCard = (adv) => {

  const similarAdvertisementTemplate = document.querySelector('#card').content.querySelector('.popup');
  const advElement = similarAdvertisementTemplate.cloneNode(true);

  advElement.querySelector('.popup__title').textContent = adv.offer.title;
  advElement.querySelector('.popup__text--address').textContent = adv.offer.address;
  advElement.querySelector('.popup__text--price').innerHTML = `${adv.offer.price} <span>₽/ночь</span>`;
  advElement.querySelector('.popup__type').textContent = PLACESTYPES[adv.offer.type].type;
  advElement.querySelector('.popup__text--capacity').textContent = `${adv.offer.rooms} комнаты  для ${adv.offer.guests} гостей`;
  advElement.querySelector('.popup__text--time').textContent = `Заезд после ${adv.offer.checkin}, выезд до ${adv.offer.checkout}`;
  advElement.querySelector('.popup__avatar').src = adv.author.avatar;

  const featuresList = advElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  const features = adv.offer.features;
  if(features.length !== 0) {
    featuresList.appendChild(makeSimilarElementsFromArray(features, 'li'));
  } else {
    featuresList.classList.add('hidden');
  }

  const description = advElement.querySelector('.popup__description');
  if(adv.offer.description) {
    description.textContent = adv.offer.description;
  } else {
    description.classList.add('hidden');
  }

  const photoList = advElement.querySelector('.popup__photos');
  photoList.innerHTML = '';
  const photos = adv.offer.photos;
  if(photos.length !== 0) {
    photoList.appendChild(makeSimilarElementsFromArray(photos, 'img'));
  } else {
    photoList.classList.add('hidden');
  }

  return advElement;
}

export { createAdvertisementCard, PLACESTYPES };
