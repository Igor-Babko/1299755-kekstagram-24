const ALERT_SHOW_TIME = 5000;

const body = document.querySelector('body');
const imgMessage = document.querySelector('#messages');
const successPopup = document.querySelector('#success');
const errorPopup = document.querySelector('#error');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '20px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showLoadImgMessage = () => {
  const templateItem = imgMessage.content.cloneNode(true);
  body.append(templateItem);
};

const removeLoadImgMessage = () => {
  document.querySelector('.img-upload__message--loading').remove();
};


const showPostErrorModal = () => {
  const templateItem = errorPopup.content.cloneNode(true);
  body.append(templateItem);
  const errorClass = document.querySelector('.error');

  const closeErrorModal = () => {
    errorClass.remove();
    document.removeEventListener('keydown', escapeKeyDownHadler);
  };

  function escapeKeyDownHadler(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeErrorModal();
    }
  }

  const errorCloseClickHandler = (evt) => {
    if (!evt.target.closest('.error__inner') || evt.target.getAttribute('type') === 'button') {
      closeErrorModal();
    }
  };
  errorClass.addEventListener('click', errorCloseClickHandler);
  document.addEventListener('keydown', escapeKeyDownHadler);
};
const showPostSuccessModal = () => {
  const templateItem = successPopup.content.cloneNode(true);
  body.append(templateItem);
  const successModal = document.querySelector('.success');

  const successModalCloseHandler = () => {
    successModal.remove();
    document.removeEventListener('keydown', escapeKeyDownHadler);
  };

  function escapeKeyDownHadler(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successModalCloseHandler();
    }
  }

  const successCloseClickHandler = (evt) => {
    if (!evt.target.closest('.success__inner') || evt.target.getAttribute('type') === 'button') {
      successModalCloseHandler();
    }
  };
  successModal.addEventListener('click', successCloseClickHandler);
  document.addEventListener('keydown', escapeKeyDownHadler);
};


export {
  showAlert,
  showPostSuccessModal,
  showPostErrorModal,
  showLoadImgMessage,
  removeLoadImgMessage
};
