import {generatedPosts} from './data.js';

const templateRandomPictures = document.querySelector('#picture').content.querySelector('.picture');

const documentFragment = document.createDocumentFragment();

const pictures = document.querySelector('.pictures');

generatedPosts.forEach(({url,likes,comments}) => {
  const newTemplate = templateRandomPictures.cloneNode(true);
  newTemplate.querySelector('.picture__img').src = url;
  newTemplate.querySelector('.picture__likes').textContent = likes;
  newTemplate.querySelector('.picture__comments').textContent = comments.length;
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


// Отобразить фотографии других пользователей.

// Заведите модуль, который будет отвечать за отрисовку миниатюр.

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Подключите модуль в проект.
