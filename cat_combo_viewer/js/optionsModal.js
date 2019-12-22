'use strict';

import * as utils from './utils.js';
import * as modal from './modal.js';

// -----------------
// ----  Modal  ----
// -----------------

const optionsModal = new modal.Modal({
  selector: '#optionsModal',

  onInit(self, {
    catComboGalleryHtml,
    deckHtml,
    activeEffectGalleryHtml,
    selectUnitModal,
  }) {
    self.data.$btnIconSizeSmall = $('#iconSizeSmall', self.$modal).eq(0);
    self.data.$btnIconSizeMedium = $('#iconSizeMedium', self.$modal).eq(0);
    self.data.$btnIconSizeLarge = $('#iconSizeLarge', self.$modal).eq(0);

    const updateUnitIconSize = function () {
      const iconSize = getIconSize(self);

      catComboGalleryHtml.enableLargeIcon(iconSize);
      deckHtml.enableLargeIcon(iconSize);
      activeEffectGalleryHtml.enableLargeIcon(iconSize);
      selectUnitModal.enableLargeIcon(iconSize);
    };

    self.data.$btnIconSizeSmall.on('click', function () {
      updateUnitIconSize();
    });

    self.data.$btnIconSizeMedium.on('click', function () {
      updateUnitIconSize();
    });

    self.data.$btnIconSizeLarge.on('click', function () {
      updateUnitIconSize();
    });

    updateUnitIconSize();
  },
});

const getIconSize = function (modal) {
  const $checkedRadio = $('[name="iconSize"]:checked', modal.$modal);

  return $checkedRadio.attr('data-icon-size');
};

export default optionsModal;