const USER_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const USER_NAMES = ['Катя', 'Оля', 'Дима', 'Игорь', 'Наташа', 'Вася', 'Оксана', 'Тимур'];


//Функция для проверки максимальной длины строки

// const checkFieldLength = function (string, maxLength) {
//   return maxLength >= string.length;
// };
// console.log(getRandom(4,6));


///Функция для получения рандомного числа в заданных диапазонах
const getRandom = (min, max) => {
  if (max > min && min >= 0 && max >= 0) {
    max -= min;
    return Math.floor((Math.random() * ++max) + min);
  }
  // Тут был лишний else. Если у тебя есть if .. return, то else писать не надо
  if ((max <= min && min >= 0 && max >= 0)) {
    const change = max;
    max = min;
    min = change;
    max -= min;
    return Math.floor((Math.random() * ++max) + min);
  }
};

// Можно добавить функцию, возвращающую случайный элемент из массива
const getRandomElement = (array) => array[getRandom(0, array.length-1)];

// Вместо массива можно использовать Set. Он будет гораздо быстрее работать
const generatedIds = new Set();
const generateCommentId = () => {
  let id = getRandom(1, 1000);
  while (generatedIds.has(id)) {
    id = getRandom(1, 1000);
  }
  generatedIds.add(id); // Можно перенести сюда, так как после генерации ты всегда сразу добавляешь в массив
  return id;
};

// Выношу генерацию 1 комментария в отдельную функцию
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandom(1, 6)}.svg`,
  message: `${getRandomElement(USER_COMMENTS)} ${getRandomElement(USER_COMMENTS)}`,
  name: getRandomElement(USER_NAMES),

});
createComment();

//Функция для генерации массива комментариев случайной длины
const createComments = () => {
  const quantity = getRandom(1, 10); //Генерируем случайное количество комментариев (1-10)

  // Вместо массива можно добавить функционального программирования.
  return Array(quantity).fill(null).map(() => createComment());
};

// Функция для генерации поста, id я передаю параметром
const createPost = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: 'Одна из моих любимых фотографий',
  likes: getRandom(15, 200),
  comments: createComments(),
});

// Генерация всех записей. В данной записи i - это номер итерации, как ты раньше в цикле делал
const createPosts = (quantity) => Array(quantity).fill(null).map((item, i) => createPost(i + 1));

createPosts(25);
