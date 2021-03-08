'use strict';

import * as utils from './utils.js';
import * as modal from './modal.js';
import * as bc from './bc.js';

import UnitIconHtml from './UnitIconHtml.js';

// -----------------
// ----  Modal  ----
// -----------------

const SELECTED_ICON = '1';

const selectUnitModal = new modal.Modal({
  modalId: 'selectUnitModal',

  onInit(self, { bcData }) {
    initListUnitSelect(bcData);

    self.data.mainContentElement = self.modalElement.querySelector('main');
    self.data.contentElement = self.modalElement.querySelector('main > .content');

    // Current unit selected.
    self.data.currentUnit = {
      id: bc.ID_NONE,
      form: bc.FORM_NONE,
      selectedElement: null,
      tempId: bc.ID_NONE,
    };

    // Form buttons.
    self.data.listUnitForm = [];

    bc.LIST_FORM.forEach(f => {
      const inputElement = self.modalElement.querySelector(`.btn-form[data-f="${f}"]`);
      const labelElement = self.modalElement.querySelector(`.btn-form[data-f="${f}"] + label`);

      self.data.listUnitForm[f] = { inputElement, labelElement };

      // Select the unit form.
      self.data.listUnitForm[f].labelElement.addEventListener('click', function () {
        setFormContent(f);
      });

      // Set the unit form.
      self.data.listUnitForm[f].labelElement.addEventListener('dblclick', function () {
        const { id, form } = self.data.currentUnit;

        if (id !== bc.ID_NONE) {
          selectCatUnit(bcData, id, form);
        }
      });
    });

    self.data.removeUnitElement = document.getElementById('removeUnit');

    // Click on Cat Unit
    self.modalElement.addEventListener('click', function (e) {
      const iconElement = utils.getListPath(e).find(e2 => e2.classList != null && e2.classList.contains('icon'));

      if (iconElement == null) return;

      const id = iconElement.getAttribute('data-id');
      const selected = iconElement.getAttribute('data-s') === SELECTED_ICON;

      if (id > 0 && !selected) {
        // Reset the selected units.
        const form = iconElement.getAttribute('data-form');

        selectCatUnit(bcData, id, form);
      }
    });

    self.data.listUnitForm[bc.FORM_NORMAL].labelElement.click();

    selectUnitModal.ready = true;
  },

  beforeOpen(self, { id, form, listSelectedId, callbackSelectedUnit }) {
    const validId = (id != null && id > 0);

    // Initialize the form buttons and units content.
    if (validId) {
      setFormButton(form);
      setFormContent(form);
      setCurrentUnit(id, form);

    } else {
      setFormButton(bc.FORM_NORMAL);
      setFormContent(bc.FORM_NORMAL);
    }

    //self.data.removeUnitElement.setAttribute('disabled', !validId);
    self.data.removeUnitElement.disabled = !validId;

    // List of unit already selected
    self.data.listSelectedId = listSelectedId;

    setSelectedUnits(true, id, form);

    self.data.callbackSelectedUnit = callbackSelectedUnit;

    return modal.MODAL_OP_SELF;
  },

  afterOpen(self, { id, form }) {
    const validId = (id != null && id > 0);
    const mainContentElement = self.data.mainContentElement;

    if (validId) {
      const unitIconElement = self.modalElement.querySelector(`.icon[data-id="${id}"][data-form="${form}"]`);

      if (unitIconElement != null) {
        const top = unitIconElement.offsetTop - self.data.contentElement.offsetTop + 10 - (mainContentElement.clientHeight - unitIconElement.clientHeight) / 2;

        mainContentElement.scroll(0, top);

      } else {
        mainContentElement.scroll(0, 0);
      }
    } else {
      mainContentElement.scroll(0, 0);
    }
  },

  onValid(self) {
    return modal.MODAL_CL_SELF;
  },

  onCancel(self) {
    // Reset the selected units.
    setSelectedUnits(false);

    // Remove the selected unit from the deck.
    self.data.callbackSelectedUnit(null, bc.FORM_NONE);

    return modal.MODAL_CL_SELF;
  },

  onClose(self) {
    // Reset the selected units.
    setSelectedUnits(false);

    //setFormContent(bc.FORM_NORMAL);
    setCurrentUnit(bc.ID_NONE, bc.FORM_NORMAL);

    return modal.MODAL_CL_SELF;
  },
});

selectUnitModal.enableLargeIcon = function (iconSize) {
  utils.toggleIconSize(selectUnitModal.modalElement, iconSize);
};

selectUnitModal.ready = false;

// Set the cat in the deck and close the modal.
const selectCatUnit = function (bcData, id, form) {
  const catUnit = bcData.getCatUnit(id);

  setSelectedUnits(false);

  selectUnitModal.data.callbackSelectedUnit(catUnit, form);

  selectUnitModal.close();
};

// ------------------------------
// ----  Cat Unit icon list  ----
// ------------------------------

