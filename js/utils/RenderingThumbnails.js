


const templateRandomPictures = document.querySelector('#picture').content.querySelector('.picture');

const documentFragment = document.createDocumentFragment();

const pictures = document.querySelector('.pictures');


const dataList = (data) => {
  renderMassivePhoto(data);
};


const renderMassivePhoto = (massive) => {
  massive.forEach((element, index, elements) => {
    const newTemplate = templateRandomPictures.cloneNode(true);
    newTemplate.querySelector('.picture__img').src = element.url;
    newTemplate.querySelector('.picture__likes').textContent = element.likes;
    newTemplate.querySelector('.picture__comments').textContent = element.comments.length;
    documentFragment.appendChild(newTemplate);
  });
  pictures.appendChild(documentFragment);
};

// const renderMassivePhoto = (massive) => {
//   massive.forEach(({url,likes,comments}) => {
//     const newTemplate = templateRandomPictures.cloneNode(true);
//     newTemplate.querySelector('.picture__img').src = url;
//     newTemplate.querySelector('.picture__likes').textContent = likes;
//     newTemplate.querySelector('.picture__comments').textContent = comments.length;
//     documentFragment.appendChild(newTemplate);
//     console.log(newTemplate.querySelector('.picture__img').src);
//   });
// };



export {
  renderMassivePhoto,
  dataList
};
