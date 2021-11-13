import {
  dataList
} from './renderingThumbnails.js';
import {
  showPostSuccessModal,
  showPostErrorModal,
  removeLoadImgMessage
} from './notifications.js';
import {
  closeForm
} from './form.js';

const getData = () => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      dataList(data);
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
