const isEscPressed = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc' || evt.code === 27;
};

const createDebounce = (cb, delay) => {
  let interval;

  return (...args) => {
    clearTimeout(interval);

    interval = setTimeout(() => {
      interval = null;
      cb(...args);
    }, delay);

  };
};

export { isEscPressed, createDebounce};
