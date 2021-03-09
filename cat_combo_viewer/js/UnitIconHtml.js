'use strict';

import * as utils from './utils.js';
import * as bc from './bc.js';

import CatUnit from './CatUnit.js';

const createUnitIconElement = function () {
  // <div class="icon">
  //   <div class="image-icon"></div>
  // </div>
  const iconElement = document.createElement('div');
  iconElement.className = 'icon';

  const imageIconElement = document.createElement('div');
  imageIconElement.className = 'image-icon';

  iconElement.appendChild(imageIconElement);

  return iconElement;
};

// Class UnitIconHtml

const UnitIconHtml = function ({
  unitIconElt = null,
  catUnit = null,
  form = bc.FORM_NONE,
  position = null,
} = {}) {

let unitIconElement = unitIconElt;
let catUnit_ = catUnit;
let form_ = form;

// Active Effect: show if the unit in the combo is present in the deck.
let present = null;

this.init = function () {
  if (unitIconElement == null) {
    unitIconElement = createUnitIconElement();
  }

  if (position != null) {
    unitIconElement.setAttribute('data-pos', position);
  }
};

this.clear = function () {
  catUnit_ = null;
  form_ = bc.FORM_NONE;
};

this.getCatUnit = function () {
  return catUnit_;
};

this.getForm = function () {
  return form_;
}

this.getId = function () {
  return catUnit_ != null ? catUnit_.getId() : bc.ID_NONE;
};

this.setUnit = function (catUnit, form) {
  catUnit_ = catUnit;
  form_ = catUnit_ != null ? form : bc.FORM_NONE;
}

this.setPresent = function (p) {
  present = p;
};

this.getHtml = function () {
  return unitIconElement;
};

this.initDrop = function (pos, callback) {
  unitIconElement.addEventListener('dragstart', function (e) {
    e.dataTransfer.setData('text/plain', pos);
  });

  // Allow the unit to be dragged in the other slots.
  unitIconElement.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  // Swap the units when dropped in another slot.
  unitIconElement.addEventListener('drop', function (e) {
    e.preventDefault();

    const posDragged = parseInt(e.dataTransfer.getData('text/plain'));

    callback(posDragged, pos);
  });
};

this.updateDraggable = function () {
  unitIconElement.setAttribute('draggable', catUnit_ != null);
};

this.render = function () {
  const imageIconElement = unitIconElement.firstElementChild;

  let id = bc.ID_NONE;
  let unitName = '';
  let startId = 1;
  let offset = 0;

  if (catUnit_ != null) {
    id = catUnit_.getId();
    unitName = catUnit_.getName(form_);
    startId = Number.parseInt((id - 1) / 100) * 100 + 1;
    offset = ((id - 1) % 100);
  }

  unitIconElement.setAttribute('data-id', id);
  unitIconElement.setAttribute('data-form', form_);
  unitIconElement.setAttribute('title', unitName);
  unitIconElement.setAttribute('data-present', present);

  unitIconElement.setAttribute('data-start-id', startId);

  imageIconElement.style.backgroundPositionY = utils.getCssBgPositionY(offset);
};

this.init();

}; // UnitIconHtml

export default UnitIconHtml;