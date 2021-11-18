
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const pictureCancel = document.querySelector('#picture-cancel');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');
const documentFragment = document.createDocumentFragment();
let bigPictureComments;
let importedData;
let openedComments = 0;


const addFiveComments = () => {
  for (let i = openedComments; i < importedData.comments.length; i++) {
    openedComments += 1;
    const comment = document.createElement('li');
    comment.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.alt = importedData.comments[i].name;
    img.src = importedData.comments[i].avatar;

    const p = document.createElement('p');
    comment.classList.add('social__text');
    p.textContent = importedData.comments[i].message;

    comment.appendChild(img);
    comment.appendChild(p);
    documentFragment.appendChild(comment);
    if (openedComments === importedData.comments.length) {
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', addFiveComments);
    }
    if ((i+1) % 5 === 0) {
      break;
    }
  }
  bigPictureComments = `${openedComments} из ${importedData.comments.length}`;
  bigPictureCommentsCount.textContent =  bigPictureComments;
  socialComments.appendChild(documentFragment);
};

function onPopupEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPhoto();
  }
}

function closeBigPhoto() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  pictureCancel.removeEventListener('click', closeBigPhoto);
  openedComments = 0;

}

const startShowPictures = (data) => {
  pictures.addEventListener('click', (evt) => {

    if (evt.target.matches(('.picture__img'))) {
      const pictureElement = evt.target.closest('.picture');
      const allPictures = Array.from(document.querySelectorAll('.picture'));
      const index = allPictures.indexOf(pictureElement);
      importedData = data[index];

      socialComments.innerHTML = '';

      document.body.classList.add('modal-open');
      bigPicture.classList.remove('hidden');

      bigPictureCommentsCount.textContent = importedData.comments.length;
      bigPicture.querySelector('.big-picture__img').querySelector('img').src = importedData.url;
      bigPicture.querySelector('.likes-count').textContent = importedData.likes;

      bigPicture.querySelector('.social__caption').textContent = importedData.description;

      socialCommentCount.classList.remove('hidden');
      commentsLoader.classList.remove('hidden');
      document.body.classList.add('modal-open');
      pictureCancel.addEventListener('click', closeBigPhoto);
      document.addEventListener('keydown', onPopupEscKeydown);

      commentsLoader.addEventListener('click', addFiveComments);
      openedComments = 0;
      if (openedComments === 0) {
        addFiveComments();
      }
    }
  });
};
export {
  startShowPictures,closeBigPhoto
};
