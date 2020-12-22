'use strict';

import BattleCatData from './BattleCatData.js';

import CatComboGalleryHtml from './CatComboGalleryHtml.js';
import DeckHtml from './DeckHtml.js';
import selectUnitModal from './selectUnitModal.js';
import ActiveEffectGalleryHtml from './ActiveEffectGalleryHtml.js';
import optionsModal from './optionsModal.js';

// Objects

let isReady = false;

const bcData = new BattleCatData();

const catComboGalleryHtml = new CatComboGalleryHtml('list-cat-combo', bcData);

const activeEffectGalleryHtml = new ActiveEffectGalleryHtml('active-effect-gallery', bcData);

const deckHtml = new DeckHtml('currentDeck', bcData, selectUnitModal, activeEffectGalleryHtml);

catComboGalleryHtml.setDeckHtml(deckHtml);
activeEffectGalleryHtml.setDeckHtml(deckHtml);

// ------------------
// ----  Script  ----
// ------------------

(function () {

// ---------------------
// ----  Cat Combo  ----
// ---------------------

const initCatComboGallery = function (bcData) {
  // CatCombo Gallery HTML
  bcData.getListCatCombo().forEach(catCombo => {
    activeEffectGalleryHtml.addCatCombo(catCombo);
  });

  activeEffectGalleryHtml.render();
};

// ------------------
// ----  Events  ----
// ------------------

const initEvent = function () {
  // Options
  const optionsElement = document.getElementById('options');

  optionsElement.addEventListener('click', function (e) {
    optionsModal.open();
  });
  //*/

  // Tab
  const btnDeckTabElement = document.getElementById('deck-tab');
  const btnListTabElement = document.getElementById('gallery-tab');
  const tabContainerElement = document.getElementById('tab-container');
  const deckTabElement = tabContainerElement.querySelector('[data-tab="deck"]');
  const listTabElement = tabContainerElement.querySelector('[data-tab="list"]');

  btnDeckTabElement.addEventListener('click', function (e) {
    if (!isReady) {
      e.preventDefault();
      return false;
    }

    deckTabElement.classList.toggle('show', true);
    listTabElement.classList.toggle('show', false);
  });

  btnListTabElement.addEventListener('click', function (e) {
    if (!isReady) {
      e.preventDefault();
      return false;
    }

    deckTabElement.classList.toggle('show', false);
    listTabElement.classList.toggle('show', true);

    catComboGalleryHtml.renderPageWithHeight();
  });

  btnDeckTabElement.disabled = false;
  btnListTabElement.disabled = false;

  // Clear deck
  const btnClearDeckElement = document.getElementById('clear-deck');

  btnClearDeckElement.addEventListener('click', function () {
    deckHtml.clearDeck();
  });

  // Nb of Cat Combo per page
  let resizeTimeoutId = 0;
  window.addEventListener('resize', function () {
      if (listTabElement.classList.contains('show') || window.clientWidth >= 992) {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(function () {
        catComboGalleryHtml.renderPageWithHeight();
      }, 200);
    }
  });
};

// -----------------
// ----  Start  ----
// -----------------

bcData.loadAll().then(function () {
  initCatComboGallery(bcData);

  catComboGalleryHtml.init();

  selectUnitModal.init({ bcData });

  // Modal options
  optionsModal.init({
    catComboGalleryHtml,
    deckHtml,
    activeEffectGalleryHtml,
    selectUnitModal,
  });

  initEvent();

  isReady = true;
});

})();