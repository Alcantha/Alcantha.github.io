'use strict';

const MODAL_OP_NONE = 'a';
const MODAL_OP_SELF = 'b';

const MODAL_CL_NONE = 0;
const MODAL_CL_SELF = 1;

const Modal = function ({
  modalId,
  onInit = null,
  beforeOpen = null,
  afterOpen = null,
  onValid = null,
  onCancel = null,
  onClose = null,
} = {}) {
  const self = this;
  const modalElement = document.getElementById(modalId);

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
      modalElement.classList.toggle('hidden', false);
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
      modalElement.classList.toggle('hidden', true);
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

  modalElement.addEventListener('click', function (e) {
    // Valid
    const btnValidElement = e.path.find(e2 => e2.classList != null && e2.classList.contains('valid'));

    if (btnValidElement != null) {
      self.valid();
      return;
    }

    // Cancel
    const btnCancelElement = e.path.find(e2 => e2.classList != null && e2.classList.contains('cancel'));

    if (btnCancelElement != null) {
      self.cancel();
      return;
    }

    // Close
    const btnCloseElement = e.path.find(e2 => e2.classList != null && e2.classList.contains('mf-close'));

    if (btnCloseElement != null) {
      self.close();
      return;
    }
  });

  // --------------------------
  // ----  Initialization  ----
  // --------------------------

  this.modalElement = modalElement;

  this.data = { };
};

export {
  Modal,
  MODAL_OP_NONE,
  MODAL_OP_SELF,
  MODAL_CL_NONE,
  MODAL_CL_SELF,
};