const randomInteger = (min, max) => {
  // https://learn.javascript.ru/task/random-int-min-max
  if(min < 0 || max < 0 || max <= min) {
    alert('Input data is  incorrect!');
    return;
  }

  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

const getRandomArrayElement = (arr) => {
  return arr[randomInteger(0, arr.length - 1)];
};

const randomFloat = (min, max, digits) => {
  // https://learn.javascript.ru/task/random-min-max
  if(min < 0 || max < 0 || max <= min) {
    alert('Input data is  incorrect!');
    return;
  }

  let rand = min + Math.random() * (max - min);

  return +rand.toFixed(digits);
}

export { randomInteger, getRandomArrayElement, randomFloat };
