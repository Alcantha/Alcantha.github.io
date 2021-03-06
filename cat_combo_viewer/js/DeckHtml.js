'use strict';

import * as utils from './utils.js';
import * as bc from './bc.js';

import UnitIconHtml from './UnitIconHtml.js';

const DeckHtml = function (deckId, bcData, selectUnitModal, activeEffectGalleryHtml) {

const self = this;

// HTML element of the deck.
const currentDeckElement = document.getElementById(deckId);

const deckContainerElement = currentDeckElement.parentNode;

// List of unit icon.
const listUnitIconHtml = [];

const init = function () {
  initListUnitIconHtml();

  initEventSelectUnit();

  initDrop();
};

const initListUnitIconHtml = function () {
  let count = 0;

  // Initialize the list of unit icon.
  const icons = Array.from(currentDeckElement.getElementsByClassName('icon'));

  icons.forEach((unitIconElt, i) => {
    const position = ++count;

    listUnitIconHtml[position] = new UnitIconHtml({ unitIconElt, position });
  });
};

const initEventSelectUnit = function () {
  // Initialize the events.
  currentDeckElement.addEventListener('click', function (e) {
    // Open the modal "Select Cat Unit" when the user click on the
    // deck slot.
    if (!selectUnitModal.ready) {
      return;
    }

    const iconElement = utils.getListPath(e).find(e2 => e2.classList != null && e2.classList.contains('icon'));

    if (iconElement == null) {
      return;
    }

    const pos = Number.parseInt(iconElement.getAttribute('data-pos'));
    const id = Number.parseInt(iconElement.getAttribute('data-id'));
    const form = iconElement.getAttribute('data-form');

    const callbackSelectedUnit = function (catUnit, form) {
      // Set the unit in the slot once it has been selected.
      self.addCatUnit(catUnit, form, pos);
    };

    // List of unit ID already present in the deck.
    const listSelectedId = listUnitIconHtml
    .map(icon => icon.getId())
    .filter(iconId => iconId !== bc.ID_NONE);

    selectUnitModal.open({ id, form, listSelectedId, callbackSelectedUnit });
  });
};

const initDrop = function () {
  const callback = function (posDragged, pos) {
    moveUnit(posDragged, pos);
    renderMoveUnit(posDragged, pos);

    // Update active effect.
    checkUnits();
  };

  for (let pos = 1; pos <= 10; pos++) {
    const unitIconHtml = listUnitIconHtml[pos];

    unitIconHtml.initDrop(pos, callback);
  }

  // Allow the unit icon to be dragged in the deck container.
  deckContainerElement.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  // Remove the unit when it is not dropped in a slot.
  deckContainerElement.addEventListener('drop', function (e) {
    e.preventDefault();

    const targetElement = e.target;

    if (!targetElement.classList.contains('image-icon')) {
      // Remove the unit from the deck.
      const posDragged = parseInt(e.dataTransfer.getData('text/plain'));

      self.addCatUnit(null, bc.FORM_NONE, posDragged);

      // Update active effect.
      checkUnits();
    }
  });
};

const getEmptyUnitSlot = function (pos, catUnit) {
  return listUnitIconHtml[getEmptyPosSlot(pos, catUnit)];
};

const getEmptyPosSlot = function (pos, catUnit) {
  let i = pos;

  while (i > 1) {
    const catUnitCmp = listUnitIconHtml[i - 1].getCatUnit();
    if (catUnitCmp != null && (catUnit == null || catUnit != catUnitCmp)) {
      break;
    }
    i--;
  }

  return i;
}

// Move the unit.
const moveUnit = function (posStart, posEnd) {
  const iconTemp = listUnitIconHtml[posStart];
  const catUnitTemp = iconTemp.getCatUnit();
  const formTemp = iconTemp.getForm();

  if (posStart < posEnd) {
    // Move in-between units to the left.
    for (let i = posStart; i < posEnd; i++) {
      const iconL = listUnitIconHtml[i];
      const iconR = listUnitIconHtml[i + 1];

      iconL.setUnit(iconR.getCatUnit(), iconR.getForm());
    }
  } else {
    // Move in-between units to the right.
    for (let j = posStart; j > posEnd; j--) {
      const iconL = listUnitIconHtml[j - 1];
      const iconR = listUnitIconHtml[j];

      iconR.setUnit(iconL.getCatUnit(), iconL.getForm());
    }
  }

  const unitIconEnd = getEmptyUnitSlot(posEnd, catUnitTemp);

  unitIconEnd.setUnit(catUnitTemp, formTemp);
};

const renderMoveUnit = function (posStart, posEnd) {
  const start = posStart < posEnd ? posStart : posEnd;
  const end = posEnd < posStart ? posStart : posEnd;

  for (let i = start; i <= end; i++) {
    renderIcon(i);
  }
};

const checkUnits = function () {
  const units = Object.freeze(getListUnit());

  activeEffectGalleryHtml.checkUnits(units);

  activeEffectGalleryHtml.render();
};

const renderIcon = function (pos) {
  const icon = listUnitIconHtml[pos];

  icon.updateDraggable();
  icon.render();
};

const getListUnit = function () {
  return listUnitIconHtml
  .filter(icon => icon.getId() != bc.ID_NONE)
  .map(icon => {
    return {
      unit: icon.getCatUnit(),
      f: icon.getForm(),
    };
  });
};

this.enableLargeIcon = function (iconSize) {
  utils.toggleIconSize(currentDeckElement, iconSize);
};

this.addCatUnit = function (catUnit, form, pos = 10, ignoreLowForm = false) {
  const catUnitId = catUnit != null ? catUnit.getId() : bc.ID_NONE;

  // Find the unit icon with the same unit ID.
  let unitIconHtmlPresent = findUnitIconHtml(catUnitId);

  // Ignore if it's the same unit with the same form. Also ignore if the
  // new form is below the current when ignoreLowForm is enabled.
  if (unitIconHtmlPresent != null
    && ((!ignoreLowForm && unitIconHtmlPresent.getForm() === form)
    || (ignoreLowForm && unitIconHtmlPresent.getForm() >= form))) {
    return false;
  }

  const posEmpty = getEmptyPosSlot(pos);
  const unitIconHtml = unitIconHtmlPresent != null
    ? unitIconHtmlPresent
    : listUnitIconHtml[posEmpty];

  // Update the icon in the deck.
  unitIconHtml.setUnit(catUnit, form);
  unitIconHtml.updateDraggable();
  unitIconHtml.render();

  if (catUnit == null) {
    // After removing the unit, put this slot at the end of the deck.
    moveUnit(posEmpty, 10);
    renderMoveUnit(posEmpty, 10);
  }

  // Update active effect.
  checkUnits();

  return true;
};

this.clearDeck = function () {
  listUnitIconHtml.forEach(icon => {
    icon.clear();
    icon.render();
  });

  checkUnits();
};

this.setUnitDeck = function (listUnitDeck) {
  listUnitDeck.forEach(({ unit, f }, i) => {
    const pos = i + 1;
    const unitIconHtml = listUnitIconHtml[pos];

    unitIconHtml.setUnit(unit, f);
  });
};

const findUnitIconHtml = function (catUnitId) {
  if (catUnitId == bc.ID_NONE) {
    return null;
  }

  let i = 1;
  while (i <= 10) {
    const unitIconHtml = listUnitIconHtml[i];
    if (unitIconHtml.getId() === catUnitId) {
      return unitIconHtml;
    }
    i++;
  }
  return null;
};

init();

}; // const DeckHtml

export default DeckHtml;