'use strict';

const MODAL_OP_NONE = 'a';
const MODAL_OP_SELF = 'b';

const MODAL_CL_NONE = 0;
const MODAL_CL_SELF = 1;

const Modal = function ({
  selector,
  onInit = null,
  beforeOpen = null,
  afterOpen = null,
  onValid = null,
  onCancel = null,
  onClose = null,
} = {}) {
  const self = this;
  const $modal = $(selector);
  const $modalClose = $('.mf-close', $modal);

  // -----------------
  // ----  Modal  ----
  // -----------------

  // Init
  this.init = function (args) {
    if (onInit) {
      onInit(self, args);
    }
  };

  // Open
  this.open = function (args = {}) {
    let res = MODAL_OP_SELF;

    if (beforeOpen) {
      res = beforeOpen(self, args) || MODAL_OP_SELF;
    }

    if (res !== MODAL_OP_NONE) {
      $modal.removeClass('hidden');
    }

    if (afterOpen) {
      afterOpen(self, args);
    }
  };

  // Close
  this.close = function () {
    let res = MODAL_CL_SELF;

    if (onClose) {
      res = onClose(self) || MODAL_CL_SELF;
    }

    if (res !== MODAL_CL_NONE) {
      $modal.addClass('hidden');
    }
  };

  this.valid = function () {
    let res = MODAL_CL_SELF;

    if (onValid) {
      res = onValid(self) || MODAL_CL_SELF;
    }

    modalClose(res);
  };

  this.cancel = function () {
    let res = MODAL_CL_SELF;

    if (onCancel) {
      res = onCancel(self) || MODAL_CL_SELF;
    }

    modalClose(res);
  };

  const modalClose = function (res) {
    switch (res) {
    case MODAL_CL_SELF:
      self.close();
      break;
    }
  };

  // -----------------
  // ----  Event  ----
  // -----------------

  // Valid
  if (onValid) {
    $('.valid', $modal).on('click', this.valid);
  }

  // Cancel
  if (onValid) {
    $('.cancel', $modal).on('click', this.cancel);
  }

  // Close
  $modalClose.on('click', this.close);

  // --------------------------
  // ----  Initialization  ----
  // --------------------------

  this.$modal = $modal;

  this.data = { };
};

export {
  Modal,
  MODAL_OP_NONE,
  MODAL_OP_SELF,
  MODAL_CL_NONE,
  MODAL_CL_SELF,
};