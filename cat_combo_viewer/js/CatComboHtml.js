'use strict';

import * as bc from './bc.js'
import UnitIconHtml from './UnitIconHtml.js';

const $catComboTemplate = $('#cat-combo-template > .cat-combo').eq(0);

const CatComboHtml = function (catCombo) {

const $catCombo = $catComboTemplate.clone();

const $descName = $('> .description > .name', $catCombo);
const $descEffect = $('> .description > .effect', $catCombo);

const listUnitIconHtml = $('> .icons > .icon', $catCombo)
  .map((i, e) => new UnitIconHtml({ $unitIcon: $(e) }))
  .toArray();

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
  return $catCombo;
};

// Render

this.render = function () {
  $catCombo.toggle(show);

  if (show) {
    // Description hidden in Active Effect.
    $descEffect.toggle(activeEffectMode == false);

    // Background color of active combo.
    $catCombo.toggleClass('cc-active', catCombo_.isActive());

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
  $descName.text(descName);
};

this.setDescEffect = function (descEffect) {
  $descEffect.text(descEffect);
};

}; // CatComboHtml

export default CatComboHtml;