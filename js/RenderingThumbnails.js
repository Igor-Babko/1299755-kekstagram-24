const DB = [{
  url: '../img/avatar-1.svg',
  likes: 34,
  comments: 42,
},
{
  url: '../img/avatar-2.svg',
  likes: 35,
  comments: 43,
},
{
  url: '../img/avatar-3.svg',
  likes: 36,
  comments: 44,
},
{
  url: '../img/avatar-4.svg',
  likes: 37,
  comments: 45,
},
{
  url: '../img/avatar-5.svg',
  likes: 38,
  comments: 46,
},
{
  url: '../img/avatar-6.svg',
  likes: 39,
  comments: 47,
},
];


const templateRandomPictures = document.querySelector('#picture').content.querySelector('.picture');

const documentFragment = document.createDocumentFragment();

const pictures = document.querySelector('.pictures');

DB.forEach(({url,likes,comments}) => {
  const newTemplate = templateRandomPictures.cloneNode(true);
  newTemplate.querySelector('.picture__img').src = url;
  newTemplate.querySelector('.picture__likes').textContent = likes;
  newTemplate.querySelector('.picture__comments').textContent = comments;
  documentFragment.appendChild(newTemplate);
});

pictures.appendChild(documentFragment);


// Отобразить фотографии других пользователей.

// Заведите модуль, который будет отвечать за отрисовку миниатюр.

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Подключите модуль в проект.
