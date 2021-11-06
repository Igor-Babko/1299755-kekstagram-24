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


// Функционал добавления эффекта на фото

const effectsRadio = document.querySelector('.effects__radio');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectNone = document.querySelector('#effect-none');
const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.effect-level');
const sliderElement = document.querySelector('#slider');


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});


const defaultEffectImages = () => {
  effectsRadio.forEach((effect) => {
    if (effect.id === 'effect-none') {
      effect.setAttribute('checked', 'checked');
    }
  });
  effectLevel.classList.add('hidden');
  effectLevelValue.value = '';
  imgUploadPreview.className = '';
  imgUploadPreview.style = '';
  imgUploadPreview.classList.add('img-upload__preview');
};

const changeEffectImages = (changeEffect, min, max, start, step, set, filter, unit) => {
  const toUnit = (unit === undefined) ? '' : unit;
  effectLevel.classList.remove('hidden');
  imgUploadPreview.className = '';
  imgUploadPreview.style = '';
  effectLevelValue.value = '';
  imgUploadPreview.classList.add('img-upload__preview');
  imgUploadPreview.classList.add(`effects__preview--${changeEffect}`);
  sliderElement.noUiSlider.reset();
  sliderElement.noUiSlider.set(set);
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
  }, true);
  sliderElement.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    imgUploadPreview.style.filter = `${filter}(${values[handle]}${toUnit})`;
  });
};
// const cbChangeEffectImages = (evt) => {
//   if (evt.target.id === 'effect-chrome') {
//     changeEffectImages('chrome', 0, 1, 0, 0.1, 0, 'grayscale');
//   } else if (evt.target.id === 'effect-sepia') {
//     changeEffectImages('sepia', 0, 1, 0, 0.1, 0, 'sepia');
//   } else if (evt.target.id === 'effect-marvin') {
//     changeEffectImages('marvin', 0, 100, 0, 1, 0, 'invert', '%');
//   } else if (evt.target.id === 'effect-phobos') {
//     changeEffectImages('phobos', 0, 3, 0, 0.1, 0, 'blur', 'px');
//   } else if (evt.target.id === 'effect-heat') {
//     changeEffectImages('heat', 1, 3, 1, 0.1, 1, 'brightness');
//   } else {
//     defaultEffectImages();
//   }
// };

// sliderElement.style.display = 'none';

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  effectLevelValue.value = unencoded[handle];
});

effectsList.addEventListener('click', (evt) => {

  if (evt.target.matches('#effect-none')) {
    defaultEffectImages();
  }
  if (evt.target.matches('#effect-chrome')) {
    changeEffectImages('chrome', 0, 1, 0, 0.1, 0, 'grayscale');
  }

  if (evt.target.matches('#effect-sepia')) {
    changeEffectImages('sepia', 0, 1, 0, 0.1, 0, 'sepia');
  }

  if (evt.target.matches('#effect-marvin')) {
    changeEffectImages('marvin', 0, 100, 0, 1, 0, 'invert', '%');
  }
  if (evt.target.matches('#effect-phobos')) {
    changeEffectImages('phobos', 0, 3, 0, 0.1, 0, 'blur', 'px');
  }
  if (evt.target.matches('#effect-heat')) {
    changeEffectImages('heat', 1, 3, 1, 0.1, 1, 'brightness');
  }
});
