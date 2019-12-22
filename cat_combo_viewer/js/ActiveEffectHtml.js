'use strict';

import CatComboHtml from './CatComboHtml.js';

const $activeEffectTemplate = $('#active-effect-template > .active-effect').eq(0);

const ActiveEffectHtml = function (activeEffect, bcData) {

const $activeEffect = $activeEffectTemplate.clone();

const $input = $('> input.cb-collapse', $activeEffect).eq(0);
const $name = $('> .name', $activeEffect).eq(0);
const $catCombos = $('> .cat-combos', $activeEffect).eq(0);

const listCatCombo = [];
let show = false;

const setInputId = function (id) {
  const name = `activeEffect${id}`;
  $input.attr('id', name);
  $name.attr('for', name);
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

  $catCombos.append(catComboHtml.getHtml());
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
  return $activeEffect;
};

this.render = function () {
  $activeEffect.toggle(show);

  if (show) {
    // Title
    $name.text(activeEffect.getTitle());

    // Cat Combos
    listCatCombo.forEach(catComboHtml => catComboHtml.render());
  }
};

setInputId(activeEffect.getEffectId());

}; // ActiveEffectHtml

export default ActiveEffectHtml;