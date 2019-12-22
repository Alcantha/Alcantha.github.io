'use strict';

import * as utils from './utils.js';
import * as bc from './bc.js';
import CatComboHtml from './CatComboHtml.js';

const CatComboGalleryHtml = function (selector, bcData) {

const self = this;

const $html = $('html');

const $listCatCombo = $(selector).eq(0);
const $catComboGallery = $('> .cat-combo-gallery', $listCatCombo);

const $txtCurrType = $('#comboTxtCurrType', $listCatCombo);
const $btnTypePrev = $('#comboTypePrev', $listCatCombo);
const $btnTypeNext = $('#comboTypeNext', $listCatCombo);

const $txtCurrPage = $('#comboTxtCurrPage', $listCatCombo);
const $btnPagePrev = $('#comboPagePrev', $listCatCombo);
const $btnPageNext = $('#comboPageNext', $listCatCombo);

const listCatComboShow = [];
const listCatComboShowHtml = [];

let deckHtml = null;

const listCcType = [
  { name: 'All', size: '', index: 'all' },
  { name: 'Skill', size: '', index: 'skills' },
  { name: 'Effect', size: '', index: 'effects' },
  { name: 'Cannon/Base', size: '14px', index: 'cannons' },
  { name: 'Money/Worker', size: '13px', index: 'moneys' },
  { name: 'Other', size: '', index: 'others' },
];
const nbCcType = listCcType.length;
let currCcType = 0;

let currListCatCombo = null;
let nbCatCombo = 0;

let nbComboPerPage = 1;
let nbTotalPage = 0;
let currPage = 0;

this.init = function () {
  // Number of Cat Combo
  const ccType = listCcType[currCcType];
  currListCatCombo = bcData.getListCatComboPerType(ccType.index);

  nbCatCombo = currListCatCombo.length;

  // Previous type
  $btnTypePrev.on('click', function () {
    currCcType = (currCcType - 1 + nbCcType) % nbCcType;

    self.renderType();
  });

  // Next type
  $btnTypeNext.on('click', function () {
    currCcType = (currCcType + 1) % nbCcType;

    self.renderType();
  });

  // Previous page
  $btnPagePrev.on('click', function () {
    currPage = (currPage - 1 + nbTotalPage) % nbTotalPage;

    self.renderPage();
  });

  // Next page
  $btnPageNext.on('click', function () {
    currPage = (currPage + 1) % nbTotalPage;

    self.renderPage();
  });

  // Add cat unit in the deck
  $catComboGallery.on('click', '.icon', function (e) {
    const $this = $(this);
    const catUnitId = $this.attr('data-id');

    if (deckHtml != null && catUnitId !== bc.ID_NOT_FOUND && catUnitId !== bc.ID_NONE) {
      const catUnit = bcData.getCatUnit(catUnitId);
      const form = $this.attr('data-form');

      deckHtml.addCatUnit(catUnit, form, 10, true);
    }
  });

  this.updateComboPerPage();
};

this.setDeckHtml = function (deckHtml_) {
  deckHtml = deckHtml_;
}

// Cat Combo

this.addCatCombo = function (catCombo) {
  const catComboHtml = new CatComboHtml(catCombo);

  listCatComboShow.push(catCombo);
  listCatComboShowHtml.push(catComboHtml);

  $catComboGallery.append(catComboHtml.getHtml());
};

this.getCatCombo = function (index) {
  return listCatComboShow[index];
};

// Type

this.updateType = function () {
  const ccType = listCcType[currCcType];

  currListCatCombo = bcData.getListCatComboPerType(ccType.index);
  nbCatCombo = currListCatCombo.length;
  currPage = 0;
};

// Page

this.updateComboPerPage = function () {
  const indexCombo = currPage * nbComboPerPage;

  const galleryHeight = $html.height() - 120; // "100vh - 120px"
  const $catCombo = $('> :first-child', $catComboGallery);
  const comboHeight = $catCombo.length > 0 ? $catCombo.outerHeight(true) : 70;

  nbComboPerPage = Math.floor(galleryHeight / comboHeight);

  currPage = Math.floor(indexCombo / nbComboPerPage);

  this.updateNbTotalPage();
};

this.updateNbTotalPage = function () {
  nbTotalPage = Math.ceil(nbCatCombo / nbComboPerPage);

  nbTotalPage = nbTotalPage > 0 ? nbTotalPage : 1;
};

this.updatePage = function () {

  // Cat Combo
  const start = currPage * nbComboPerPage;
  const end = start + nbComboPerPage;
  const subListCatCombo = currListCatCombo.slice(start, end);

  self.clear();

  subListCatCombo.forEach(catCombo => {
    self.addCatCombo(catCombo);
  });
};

// Render

this.clear = function () {
  $catComboGallery.empty();
};

this.enableLargeIcon = function (iconSize) {
  utils.toggleIconSize($listCatCombo, iconSize);

  const indexCombo = currPage * nbComboPerPage;

  this.renderButtonType();

  this.renderPageWithHeight();
};

this.renderButtonType = function () {
  const { name, size } = listCcType[currCcType];

  $txtCurrType.text(name);
  $txtCurrType.css('font-size', size);
};

this.renderType = function () {
  this.updateType();
  this.updatePage();
  this.updateNbTotalPage();
  this.renderButtonType();
  this.renderButtonPage();
  this.renderListCatCombo();
};

this.renderButtonPage = function () {
  $txtCurrPage.text(`${currPage + 1} / ${nbTotalPage}`);
};

this.renderPageWithHeight = function () {
  this.updateComboPerPage();
  this.renderPage();
};

this.renderPage = function () {
  this.updatePage();
  this.renderButtonPage();
  this.renderListCatCombo();
};

this.renderListCatCombo = function () {
  listCatComboShowHtml.forEach(e => e.render());
};

}; // CatComboGalleryHtml

export default CatComboGalleryHtml;