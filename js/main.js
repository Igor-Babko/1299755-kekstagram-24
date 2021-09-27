//Функция для получения рандомного числа в заданных диапазонах

const getRandom = function (min, max) {
  if (max > min && min >= 0 && max >= 0) {
    max -= min;
    return parseInt((Math.random() * ++max) + min);
  } else if ((max <= min && min >= 0 && max >= 0)) {
    const change = max;
    max = min;
    min = change;
    max -= min;
    return parseInt((Math.random() * ++max) + min);
  }
};

//Функция для проверки максимальной длины строки

const checkFieldLength = function (string, maxLength) {
  return maxLength >= string.length;
};
