'use strict';

import * as utils from './utils.js';
import * as bc from './bc.js';

import CatUnit from './CatUnit.js';

const $unitIconTemplate = $('<div class="icon"><div class="image-icon"></div></div>');

const UnitIconHtml = function ({
  $unitIcon = null,
  catUnit = null,
  form = bc.FORM_NONE,
} = {}) {

let $unitIcon_ = $unitIcon;
let catUnit_ = catUnit;
let form_ = form;

// Active Effect: show if the unit in the combo is present in the deck.
let present = null;

this.init = function () {
  if ($unitIcon_ == null) {
    $unitIcon_ = $unitIconTemplate.clone();
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
  return $unitIcon_;
};

this.updateDraggable = function () {
  $unitIcon_.attr('draggable', catUnit_ != null);
};

this.render = function () {
  const $imageIcon = $unitIcon_.children().eq(0);

  let id = bc.ID_NONE;
  let unitName = '';

  if (catUnit_ != null) {
    id = catUnit_.getId();
    unitName = catUnit_.getName(form_);
  }

  $unitIcon_.attr('data-id', id);
  $unitIcon_.attr('data-form', form_);
  $unitIcon_.attr('title', unitName);
  $unitIcon_.attr('data-present', present);

  $imageIcon.css('background-position-y', utils.getCssBgPositionY(id));
};

this.init();

}; // UnitIconHtml

export default UnitIconHtml;