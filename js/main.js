
import {createPosts} from './utils/data.js';
import '/js/utils/RenderingThumbnails.js';
import '/js/utils/fullSizePhoto.js';
import addNewImg from '/js/utils/form.js';

createPosts(25);
addNewImg();

// Модуль отвечающий за масштаб изображения
// модуль с применением эффекта
// модуль отвечающий за глубину применения эффекта
//модуль с добавлением комментария
//модуль отвечающий за хеш теги

//масштаб загруженной картинки
// const doImgSmaller = document.querySelector('.scale__control--smaller');
// const doImgBigger = document.querySelector('.scale__control--bigger');
// const ImgScaleValue = document.querySelector('.scale__control--value');

// ImgScaleValue.max = 100;
// ImgScaleValue.min = 25;

// doImgSmaller.onclick = ImgScaleValue(){
//   ImgScaleValue.value =
// }
