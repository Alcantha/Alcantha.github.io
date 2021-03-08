'use strict';

import * as utils from './utils.js';
import * as bc from './bc.js';
import CatComboHtml from './CatComboHtml.js';

const CatComboGalleryHtml = function (listCatComboId, bcData) {

const self = this;

const listCatComboElement = document.getElementById(listCatComboId);
const catComboGalleryElement = listCatComboElement.querySelector('.cat-combo-gallery');

const txtCurrTypeElement = document.getElementById('comboTxtCurrType');
const btnTypePrevElement = document.getElementById('comboTypePrev');
const btnTypeNextElement = document.getElementById('comboTypeNext');

const txtCurrPageElement = document.getElementById('comboTxtCurrPage');
const btnPagePrevElement = document.getElementById('comboPagePrev');
const btnPageNextElement = document.getElementById('comboPageNext');

const listCatComboShow = [];
const listCatComboShowHtml = [];

let deckHtml = null;

const listCcType = [
  { name: 'All', size: '', index: 'all' },
  { name: 'Skill', size: '', index: 'skills' },
  { name: 'Effect', size: '', index: 'effects' },
  { name: 'Cannon/Base', size: '13px', index: 'cannons' },
  { name: 'Money/Worker', size: '11px', index: 'moneys' },
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
  btnTypePrevElement.addEventListener('click', function () {
    currCcType = (currCcType - 1 + nbCcType) % nbCcType;

    self.renderType();
  });

  // Next type
  btnTypeNextElement.addEventListener('click', function () {
    currCcType = (currCcType + 1) % nbCcType;

    self.renderType();
  });

  // Previous page
  btnPagePrevElement.addEventListener('click', function () {
    currPage = (currPage - 1 + nbTotalPage) % nbTotalPage;

    self.renderPage();
  });

  // Next page
  btnPageNextElement.addEventListener('click', function () {
    currPage = (currPage + 1) % nbTotalPage;

    self.renderPage();
  });

  // Add cat unit in the deck
  catComboGalleryElement.addEventListener('click', function (e) {
    const iconElement = utils.getListPath(e).find(e2 => e2.classList != null && e2.classList.contains('icon'));

    if (iconElement == null) return;

    const catUnitId = iconElement.getAttribute('data-id');

    if (deckHtml != null && catUnitId !== bc.ID_NOT_FOUND && catUnitId !== bc.ID_NONE) {
      const catUnit = bcData.getCatUnit(catUnitId);
      const form = iconElement.getAttribute('data-form');

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

  catComboGalleryElement.appendChild(catComboHtml.getHtml());
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

  const galleryHeight = document.body.clientHeight - 170;
  const catComboElement = catComboGalleryElement.querySelector(':first-child');
  const comboHeight = catComboElement != null && catComboElement.offsetHeight > 0
    ? catComboElement.offsetHeight
    : 70;

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
  catComboGalleryElement.innerHTML = '';
};

this.enableLargeIcon = function (iconSize) {
  utils.toggleIconSize(listCatComboElement, iconSize);

  const indexCombo = currPage * nbComboPerPage;

  this.renderButtonType();

  this.renderPageWithHeight();
};

this.renderButtonType = function () {
  const { name, size } = listCcType[currCcType];

  txtCurrTypeElement.textContent = name;
  txtCurrTypeElement.style.fontSize = size;
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
  txtCurrPageElement.textContent = `${currPage + 1} / ${nbTotalPage}`;
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