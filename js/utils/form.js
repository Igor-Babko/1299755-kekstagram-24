import {
  resetEffects,
  scaleControlSmaller,
  scaleControlBigger,
  resizeImgSmallerHandler,
  resizeImgBiggerHandler
} from './effects.js';

import {
  showLoadImgMessage,
  showAlert
} from './notifications.js';

import {
  sendData
} from './api.js';

import {
  checkDuplicates
} from './utils.js';


const MAX_COMMENT_LENGTH = 140;
const MAX_HASH_LENGTH = 20;
const MAX_HASH_ARRAY_LENGTH = 5;
const ERROR_COLOR = '#8B0000';
const REGEXP = /[~`!@_()$%^&*+=\-[\]\\';,/{}|\\":<>?]/g;
const ERROR_SENDING_DATA = 'Не удалось отправить форму. Попробуйте ещё раз';
const ERROR_MAX_SYMBOLS_HASHTAG = 'Максимум 20 символов в одном хэш-теге';
const ERROR_MAX_FIVE_SYMBOLS = 'можно указать максимум 5 хэш-тегов';
const ERROR_ONLY_GRID = 'хеш-тег не может состоять только из решётки';
const ERROR_FIRST_SYMBOL = 'Первым символом хэш-тега должна быть #';
const ERROR_WRONG_SYMBOLS = 'В хэш-теге запрещено указывать пробелы, спецсимволы (@, $ и т. п.)';
const ERROR_SPACE_BETWEEN_HASHTAGS = 'Хэштеги должны разделяться пробелом';
const ERROR_SAME_HASHTAGS = 'Нельзя указывать одинаковые хэш-теги';


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
const effectPreviewImages = document.querySelectorAll('.effects__preview');

const checkStringLength = (max, string) => string.length <= max;


const keyDownEscHandler = (evt) => {
  if (!evt.target.closest('.img-upload__text') && evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
};

const checkCommentsValidityHandler = () => {
  if (!checkStringLength(MAX_COMMENT_LENGTH, textDescription.value)) {
    textDescription.setCustomValidity('до 140 символов');
  } else {
    textDescription.setCustomValidity('');
  }
  textDescription.reportValidity();
};

const checkHashtagsValidityHandler = () => {
  textHashtags.value = textHashtags.value.replace(/\s+/g, ' ');
  const hashElements = textHashtags.value.toLowerCase().split(' ');

  let error = '';

  hashElements.forEach((hash) => {
    hash.trim();

    if (hash.length > MAX_HASH_LENGTH) {
      error = ERROR_MAX_SYMBOLS_HASHTAG;
      validate = false;
    } else if (hashElements.length > MAX_HASH_ARRAY_LENGTH) {
      error = ERROR_MAX_FIVE_SYMBOLS;
      validate = false;
    } else if (hash === '#') {
      error = ERROR_ONLY_GRID;
      validate = false;
    } else if (!hash.startsWith('#')) {
      error = ERROR_FIRST_SYMBOL;
      validate = false;
    } else if (REGEXP.test(hash)) {
      error = ERROR_WRONG_SYMBOLS;
      validate = false;
    } else if (hash.indexOf('#', 1) > 0) {
      error = ERROR_SPACE_BETWEEN_HASHTAGS;
    } else {
      validate = true;
    }
  });
  if (checkDuplicates(hashElements)) {
    error = ERROR_SAME_HASHTAGS;
  }
  if (hashElements[0] === '') {
    textHashtags.value = textHashtags.value.trim();
  } textHashtags.setCustomValidity(!error ? '' : error);

  textHashtags.reportValidity();
};


const hastagsBlurHandler = () => {
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

  imgUploadCancel.addEventListener('click', closeFormHandler);
  document.addEventListener('keydown', keyDownEscHandler);


  textHashtags.addEventListener('input', checkHashtagsValidityHandler);
  textDescription.addEventListener('input', checkCommentsValidityHandler);
  hashtagInput.addEventListener('blur', hastagsBlurHandler);
  hashtagInput.addEventListener('keydown', checkValidHandler);
}

function closeForm() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadForm.reset();

  document.removeEventListener('keydown', keyDownEscHandler);
  imgUploadCancel.removeEventListener('click', closeFormHandler);
  textDescription.removeEventListener('input', checkCommentsValidityHandler);
  textHashtags.removeEventListener('input', checkHashtagsValidityHandler);
  uploadFile.value = '';
  textDescription.value = '';
  imgUploadPreview.style.transform = 'scale(1)';
  effectNone.checked = true;

  scaleControlSmaller.removeEventListener('click', resizeImgSmallerHandler);
  scaleControlBigger.removeEventListener('click', resizeImgBiggerHandler);

  resetEffects();
}

function closeFormHandler() {
  closeForm();
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
      () => showAlert(ERROR_SENDING_DATA),
      new FormData(evt.target),
    );
  });
};

const uploadPicture = () => {
  uploadFile.addEventListener('change', () => {
    openForm();
    const imgUrl = URL.createObjectURL(uploadFile.files[0]);
    imgUploadPreview.src = imgUrl;
    effectPreviewImages.forEach((elem) => {
      elem.style.backgroundImage = `url(${imgUrl})`;
    });
  });
};

export {
  setUserFormSubmit,
  closeForm,
  openForm,
  uploadPicture
};
