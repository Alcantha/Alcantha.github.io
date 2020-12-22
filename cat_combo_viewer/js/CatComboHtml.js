'use strict';

import * as bc from './bc.js'
import UnitIconHtml from './UnitIconHtml.js';

const catComboElementModel = document.querySelector('#cat-combo-template > .cat-combo');

const createCatComboElement = function () {
  return catComboElementModel.cloneNode(true);
};

// Class CatComboHtml

const CatComboHtml = function (catCombo) {

const catComboElement = createCatComboElement();

const descNameElement = catComboElement.getElementsByClassName('name')[0];
const descEffectElement = catComboElement.getElementsByClassName('effect')[0];

const listUnitIconHtml = Array.from(catComboElement.getElementsByClassName('icon'))
  .map(e => new UnitIconHtml({ unitIconElt: e }));

let catCombo_ = catCombo;

let activeEffectMode = false;
let show = true;

this.getCatCombo = function () {
  return catCombo_;
}

this.setActiveEffectMode = function (b) {
  activeEffectMode = b;
};

this.setUnits = function (catUnits) {
  catUnits.forEach((data, i) => {
    const unitIconHtml = listUnitIconHtml[i];

    const catUnit = data.unit;
    const form = data.f || bc.FORM_NORMAL;

    unitIconHtml.setUnit(catUnit, form);
    unitIconHtml.render();
  });
};

// Show

this.isShow = function () {
  return show;
};

this.setShow = function (b) {
  show = b;
};

// Present

this.setPresent = function (listPresent) {
  listPresent.forEach((e, i) => {
    const unitIconHtml = listUnitIconHtml[i];

    unitIconHtml.setPresent(e.present);
  });
}

// HTML

this.getHtml = function () {
  return catComboElement;
};

// Render

this.render = function () {
  catComboElement.style.display = show ? 'flex' : 'none';

  if (show) {
    // Description hidden in Active Effect.
    descEffectElement.style.display = !activeEffectMode ? 'block' : 'none';

    // Background color of active combo.
    catComboElement.classList.toggle('cc-active', catCombo_.isActive());

    if (activeEffectMode) {
      this.setDescName(catCombo_.getActiveEffectName());
    } else {
      this.setDescName(catCombo_.getName());
      this.setDescEffect(catCombo_.getDescEffect());
    }

    this.setUnits(catCombo_.getUnits());
  }
};

this.setDescName = function (descName) {
  descNameElement.textContent = descName;
};

this.setDescEffect = function (descEffect) {
  descEffectElement.textContent = descEffect;
};

}; // CatComboHtml

export default CatComboHtml;