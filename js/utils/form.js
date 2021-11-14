import {
  resetEffects,
  scaleControlSmaller,
  scaleControlBigger,
  resizeImg
} from './scale&effects.js';

import {showLoadImgMessage, showAlert} from './notifications.js';

import {sendData} from './api.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASH_LENGTH = 20;
const MAX_HASH_ARRAY_LENGTH = 5;
const ERROR_COLOR = '#8B0000';


const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectNone = document.querySelector('#effect-none');
const hashtagInput = imgUploadOverlay.querySelector('.text__hashtags');
let validate = true;


const checkStringLength = (max, string) => string.length <= max;
const regExp = /[~`!@_()$%^&*+=\-[\]\\';,/{}|\\":<>?]/g;

const isHasDuplicates = (array) => (new Set(array)).size !== array.length;
const keydownEsc = (evt) => {
  if (!evt.target.closest('.img-upload__text') && evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
};
const clickOnCancelButton = () => {
  closeForm();
};
const checkCommentsValidity = () => {
  if (!checkStringLength(MAX_COMMENT_LENGTH, textDescription.value)) {
    textDescription.setCustomValidity('до 140 символов');
  } else {
    textDescription.setCustomValidity('');
  }
  textDescription.reportValidity();
};

const checkHashtagsValidity = () => {
  textHashtags.value = textHashtags.value.replace(/\s+/g, ' ');
  const hashArray = textHashtags.value.toLowerCase().split(' ');

  let error = '';

  hashArray.forEach((hash) => {
    hash.trim();

    if (hash.length > MAX_HASH_LENGTH) {
      error = 'Максимум 20 символов в одном хэш-теге';
      validate = false;
    } else if (hashArray.length > MAX_HASH_ARRAY_LENGTH) {
      error = 'можно указать максимум 5 хэш-тегов';
      validate = false;
    } else if (hash === '#') {
      error = 'хеш-тег не может состоять только из решётки';
      validate = false;
    } else if (!hash.startsWith('#')) {
      error = 'Первым символом хэш-тега должна быть #';
      validate = false;
    } else if (regExp.test(hash)) {
      error = 'В хэш-теге запрещено указывать пробелы, спецсимволы (@, $ и т. п.)';
      validate = false;
    } else {
      validate = true;
    }
  });
  if (isHasDuplicates(hashArray)) {
    error = 'Нельзя указывать одинаковые хэш-теги';
  }
  if (hashArray[0] === '') {
    textHashtags.value = textHashtags.value.trim();
  } else if (!error) {
    textHashtags.setCustomValidity('');
  } else {
    textHashtags.setCustomValidity(error);
  }

  textHashtags.reportValidity();
};


const checkInvalidHandler = () => {
  if (!validate && hashtagInput.value) {
    hashtagInput.style.borderColor = ERROR_COLOR;
  }
};

const checkValidHandler = function () {
  hashtagInput.removeAttribute('style');
};


function openForm() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  imgUploadCancel.addEventListener('click', clickOnCancelButton);
  document.addEventListener('keydown', keydownEsc);


  textHashtags.addEventListener('input', checkHashtagsValidity);
  textDescription.addEventListener('input', checkCommentsValidity);
  hashtagInput.addEventListener('blur', checkInvalidHandler);
  hashtagInput.addEventListener('keydown', checkValidHandler);
}

function closeForm() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadForm.reset();

  document.removeEventListener('keydown', keydownEsc);
  imgUploadCancel.removeEventListener('click', clickOnCancelButton);
  textDescription.removeEventListener('input', checkCommentsValidity);
  textHashtags.removeEventListener('input', checkHashtagsValidity);
  uploadFile.value = '';
  textDescription.value = '';
  imgUploadPreview.style.transform = 'scale(1)';
  effectNone.checked = true;

  scaleControlSmaller.removeEventListener('click', resizeImg);
  scaleControlBigger.removeEventListener('click', resizeImg);

  resetEffects();
}

uploadFile.addEventListener('change', () => {
  openForm();
});

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    showLoadImgMessage();
    sendData(
      () => onSuccess(),
      () => showAlert('Не удалось отправить форму. Попробуйте ещё раз'),
      new FormData(evt.target),
    );
  });
};

export {
  setUserFormSubmit,
  closeForm,
  openForm
};
