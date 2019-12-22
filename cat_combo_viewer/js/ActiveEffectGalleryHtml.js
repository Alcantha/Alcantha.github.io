'use strict';

import * as utils from './utils.js';
import * as bc from './bc.js';

import ActiveEffect from './ActiveEffect.js';
import ActiveEffectHtml from './ActiveEffectHtml.js';

const ActiveEffectGalleryHtml = function (selector, bcData) {

const $activeEffectGallery = $(selector);

const listActiveEffectHtml = [];

let deckHtml = null;

const init = function () {
  // Add cat unit from uncomplete combo.
  $activeEffectGallery.on('click', '.icon[data-present="v"]', function (e) {
    const $this = $(this);
    const catUnitId = $this.attr('data-id');

    if (deckHtml != null && catUnitId !== bc.ID_NOT_FOUND && catUnitId !== bc.ID_NONE) {
      const catUnit = bcData.getCatUnit(catUnitId);
      const form = $this.attr('data-form');

      deckHtml.addCatUnit(catUnit, form);
    }
  });
};

this.enableLargeIcon = function (iconSize) {
  utils.toggleIconSize($activeEffectGallery, iconSize);
};

this.setDeckHtml = function (deckHtml_) {
  deckHtml = deckHtml_;
}

this.addActiveEffect = function (activeEffect) {
  const activeEffectHtml = new ActiveEffectHtml(activeEffect, bcData);

  activeEffectHtml.render();

  const effectId = activeEffect.getEffectId();

  listActiveEffectHtml[effectId] = activeEffectHtml;

  $activeEffectGallery.append(activeEffectHtml.getHtml());
};

this.getActiveEffect = function (effectId) {
  return listActiveEffectHtml[effectId].getActiveEffect();
};

this.hasActiveEffect = function (effectId) {
  return listActiveEffectHtml[effectId] != null;
};

this.getActiveEffectHtml = function (effectId) {
  return listActiveEffectHtml[effectId];
};

this.addCatCombo = function (catCombo) {
  const effectId = catCombo.getEffect().getId();

  if (!this.hasActiveEffect(effectId)) {
    const effect = bcData.getEffect(effectId);
    const activeEffect = new ActiveEffect(effect);

    this.addActiveEffect(activeEffect);
  }

  const activeEffectHtml = this.getActiveEffectHtml(effectId);

  activeEffectHtml.addCatCombo(catCombo);
};

this.checkUnits = function (listUnitDeck) {
  listActiveEffectHtml.forEach(activeEffectHtml => {
    activeEffectHtml.checkUnits(listUnitDeck);
  });
};

this.render = function () {
  listActiveEffectHtml.forEach(activeEffectHtml => {
    activeEffectHtml.render();
  });
};

init();

}; // ActiveEffectGalleryHtml

export default ActiveEffectGalleryHtml;