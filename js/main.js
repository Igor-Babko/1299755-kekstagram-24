//Функция для получения рандомного числа в заданных диапазонах

const getRandom = function (min, max) {
  if (max > min && min >= 0 && max >= 0) {
    max -= min;
    return Math.floor((Math.random() * ++max) + min);
  } else if ((max <= min && min >= 0 && max >= 0)) {
    const change = max;
    max = min;
    min = change;
    max -= min;
    return Math.floor((Math.random() * ++max) + min);
  }
};

//Функция для проверки максимальной длины строки

// const checkFieldLength = function (string, maxLength) {
//   return maxLength >= string.length;
// };
// console.log(getRandom(4,6));


//Функция для генерации объектов

const getComments = function (quantity) {

  let object;
  const massive = [];

  function createComments() {
    const idMassive = [];
    let uniqId;
    let quantityComments;
    let newId;
    const commentsMassive = [];
    const userComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']
    const userNames = ['Катя', 'Оля', 'Дима', 'Игорь', 'Наташа', 'Вася', 'Оксана', 'Тимур'];

    quantityComments = Math.floor(Math.random() * 10 + 1); //Генерируем случайное количество комментариев (1-10)
    for (let j = 0; j < quantityComments; j++) { //Генерируем эти комментарии
      newId = Math.floor(Math.random() * 1000 + 1);
      //Генерируем случайный ID от 1 до 1000
      uniqId = true; //По умолчанию ставим наш id уникальным
      for (let i = 0; i < quantityComments; i++) { //Проверяем наш id на уникальность
        if (idMassive[i] === newId) {
          uniqId = false;
        }
      }
      if (uniqId === false) { //Если id не уникальный, возвращаемся на этап генерации комментария
        j--;
        continue;
      }

      idMassive.push(newId);
      commentsMassive[j] = {
        id: newId,
        avatar: `img/avatar-${  Math.floor(Math.random() * 6 + 1)  }.svg`,
        message: `${userComments[Math.floor(Math.random() * 7)]  } ${  userComments[Math.floor(Math.random() * 7)]}`,
        name: userNames[Math.floor(Math.random() * 8)],
      };
    }
    return commentsMassive;
  }
  for (let i = 0; i < quantity; i++) {
    object = {
      id: i + 1,
      url: `photos/${  i + 1  }.jpg`,
      description: 'Одна из моих любимых фотографий',
      likes: getRandom(15, 200),
      comments: createComments(),
    };
    massive.push(object);
  }
  return massive;
};
getComments(25);
