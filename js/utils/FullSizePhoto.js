const BigPicture = document.querySelector('.big-picture');

let openBigPicture = (evt) => {
BigPicture.classList.remove('hidden');
  document.querySelector('.big-picture__img').src = evt.target.url;
  document.querySelector('.likes-count').textContent = evt.target.likes;
  document.querySelector('.comments-count').textContent = evt.target.comments;
}

