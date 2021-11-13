
const templateRandomPictures = document.querySelector('#picture').content.querySelector('.picture');

const documentFragment = document.createDocumentFragment();

const pictures = document.querySelector('.pictures');

const renderMassivePhoto = (massive) => {
  massive.forEach((element) => {
    const newTemplate = templateRandomPictures.cloneNode(true);
    newTemplate.querySelector('.picture__img').src = element.url;
    newTemplate.querySelector('.picture__likes').textContent = element.likes;
    newTemplate.querySelector('.picture__comments').textContent = element.comments.length;
    documentFragment.appendChild(newTemplate);
  });
  pictures.appendChild(documentFragment);
};

const dataList = (data) => {
  renderMassivePhoto(data);
};

export {
  renderMassivePhoto,
  dataList
};
