const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageButton = errorMessageTemplate.querySelector('.error__button');
const errorMessageText = errorMessageTemplate.querySelector('.error__message');

const isEscPressed = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc' || evt.code === 27;
};

const errorMessage = (text) => {

  if(text) {
    errorMessageText.textContent = text;
  }

  document.querySelector('main').appendChild(errorMessageTemplate);

  const escPressHandler = (evt) => {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      closeErrorMessage();
    }
  };

  document.addEventListener('keydown', escPressHandler)

  document.body.addEventListener('click', () => {
    closeErrorMessage();
  });

  const closeErrorMessage = () => {
    errorMessageTemplate.remove();
    document.removeEventListener('keydown', escPressHandler);
  };

  errorMessageButton.addEventListener('click', () => {
    closeErrorMessage();
  });
};

const successMessage = () => {

  document.querySelector('main').appendChild(successMessageTemplate);

  const escPressHandler = (evt) => {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      closeSuccessMessage();
    }
  };

  document.addEventListener('keydown', escPressHandler);

  document.body.addEventListener('click', () => {
    closeSuccessMessage();
  });

  const closeSuccessMessage = () => {
    successMessageTemplate.remove();
    document.removeEventListener('keydown', escPressHandler);
  };
};

export { errorMessage, successMessage};
