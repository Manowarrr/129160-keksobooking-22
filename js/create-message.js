const main = document.querySelector('main');

const createErrorGetDataMessage = (text) => {
  const messageTemplate = document.querySelector('#server-response-error').content.querySelector('.error');
  const errorMessage = messageTemplate.cloneNode(true);
  const message = errorMessage.querySelector('.error__message');
  const messageBtn = errorMessage.querySelector('.error__button');

  message.textContent = text;

  main.appendChild(errorMessage);

  messageBtn.addEventListener('click', () => {
    main.removeChild(errorMessage);
  })
};

const createErrorSendDataMessage = () => {
  const messageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = messageTemplate.cloneNode(true);
  const messageBtn = errorMessage.querySelector('.error__button');

  main.appendChild(errorMessage);

  messageBtn.addEventListener('click', () => {
    main.removeChild(errorMessage);
  })
};

const createSuccessSendDataMessage = () => {
  const messageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = messageTemplate.cloneNode(true);

  main.appendChild(successMessage);

  setTimeout(() => {main.removeChild(successMessage);}, 2000);
};

export { createErrorGetDataMessage, createErrorSendDataMessage, createSuccessSendDataMessage};
