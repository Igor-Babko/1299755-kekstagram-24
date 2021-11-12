import {createPosts} from './utils/data.js';
import '/js/utils/renderingThumbnails.js';
import '/js/utils/fullSizePhoto.js';
import '/js/utils/form.js';
import '/js/utils/scale&effects.js';
import '/js/utils/server.js';

createPosts(25);


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
