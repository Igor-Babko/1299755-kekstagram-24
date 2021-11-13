import '/js/utils/renderingThumbnails.js';
import '/js/utils/fullSizePhoto.js';
import '/js/utils/form.js';
import '/js/utils/scale&effects.js';
import {closeForm} from '/js/utils/form.js';
import {setUserFormSubmit} from '/js/utils/form.js';
import {getData} from './utils/api.js';

getData();

setUserFormSubmit(closeForm);


