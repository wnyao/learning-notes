/** @format */

import {EventEmitter} from 'events'; // From node itself

const Constants = {
  MODAL: 'modal',
};

class ConfirmModalManager extends EventEmitter {
  modal = {};

  create(modal) {
    this.modal = modal;
    this.emitChange();
  }

  show(headerTextId, bodyTextId, onConfirm, bodyContent, footer, closable) {
    this.create({
      headerTextId: headerTextId || 'modal.header.confirmation',
      bodyTextId: bodyTextId || 'modal.body.confirmation.delete',
      onConfirm: onConfirm || (() => {}),
      isModalOpen: true,
      bodyContent,
      footer,
      closable,
    });
  }

  toggle() {
    this.modal = {
      ...this.modal,
      isModalOpen: !this.modal.isModalOpen,
    };
    this.emitChange();
  }

  emitChange() {
    this.emit(Constants.MODAL, this.modal);
  }

  addChangeListener(callback) {
    this.addListener(Constants.MODAL, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.MODAL, callback);
  }
}

export default new ConfirmModalManager();
