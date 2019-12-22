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
  selector: '#selectUnitModal',

  onInit(self, { bcData }) {
    initListUnitSelect(bcData);

    self.data.$mainContent = $('main', self.$modal).eq(0);
    self.data.$content = $('main > .content', self.$modal).eq(0);

    // Current unit selected.
    self.data.currentUnit = {
      id: bc.ID_NONE,
      form: bc.FORM_NONE,
      $selected: null,
      tempId: bc.ID_NONE,
    };

    // Form buttons.
    self.data.$forms = [];

    bc.LIST_FORM.forEach(f => {
      const input = $(`.btn-form[data-f="${f}"]`, self.$modal);
      const label = $(`.btn-form[data-f="${f}"] + label`, self.$modal);

      self.data.$forms[f] = { input, label };

      // Select the unit form.
      self.data.$forms[f].label.on('click', function () {
        setFormContent(f);
      });

      // Set the unit form.
      self.data.$forms[f].label.on('dblclick', function () {
        const { id, form } = self.data.currentUnit;

        if (id !== bc.ID_NONE) {
          selectCatUnit(bcData, id, form);
        }
      });
    });

    self.data.$removeUnit = $('#removeUnit');

    // Click on Cat Unit
    self.$modal.on('click', '.icon', function () {
      const $unitIcon = $(this);

      const id = $unitIcon.attr('data-id');
      const selected = $unitIcon.attr('data-s') === SELECTED_ICON;

      if (id > 0 && !selected) {
        // Reset the selected units.
        const form = $unitIcon.attr('data-form');

        selectCatUnit(bcData, id, form);
      }
    });

    self.data.$forms[bc.FORM_NORMAL].label.click();

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

    self.data.$removeUnit.attr('disabled', !validId);

    // List of unit already selected
    self.data.listSelectedId = listSelectedId;

    setSelectedUnits(true, id, form);

    self.data.callbackSelectedUnit = callbackSelectedUnit;

    return modal.MODAL_OP_SELF;
  },

  afterOpen(self, { id, form }) {
    const validId = (id != null && id > 0);
    const $main = self.data.$mainContent;

    if (validId) {
      const $unitIcon = self.$modal.find(`.icon[data-id=${id}][data-form=${form}]`);

      if ($unitIcon.length) {
        // Scroll with the selected unit at the center.
        const $content = self.data.$content;
        const top = $unitIcon.offset().top - $content.offset().top + 10 - ($main.height() - $unitIcon.height()) / 2;

        $main.scrollTop(top);

      } else {
        // Scroll at the top when there is no unit selected.
        $main.scrollTop(0);
      }
    } else {
      $main.scrollTop(0);
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
  utils.toggleIconSize(selectUnitModal.$modal, iconSize);
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
  const $modal = selectUnitModal.$modal;

  const arrUnitSelect = [null];

  bc.LIST_RARITY.forEach(r => {
    // Initialize the list of the icons container.
    const arrForm = [];

    bc.LIST_FORM.forEach(form => {
      const $icons = $(`.icons[data-r=${r}][data-f=${form}]`, $modal);

      arrForm[form] = $icons;
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
      const $icons = arrRarity[form];

      if ($icons.length > 0) {
        const unitIcon = createUnitIcon(catUnit, form);
        $icons.append(unitIcon.getHtml());
      }
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
  if (selectUnitModal.data.currentUnit.$selected != null) {
    selectUnitModal.data.currentUnit.$selected.removeClass('selected');
  }

  // Get the unit icon to put the selection.
  const $unitIcon = $(`.icon[data-id=${selectedId}][data-form=${selectedForm}]`, selectUnitModal.$modal);

  const found = $unitIcon.length > 0;

  if (found) {
    $unitIcon.addClass('selected');
  }

  const id = found ? selectedId : bc.ID_NONE;
  const form = found ? selectedForm : bc.FORM_NONE;
  const $selected = found ? $unitIcon : null;
  const tempId = found ? bc.ID_NONE : selectedId;

  selectUnitModal.data.currentUnit = { id, form, $selected, tempId };
};

// ---------------------
// ----  Unit Form  ----
// ---------------------

// Make a click on the "form" button.
const setFormButton = function (newForm) {
  const $form = selectUnitModal.data.$forms[newForm];

  if ($form != null) {
    $form.input.prop('checked', true);
  }
};

// Click on "form" buttons (Normal, Evolved, True Form).
const setFormContent = function (newForm) {
  if (selectUnitModal.data.currentUnit.form !== newForm) {
    bc.LIST_FORM.forEach(form => {
      // Hide all except the new form
      selectUnitModal.$modal.find(`.icons[data-f=${form}]`).toggleClass('hidden', newForm !== form);
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
    $(`.icon[data-id=${id}]`, selectUnitModal.$modal).attr('data-s', s);

    if (enable && id === selectedId) {
      // Allow to select other forms of the same unit.
      const fa = form === bc.FORM_NORMAL ? bc.FORM_TRUE_FORM : bc.FORM_NORMAL;
      const fb = form === bc.FORM_EVOLVED ? bc.FORM_TRUE_FORM : bc.FORM_EVOLVED;

      $(`.icon[data-id=${id}][data-form=${fa}]`, selectUnitModal.$modal).attr('data-s', null);
      $(`.icon[data-id=${id}][data-form=${fb}]`, selectUnitModal.$modal).attr('data-s', null);
    }
  });
};

export default selectUnitModal;