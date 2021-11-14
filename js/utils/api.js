import {showPostSuccessModal, showPostErrorModal, removeLoadImgMessage, showAlert} from './notifications.js';
import {closeForm} from './form.js';
import {startShowPictures} from './fullSizePhoto.js';
import {filterForPictures} from './filters.js';
import {showPhotos} from './renderingThumbnails.js';
import {uploadPicture} from './form.js';



const getData = () => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      showPhotos(data);
      startShowPictures(data);
      filterForPictures(data);
      uploadPicture()
    }).catch((err) => {
      showAlert(`ошибка - ${err}`);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    ' https://24.javascript.pages.academy/kekstagram', {
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
      closeForm(),
      showPostErrorModal();
    }).finally(() => {
      removeLoadImgMessage();
    });
};
export {
  getData,
  sendData
};
