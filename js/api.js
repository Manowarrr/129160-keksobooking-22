const getData = (onSuccess, onError) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch((error) => {
      onError(error);
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking ',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

const debounce = (cb, delay) => {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      cb(...args);
    }, delay);
  };
};

export { getData, sendData, debounce };
