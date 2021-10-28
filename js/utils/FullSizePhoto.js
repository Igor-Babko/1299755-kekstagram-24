const bigPicture = document.querySelector('.big-picture');
const pictureCancel = document.querySelector('#picture-cancel');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const picture = document.querySelectorAll('.picture');
const socialCommentCount = document.querySelector('.social__comment-count');


const openBigPicture = function(post){

  const socialComments = document.querySelector('.social__comments');
  const socialComment = bigPicture.querySelector('.social__comment');
  const documentFragment = document.createDocumentFragment;

  socialComments.innerHTML = '';

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img').src = post.url;
  bigPicture.querySelector('.likes-count').textContent = post.likes;
  bigPicture.querySelector('.comments-count').textContent = post.comments.length;

  post.comments.forEach(({message, name, avatar}) => {
    socialComment.querySelector('.social__picture').src = avatar;
    socialComment.querySelector('.social__picture').alt = name;
    socialComment.querySelector('.social__text').textContent = message;


    documentFragment.appendChild(socialComment.cloneNode(true));
  });

  socialComments.appendChild(documentFragment);

  bigPicture.querySelector('.social__caption').textContent = post.description;
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  pictureCancel.addEventListener('click', () => {
    closeBigPhoto();
  });

  const pressEscOnBigPhoto = function(evt){
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        closeBigPhoto();
      }
    });
  };


  const closeBigPhoto = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', pressEscOnBigPhoto);
  };
};


picture.addEventListener('click', openBigPicture());
