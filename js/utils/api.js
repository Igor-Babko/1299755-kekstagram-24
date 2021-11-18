const GET_DATA = 'https://24.javascript.pages.academy/kekstagram/data';
const SEND_DATA = 'https://24.javascript.pages.academy/kekstagram';

import {showPostSuccessModal, showPostErrorModal, removeLoadImgMessage, showAlert} from './notifications.js';
import {closeForm} from './form.js';
// import {startShowPictures} from './fullSizePhoto.js';
import {filterForPictures} from './filters.js';
import {showPhotos} from './rendering-thumbnails.js';
import {uploadPicture} from './form.js';
import {closeBigPhoto} from './full-size-photo.js';

const getData = () => {
  fetch(GET_DATA)
    .then((response) => response.json())
    .then((data) => {
      showPhotos(data);
      filterForPictures(data);
      uploadPicture();
    }).catch((err) => {
      showAlert(`ошибка - ${err}`);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA, {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess(),
        showPostSuccessModal();
      }
    })
    .catch(() => {
      showPostErrorModal(),
      closeForm(),
      closeBigPhoto();
    }).finally(() => {
      removeLoadImgMessage();
    });
};
export {
  getData,
  sendData
};