const initListUnitSelect = function (bcData) {
  const modalElement = selectUnitModal.modalElement;

  const arrUnitSelect = [null];

  bc.LIST_RARITY.forEach(r => {
    // Initialize the list of the icons container.
    const arrForm = [];

    bc.LIST_FORM.forEach(form => {
      const iconsElement = modalElement.querySelector(`.icons[data-r="${r}"][data-f="${form}"]`);

      arrForm[form] = iconsElement;
    });

    arrUnitSelect[r] = arrForm;
  });

  // Add units icons in theirs respectives rarity.
  bcData.getListCatUnit()
  .filter(catUnit => !catUnit.isIgnored())
  .forEach(catUnit => {
    const rarity = catUnit.getRarity();
    const arrRarity = arrUnitSelect[rarity];

    bc.LIST_FORM.forEach(form => {
      const iconsElement = arrRarity[form];

      if (iconsElement == null) return;

      const unitIcon = createUnitIcon(catUnit, form);
      iconsElement.appendChild(unitIcon.getHtml());
    });
  });
};

const createUnitIcon = function (catUnit, form) {
  const unitIconHtml = new UnitIconHtml();

  if (catUnit.hasForm(form)) {
    // Unit present
    unitIconHtml.setUnit(catUnit, form);
    unitIconHtml.render();
  }

  return unitIconHtml;
};

// ----------------
// ----  Unit  ----
// ----------------

// Set the current Cat Unit
const setCurrentUnit = function (selectedId, selectedForm) {
  if (selectUnitModal.data.currentUnit.selectedElement != null) {
    selectUnitModal.data.currentUnit.selectedElement.classList.toggle('selected', false);
  }

  // Get the unit icon to put the selection.
  const unitIconElement = selectUnitModal.modalElement.querySelector(`.icon[data-id="${selectedId}"][data-form="${selectedForm}"]`);

  const found = unitIconElement != null;

  if (found) {
    unitIconElement.classList.toggle('selected', true);
  }

  const id = found ? selectedId : bc.ID_NONE;
  const form = found ? selectedForm : bc.FORM_NONE;

  const selectedElement = found ? unitIconElement : null;
  const tempId = found ? bc.ID_NONE : selectedId;

  selectUnitModal.data.currentUnit = { id, form, selectedElement, tempId };
};

// ---------------------
// ----  Unit Form  ----
// ---------------------

// Make a click on the "form" button.
const setFormButton = function (newForm) {
  const unitForm = selectUnitModal.data.listUnitForm[newForm];

  if (unitForm != null) {
    unitForm.inputElement.checked = true;
  }
};

// Click on "form" buttons (Normal, Evolved, True Form).
const setFormContent = function (newForm) {
  if (selectUnitModal.data.currentUnit.form !== newForm) {
    bc.LIST_FORM.forEach(form => {
      // Hide all except the new form
      const arrIconsElement = selectUnitModal.modalElement.querySelectorAll(`.icons[data-f="${form}"]`);

      arrIconsElement.forEach(e => {
        e.classList.toggle('hidden', newForm !== form);
      });
    });

    if (selectUnitModal.data.currentUnit.id !== bc.ID_NONE
      && selectUnitModal.data.currentUnit.form !== newForm) {
      // Set the unit form
      changeCurrentUnitForm(newForm);

    } else if (selectUnitModal.data.currentUnit.id === bc.ID_NONE
      && selectUnitModal.data.tempId !== bc.ID_NONE) {
      // Set back the unit that does not have a true form.
      revertCurrentUnitForm(newForm);
    }
  }
};

// Change Cat Unit form
const changeCurrentUnitForm = function (form) {
  const id = selectUnitModal.data.currentUnit.id;

  setCurrentUnit(id, form);
};

const revertCurrentUnitForm = function (form) {
  const id = selectUnitModal.data.currentUnit.tempId;

  setCurrentUnit(id, form);
}

// ----------------
// ----  Misc  ----
// ----------------

// Remove the selected units

const setSelectedUnits = function (enable, selectedId, form) {
  const s = enable ? SELECTED_ICON : null;

  selectUnitModal.data.listSelectedId.forEach(id => {
    const listUnitIconElement = selectUnitModal.modalElement.querySelectorAll(`.icon[data-id="${id}"]`);

    if (listUnitIconElement.length > 0) {
      listUnitIconElement.forEach(e => e.setAttribute('data-s', s));
    }

    if (enable && id === selectedId) {
      // Allow to select other forms of the same unit.
      const fa = form === bc.FORM_NORMAL ? bc.FORM_TRUE_FORM : bc.FORM_NORMAL;
      const fb = form === bc.FORM_EVOLVED ? bc.FORM_TRUE_FORM : bc.FORM_EVOLVED;

      const unitIconElementA = selectUnitModal.modalElement.querySelector(`.icon[data-id="${id}"][data-form="${fa}"]`);
      const unitIconElementB = selectUnitModal.modalElement.querySelector(`.icon[data-id="${id}"][data-form="${fb}"]`);

      if (unitIconElementA != null) {
        unitIconElementA.setAttribute('data-s', null);
      }

      if (unitIconElementB != null) {
        unitIconElementB.setAttribute('data-s', null);
      }
    }
  });
};

export default selectUnitModal;