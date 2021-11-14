import {
  getRandomInt,
  checkDuplicates
} from './utils.js';
import {
  debounce
} from './debounce.js';
import {
  showPhotos
} from './renderingThumbnails.js';

const DATA_RANDOM_LENGTH = 10;


const filterPictures = (data) => {
  const imgFiltersBlock = document.querySelector('.img-filters');
  const imgFiltersForm = document.querySelector('.img-filters__form');
  const imgFiltersButtons = document.querySelectorAll('.img-filters__button');
  imgFiltersBlock.classList.remove('img-filters--inactive');

  const sortPosts = (sortName) => {
    if (sortName === 'filter-default') {
      showPhotos(data);
    }

    if (sortName === 'filter-discussed') {
      const filterDiscussed = JSON.parse(JSON.stringify(data)).sort((item1, item2) => item2.comments.length - item1.comments.length);
      showPhotos(filterDiscussed);
    }

    if (sortName === 'filter-random') {
      const randomData = [];
      for (let i = 0; i < DATA_RANDOM_LENGTH; i++) {
        randomData.push(data[getRandomInt(0, data.length - 1)]);
        if (checkDuplicates(randomData)) {
          randomData.pop();
          i--;
        }
      }
      showPhotos(randomData);
    }
  };

  const onFiltersClick = (evt) => {
    imgFiltersButtons.forEach((btn) => {
      btn.classList.remove('img-filters__button--active');
    });

    if (evt.target.closest('.img-filters__button')) {
      evt.target.classList.add('img-filters__button--active');
      const sortName = evt.target.id;
      sortPosts(sortName);
    }
  };

  imgFiltersForm.addEventListener('click', debounce(onFiltersClick));
};

export{
  filterPictures
};
