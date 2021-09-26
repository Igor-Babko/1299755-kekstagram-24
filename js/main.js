//Функция для получения рандомного числа в заданных диапазонах

let getRandomNum = function (min, max) {
  if (max > min && min >= 0 && max >= 0) {
    max -= min;
    return parseInt((Math.random() * ++max) + min);
  } else if ((max <= min && min >= 0 && max >= 0)) {
    let change = max;
    max = min;
    min = change;
    max -= min;
    return parseInt((Math.random() * ++max) + min);
  }
  return console.log('Вы указали некорректные аргументы');
};

//Функция для проверки максимальной длины строки

let checkFieldLength = function (string, maxLength) {
  if (maxLength >= string.length) {
    return true;
  }
  return false;
};
