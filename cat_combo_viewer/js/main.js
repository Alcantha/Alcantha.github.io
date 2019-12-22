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

const catComboGalleryHtml = new CatComboGalleryHtml('#list-cat-combo', bcData);

const activeEffectGalleryHtml = new ActiveEffectGalleryHtml('#active-effect-gallery', bcData);

const deckHtml = new DeckHtml('#currentDeck', bcData, selectUnitModal, activeEffectGalleryHtml);

catComboGalleryHtml.setDeckHtml(deckHtml);
activeEffectGalleryHtml.setDeckHtml(deckHtml);

// ------------------
// ----  Script  ----
// ------------------

$(document).ready(function () {

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
  $('#options').on('click', function () {
    optionsModal.open();
  });

  // Tab
  const $btnDeckTab = $('#deck-tab');
  const $btnListTab = $('#gallery-tab');
  const $tabContainer = $('#tab-container');
  const $deckTab = $('> [data-tab="deck"]', $tabContainer);
  const $listTab = $('> [data-tab="list"]', $tabContainer);

  $btnDeckTab.on('click', function (e) {
    if (!isReady) {
      e.preventDefault();
      return false;
    }

    $deckTab.toggleClass('show', true);
    $listTab.toggleClass('show', false);
  });

  $btnListTab.on('click', function (e) {
    if (!isReady) {
      e.preventDefault();
      return false;
    }

    $deckTab.toggleClass('show', false);
    $listTab.toggleClass('show', true);

    catComboGalleryHtml.renderPageWithHeight();
  });

  $btnDeckTab.attr('disabled', null);
  $btnListTab.attr('disabled', null);

  // Clear deck
  const $btnClearDeck = $('#clear-deck');

  $btnClearDeck.on('click', function () {
    deckHtml.clearDeck();
  });

  // Nb of Cat Combo per page
  const $html = $('html');
  let resizeTimeoutId = 0;
  window.addEventListener('resize', function () {
    if ($listTab.hasClass('show') || $html.width() >= 992) {
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

});