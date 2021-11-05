import '/js/utils/fullSizePhoto.js';

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const scaleImg = imgUploadPreview.querySelector('img');

// Функционал приближения и отдаления фото

scaleControlSmaller.addEventListener('click', doImgSmaller);
scaleControlBigger.addEventListener('click', doImgBigger);


const renderScalePhoto = (scaleValue) => {
  const scale = +scaleValue.replace(/\D+/, '');
  if (scale < 100) {
    scaleImg.style.transform = `scale(0.${scale})`;
  } else {
    scaleImg.style.transform = 'scale(1.0)';
  }
};

function doImgBigger() {

  const currentValue = +scaleControlValue.value.replace(/\D+/, '');
  if (currentValue < MAX_SCALE) {
    scaleControlValue.value = `${currentValue + STEP_SCALE}%`;
    renderScalePhoto(scaleControlValue.value);
  } else {
    scaleControlValue.value = `${MAX_SCALE}%`;
  }
}

function doImgSmaller() {

  const currentValue = +scaleControlValue.value.replace(/\D+/, '');
  if (currentValue > MIN_SCALE) {
    scaleControlValue.value = `${currentValue - STEP_SCALE}%`;
    renderScalePhoto(scaleControlValue.value);
  } else {
    scaleControlValue.value = `${MIN_SCALE}%`;
  }
}


