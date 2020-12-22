'use strict';

import * as utils from './utils.js';
import * as modal from './modal.js';

// -----------------
// ----  Modal  ----
// -----------------

const optionsModal = new modal.Modal({
  modalId: 'optionsModal',

  onInit(self, {
    catComboGalleryHtml,
    deckHtml,
    activeEffectGalleryHtml,
    selectUnitModal,
  }) {
    self.data.btnIconSizeSmallElement = self.modalElement.querySelector('#iconSizeSmall');
    self.data.btnIconSizeMediumElement = self.modalElement.querySelector('#iconSizeMedium');
    self.data.btnIconSizeLargeElement = self.modalElement.querySelector('#iconSizeLarge');

    const updateUnitIconSize = function () {
      const iconSize = getIconSize(self);

      catComboGalleryHtml.enableLargeIcon(iconSize);
      deckHtml.enableLargeIcon(iconSize);
      activeEffectGalleryHtml.enableLargeIcon(iconSize);
      selectUnitModal.enableLargeIcon(iconSize);
    };

    self.data.btnIconSizeSmallElement.addEventListener('click', function () {
      updateUnitIconSize();
    });
    self.data.btnIconSizeMediumElement.addEventListener('click', function () {
      updateUnitIconSize();
    });
    self.data.btnIconSizeLargeElement.addEventListener('click', function () {
      updateUnitIconSize();
    });

    updateUnitIconSize();
  },
});

const getIconSize = function (modal) {
  const checkedRadioElement = modal.modalElement.querySelector('[name="iconSize"]:checked');

  return checkedRadioElement.getAttribute('data-icon-size');
};

export default optionsModal;