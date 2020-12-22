'use strict';

import * as utils from './utils.js';
import * as bc from './bc.js';

import ActiveEffect from './ActiveEffect.js';
import ActiveEffectHtml from './ActiveEffectHtml.js';

// Class ActiveEffectGalleryHtml

const ActiveEffectGalleryHtml = function (galleryId, bcData) {

const activeEffectGalleryElement = document.getElementById(galleryId);

const listActiveEffectHtml = [];

let deckHtml = null;

const init = function () {
  // When the use click in the unit icon, add the cat unit in the deck from uncomplete combo.
  activeEffectGalleryElement.addEventListener('click', function (e) {
    // Search for the element with the tag "icon".
    const iconElement = e.path.find(e2 => e2.classList != null && e2.classList.contains('icon'));

    if (iconElement == null) {
      return;
    }

    const catUnitId = iconElement.getAttribute('data-id');

    if (deckHtml != null && catUnitId !== bc.ID_NOT_FOUND && catUnitId !== bc.ID_NONE) {
      // Add the cat unit in the deck
      const catUnit = bcData.getCatUnit(catUnitId);

      const form = iconElement.getAttribute('data-form');

      deckHtml.addCatUnit(catUnit, form);
    }
  });
};

this.enableLargeIcon = function (iconSize) {
  utils.toggleIconSize(activeEffectGalleryElement, iconSize);
};

this.setDeckHtml = function (deckHtml_) {
  deckHtml = deckHtml_;
}

this.addActiveEffect = function (activeEffect) {
  const activeEffectHtml = new ActiveEffectHtml(activeEffect, bcData);

  activeEffectHtml.render();

  const effectId = activeEffect.getEffectId();

  listActiveEffectHtml[effectId] = activeEffectHtml;

  activeEffectGalleryElement.appendChild(activeEffectHtml.getHtml());
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