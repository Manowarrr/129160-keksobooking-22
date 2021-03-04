import { similarAdvertisements } from './data.js';

const map = document.querySelector('#map-canvas');
const similarAdvertisementTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAdvertisementFragment = document.createDocumentFragment();
const PLACESTYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
}

similarAdvertisements.forEach((adv,index) => {
  const advElement = similarAdvertisementTemplate.cloneNode(true);
  advElement.querySelector('.popup__title').textContent = adv.offer.title;
  advElement.querySelector('.popup__text--address').textContent = adv.offer.address;
  advElement.querySelector('.popup__text--price').innerHTML = `${adv.offer.price} <span>₽/ночь</span>`;
  advElement.querySelector('.popup__type').textContent = PLACESTYPES[adv.offer.type];
  advElement.querySelector('.popup__text--capacity').textContent = `${adv.offer.rooms} комнаты  для ${adv.offer.guests} гостей`;
  advElement.querySelector('.popup__text--time').textContent = `Заезд после ${adv.offer.checkin}, выезд до ${adv.offer.checkout}`;
  const featuresList = advElement.querySelector('.popup__features');
  for(let i = 0; i < featuresList.children.length; i++) {
    featuresList.children[i].classList.add('hidden');
    adv.offer.features.forEach(feature => {
      if(featuresList.children[i].classList.contains(`popup__feature--${feature}`)) {
        featuresList.children[i].textContent = feature;
        featuresList.children[i].classList.remove('hidden');
      }
    });
  }
  advElement.querySelector('.popup__description').textContent = adv.offer.description;
  const photoList = advElement.querySelector('.popup__photos');
  const photoItem = photoList.querySelector('.popup__photo');
  adv.offer.photos.forEach(item => {
    const photo = photoItem.cloneNode();
    photo.src = item;
    photoList.appendChild(photo);
  });
  photoItem.remove();
  advElement.querySelector('.popup__avatar').src = adv.author.avatar;

  if(index === 0)
    similarAdvertisementFragment.appendChild(advElement);
});

map.appendChild(similarAdvertisementFragment);
