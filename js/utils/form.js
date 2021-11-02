const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_LENGTH_COMMENT = 140;
const HASHTAG = '/^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/';

const textDescription = document.querySelector('.text__description');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const scaleControlValue = document.querySelector('.scale__control--value');
const textHashtags = document.querySelector('.text__hashtags');
const firstSymbol = /^#/;
const oneHash = /#\s/;
const spaceBeforeHashtag = /\S#/;


function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (document.activeElement === textDescription || document.activeElement === textHashtags) {
      evt.stopPropagation;
    } else {
      closeForm();
    }
  }
}

function openForm() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
}

function closeForm() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  uploadCancel.removeEventListener('click', closeForm);
  uploadFile.value ='';
  scaleControlValue.value = '55%';
}

uploadFile.addEventListener('change', ()=>{
  openForm();
});

uploadFile.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter',(evt)) {
    openForm();
  }
});

uploadCancel.addEventListener ('click', () =>{
  closeForm();
});

uploadCancel.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter',(evt)) {
    closeForm();
  }
});

// const checkHashValidity = ()=> {


// }












// textHashtags.addEventListener('input', () => {
//   const errors = [];
//   const textHashtagsValue = textHashtags.value;
//   const arrayOfHashtags = textHashtags.value.trim().toLowerCase().split(' ').filter((item) => item !== '');
//   const hasStringDuplicates =  (new Set(arrayOfHashtags)).size !== arrayOfHashtags.length;
//   const hasSpaceBeforeHash = spaceBeforeHashtag.test(textHashtagsValue);
//   const isEveryHashtagStartsHash = arrayOfHashtags.every((hashtag) =>firstSymbol.test(hashtag));
//   const isEveryHashtagLessTwentySymbols = arrayOfHashtags.every((hashtag) => hashtag.length > MAX_HASHTAG_LENGTH);
//   const isEveryHashtagHasText = arrayOfHashtags.every((hashtag) => oneHash.test(hashtag));
//   const isEveryHashtagValid = arrayOfHashtags.every((hashtag) => hashtag.match(hashtag.replace('#', '')) || hashtag === '#');
//   if  (arrayOfHashtags.length > 5){
//     errors.push('\n- Можно использовать максимум пять хэш-тегов');
//   }
//   if (hasStringDuplicates) {
//     errors.push('\n- Один и тот же хэш-тег не может быть использован дважды');

//   }
//   if (hasSpaceBeforeHash){
//     errors.push('\n- Хэш-теги разделяются пробелами');
//   }
//   if(!isEveryHashtagStartsHash){
//     errors.push('\n- Хеш-тег должен начинаться с символа # (решетка)');
//   }
//   if(isEveryHashtagLessTwentySymbols){
//     errors.push('\n- Максимальная длина одного хэш-тега 20 символов, включая решётку');
//   }
//   if(!isEveryHashtagHasText){
//     errors.push('\n- Хеш-тег не может состоять только из одной решётки');
//   }
//   if(!isEveryHashtagValid){
//     errors.push('\n- Хэш-тег не может содержать спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
//   }
//   textHashtags.setCustomValidity(errors.toString());
//   console.log(errors);
//   textHashtags.reportValidity();
// });

// textHashtags.addEventListener('input', () => {

//   const textHashtagsValueLength = textHashtags.value.length;

//   if (textHashtagsValueLength < MIN_HASHTAG_LENGTH) {
//     // textHashtags.setCustomValidity('Минимальная длина хэш-тега - 2 символа');
//     // textDescription.reportValidity();
//   } else if (textHashtagsValueLength >= MAX_HASHTAG_LENGTH) {
//     textHashtags.setCustomValidity('Максимальная длина хэш-тега - 20 символов');
//   } else {
//     textHashtags.setCustomValidity('');
//   }
// });

textDescription.addEventListener('input', () => {

  const textDescriptionValueLength = textDescription.value.length;
  if (textDescriptionValueLength >= MAX_LENGTH_COMMENT) {
    textDescription.setCustomValidity('Максимальная длина хэш-тега - 140 символов');
    textDescription.reportValidity();
  } else {
    textDescription.setCustomValidity('');
  }
});
