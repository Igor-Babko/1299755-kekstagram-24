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

