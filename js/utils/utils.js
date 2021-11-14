

//Функция для получения рандомного числа в заданных диапазонах

const getRandom = (minValue, maxValue) => {
  if((Math.sign(minValue) === -1) || (Math.sign(maxValue) === -1) || minValue >= maxValue) {
    throw new Error('minValue or maxValue they have the wrong value');
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

//Функция для проверки дублирования

const checkDuplicates = (data) => (new Set(data)).size !== data.length;

//Функция для проверки максимальной длины строки

const checkFieldLength = function (string, maxLength) {
  return maxLength >= string.length;
};


export {getRandom, checkFieldLength, checkDuplicates};
