import '/js/utils/fullSizePhoto.js';

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const scaleImg = imgUploadPreview.querySelector('img');

const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.effect-level');
const slider = document.querySelector('.effect-level__slider');


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


//добавления эффекта на фото


noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
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

const resetEffects = () => {
  effectLevel.classList.add('hidden');
  slider.style.display = 'none';
  imgUploadPreview.style.filter = '';
  scaleImg.classList.add('.effects__preview');
  scaleImg.style.filter = '';
  scaleImg.classList = '';
};

resetEffects();

const applyEffect = (start, max, min, step, set, filter, measure) => {
  slider.style.display = 'block';
  const measureOfMeasurement = (measure !== undefined) ? measure : '';
  scaleImg.classList = '';
  imgUploadPreview.style = '';
  effectLevelValue.value = '';
  effectLevel.classList.remove('hidden');
  slider.noUiSlider.reset();
  slider.noUiSlider.set(set);
  slider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
  }, true);
  slider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    imgUploadPreview.style.filter = `${filter}(${values[handle]}${measureOfMeasurement})`;
  });
};

effectsList.addEventListener('change', (evt) => {
  if (evt.target.matches('#effect-none')) {
    resetEffects();
  }
  else if (evt.target.matches('#effect-chrome')) {
    applyEffect(1, 1, 0, 0.1, 0, 'grayscale');
    scaleImg.classList.add('.effects__preview--chrome');
  }
  else if (evt.target.matches('#effect-sepia')) {
    applyEffect(1, 1, 0, 0.1, 0, 'sepia');
    scaleImg.classList.add('.effects__preview--sepia');
  }
  else if (evt.target.matches('#effect-marvin')) {
    applyEffect(100, 100, 0, 1, 0, 'invert', '%');
    scaleImg.classList.add('.effects__preview--marvin');
  }
  else if (evt.target.matches('#effect-phobos')) {
    applyEffect(3, 3, 0, 0.1, 0, 'blur', 'px');
    scaleImg.classList.add('.effects__preview--phobos');
  }
  else if (evt.target.matches('#effect-heat')) {
    applyEffect(3, 3, 1, 0.1, 1, 'brightness');
    scaleImg.classList.add('.effects__preview--sepia');
  }
});

export {
  resetEffects
};
