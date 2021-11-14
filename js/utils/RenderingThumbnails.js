import {startShowPictures} from './fullSizePhoto.js';

const templateRandomPictures = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const documentFragment = document.createDocumentFragment();

const showPhotos = (pictureData) => {
  const pictureElem = document.querySelectorAll('.picture');
  pictureElem.forEach((elem) => {
    elem.remove();
  });
  pictureData.forEach((element) => {
    const newTemplate = templateRandomPictures.cloneNode(true);
    newTemplate.querySelector('.picture__img').src = element.url;
    newTemplate.querySelector('.picture__likes').textContent = element.likes;
    newTemplate.querySelector('.picture__comments').textContent = element.comments.length;
    documentFragment.appendChild(newTemplate);
  });
  pictures.appendChild(documentFragment);
  startShowPictures(pictureData);
};
export {
  showPhotos
};
