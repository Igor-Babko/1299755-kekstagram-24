import {
  generatedPosts
} from './data.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const pictureCancel = document.querySelector('#picture-cancel');
const commentsLoader = document.querySelector('.comments-loader');

pictures.addEventListener('click', (evt) => {
  const pictureElement = evt.target.closest('.picture');
  const arrayPictures = Array.from(document.querySelectorAll('.picture'));
  const index = arrayPictures.indexOf(pictureElement);
  const data = generatedPosts[index];

  const socialComments = document.querySelector('.social__comments');
  const documentFragment = document.createDocumentFragment();

  socialComments.innerHTML = '';

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.comments-count').textContent = data.comments.length;

  data.comments.forEach(({ message, name, avatar}) => {

    const comment = document.createElement('li');
    comment.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = avatar;
    img.alt = name;

    const p = document.createElement('p');
    comment.classList.add('social__text');
    p.textContent = message;

    comment.appendChild(img);
    comment.appendChild(p);

    documentFragment.appendChild(comment);
  });

  socialComments.appendChild(documentFragment);
  bigPicture.querySelector('.social__caption').textContent = data.description;


  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  pictureCancel.addEventListener('click', closeBigPhoto);
  document.addEventListener('keydown', onPopupEscKeydown);

  function onPopupEscKeydown(event){
    if (event.key === 'Escape') {
      event.preventDefault();
      closeBigPhoto();
    }
  };

  function closeBigPhoto() {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    pictureCancel.removeEventListener('click', closeBigPhoto);
  };
});
