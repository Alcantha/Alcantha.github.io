'use strict';

import CatComboHtml from './CatComboHtml.js';

const activeEffectElementModel = document.querySelector('#active-effect-template > .active-effect');

const createActiveEffectElement = function () {
  return activeEffectElementModel.cloneNode(true);
};

// Class ActiveEffectHtml

const ActiveEffectHtml = function (activeEffect, bcData) {

const activeEffectElement = createActiveEffectElement();

const inputElement = activeEffectElement.getElementsByClassName('cb-collapse')[0];
const nameElement = activeEffectElement.getElementsByClassName('name')[0];

const catCombosElement = activeEffectElement.getElementsByClassName('cat-combos')[0];

const listCatCombo = [];
let show = false;

const setInputId = function (id) {
  const name = `activeEffect${id}`;

  inputElement.setAttribute('id', name);
  nameElement.setAttribute('for', name);
};

this.getActiveEffect = function () {
  return activeEffect;
};

this.addCatCombo = function (catCombo) {
  activeEffect.addCatCombo(catCombo);

  const catComboHtml = new CatComboHtml(catCombo);

  // Hide the combo by default.
  catComboHtml.setShow(false);

  // Show the name and boost without the description.
  catComboHtml.setActiveEffectMode(true);

  listCatCombo.push(catComboHtml);

  catCombosElement.append(catComboHtml.getHtml());
};

this.checkUnits = function (listUnitDeck) {
  show = listCatCombo
  .map(catComboHtml => {
    const catCombo = catComboHtml.getCatCombo();
    const objPresent = catCombo.checkUnits(listUnitDeck);

    catCombo.setActive(objPresent.active);

    catComboHtml.setShow(objPresent.show);
    catComboHtml.setPresent(objPresent.listUnit);

    return objPresent.show;
  })
  .some(b => b);
};

this.getHtml = function () {
  return activeEffectElement;
};

this.render = function () {
  activeEffectElement.style.display = show ? 'block' : 'none';

  if (show) {
    // Title
    nameElement.textContent = activeEffect.getTitle();

    // Cat Combos
    listCatCombo.forEach(catComboHtml => catComboHtml.render());
  }
};

setInputId(activeEffect.getEffectId());

}; // ActiveEffectHtml

export default ActiveEffectHtml;