//Функция для получения рандомного числа в заданных диапазонах

const getRandom = (min, max) => {
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

const USER_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const USER_NAMES = ['Катя', 'Оля', 'Дима', 'Игорь', 'Наташа', 'Вася', 'Оксана', 'Тимур'];
const generatedIds = [];

//Функция для генерации уникального id комментария

const generateCommentId = () => {
  let id = getRandom(1, 1000);
  while (generatedIds.includes(id)) {
    id = getRandom(1, 1000);
  }
  return id;
};

//Функция для генерации комментария

const createComments = () => {
  const commentsMassive = [];
  const quantityComments = Math.floor(Math.random() * 10 + 1); //Генерируем случайное количество комментариев (1-10)
  for (let j = 0; j < quantityComments; j++) { //Генерируем эти комментарии
    const id = generateCommentId();
    generatedIds.push(id);
    commentsMassive[j] = {
      id: id,
      avatar: `img/avatar-${  Math.floor(Math.random() * 6 + 1)  }.svg`,
      message: `${USER_COMMENTS[Math.floor(Math.random() * 7)]  } ${  USER_COMMENTS[Math.floor(Math.random() * 7)]}`,
      name: USER_NAMES[Math.floor(Math.random() * 8)],
    };
  }
  return commentsMassive;
};

//Функция для генерации поста

const getPosts = (quantity) => {
  const massive = [];
  let object;
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
getPosts(25);
