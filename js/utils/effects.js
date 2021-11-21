const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;
const START_EFFECT_LEVEL1 = 1;
const START_EFFECT_LEVEL3 = 3;
const START_EFFECT_LEVEL100 = 100;
const MAX_EFFECT_LEVEL1 = 1;
const MAX_EFFECT_LEVEL3 = 3;
const MAX_EFFECT_LEVEL100 = 100;
const MIN_EFFECT_LEVEL0 = 0;
const MIN_EFFECT_LEVEL1 = 1;
const STEP_EFFECT_LEVEL01 = 0.1;
const STEP_EFFECT_LEVEL1 = 1;
const SET_EFFECT_LEVEL0 = 0;
const SET_EFFECT_LEVEL1 = 1;

const NOUISLIDER_MIN_RANGE = 0;
const NOUISLIDER_MAX_RANGE = 1;
const NOUISLIDER_START_LEVEL = 1;
const NOUISLIDER_STEP_LEVEL = 0.1;

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

const renderScalePhoto = (scaleValue) => {
  const scale = +scaleValue.replace(/\D+/, '');
  (scale < 100) ? scaleImg.style.transform = `scale(0.${scale})`: scaleImg.style.transform = 'scale(1.0)';
};


const resizeImg = (evt) => {
  const currentValue = +scaleControlValue.value.replace(/\D+/, '');
  if (currentValue < MAX_SCALE && evt.target.matches('.scale__control--bigger')) {
    scaleControlValue.value = `${currentValue + STEP_SCALE}%`;
    renderScalePhoto(scaleControlValue.value);
  }
  if (currentValue > MIN_SCALE && evt.target.matches('.scale__control--smaller')) {
    scaleControlValue.value = `${currentValue - STEP_SCALE}%`;
    renderScalePhoto(scaleControlValue.value);
  }
};

function scaleControlBiggerHandler(evt){
  resizeImg(evt);
}
function scaleControlSmallerHandler(evt){
  resizeImg(evt);
}
scaleControlSmaller.addEventListener('click', scaleControlSmallerHandler);
scaleControlBigger.addEventListener('click', scaleControlBiggerHandler);


//добавления фильтра на фото

noUiSlider.create(slider, {
  range: {
    min: NOUISLIDER_MIN_RANGE,
    max: NOUISLIDER_MAX_RANGE,
  },
  start: NOUISLIDER_START_LEVEL,
  step: NOUISLIDER_STEP_LEVEL,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

const resetEffects = () => {
  effectLevel.classList.add('hidden');
  slider.style.display = 'none';
  scaleImg.style.filter = '';
  scaleImg.classList.add('effects__preview');
  scaleImg.className = '';
};

resetEffects();

const applyEffect = (start, max, min, step, set, filter, measure = '') => {
  slider.style.display = 'block';
  scaleImg.classList = '';
  scaleImg.style = '';
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
    scaleImg.style.filter = `${filter}(${values[handle]}${measure})`;
  });
};

effectsList.addEventListener('change', (evt) => {
  if (evt.target.matches('#effect-none')) {
    resetEffects();
  } else if (evt.target.matches('#effect-chrome')) {
    applyEffect(START_EFFECT_LEVEL1, MAX_EFFECT_LEVEL1, MIN_EFFECT_LEVEL0, STEP_EFFECT_LEVEL01, SET_EFFECT_LEVEL0, 'grayscale');
    scaleImg.classList.add('effects__preview--chrome');
  } else if (evt.target.matches('#effect-sepia')) {
    applyEffect(START_EFFECT_LEVEL1, MAX_EFFECT_LEVEL1, MIN_EFFECT_LEVEL0, STEP_EFFECT_LEVEL01, SET_EFFECT_LEVEL0, 'sepia');
    scaleImg.classList.add('effects__preview--sepia');
  } else if (evt.target.matches('#effect-marvin')) {
    applyEffect(START_EFFECT_LEVEL100, MAX_EFFECT_LEVEL100, MIN_EFFECT_LEVEL0, STEP_EFFECT_LEVEL1, SET_EFFECT_LEVEL0, 'invert', '%');
    scaleImg.classList.add('effects__preview--marvin');
  } else if (evt.target.matches('#effect-phobos')) {
    applyEffect(START_EFFECT_LEVEL3, MAX_EFFECT_LEVEL3, MIN_EFFECT_LEVEL0, STEP_EFFECT_LEVEL01, SET_EFFECT_LEVEL0, 'blur', 'px');
    scaleImg.classList.add('effects__preview--phobos');
  } else if (evt.target.matches('#effect-heat')) {
    applyEffect(START_EFFECT_LEVEL3, MAX_EFFECT_LEVEL3, MIN_EFFECT_LEVEL1, STEP_EFFECT_LEVEL01, SET_EFFECT_LEVEL1, 'brightness');
    scaleImg.classList.add('effects__preview--sepia');
  }
});

export {
  resetEffects,
  scaleControlSmaller,
  scaleControlBigger,
  scaleControlSmallerHandler,
  scaleControlBiggerHandler
};
