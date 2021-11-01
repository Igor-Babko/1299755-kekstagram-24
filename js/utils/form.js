const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const body = document.querySelector('body');
const uploadCancelButton = document.querySelector('#upload-cancel');
const scaleControlValue = document.querySelector('.scale__control--value');


uploadFile.addEventListener('change', ()=>{
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
  uploadCancelButton.addEventListener('click', closeForm);


});

function onEscKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeForm();
  }
}

function closeForm() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  uploadCancelButton.removeEventListener('click', closeForm);
  uploadFile.value ='';
  scaleControlValue.value = '55%';
}

