/** @format */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';

import {Modal} from './Modal';
import ConfirmModalManager from './ConfirmModalManager';

class ConfirmModal extends Component {
  state = {
    closable: true,
    footer: true,
    bodyContent: false,
    isModalOpen: false,
    onConfirm: null,
    headerTextId: 'modal.header.confirmation',
    bodyTextId: 'modal.body.confirmation.delete',
  };

  toggleModal = () => {
    ConfirmModalManager.toggle();
  };

  componentWillMount = () => {
    ConfirmModalManager.addChangeListener(this.handleChange);
  };

  componentWillUnmount = () => {
    ConfirmModalManager.removeChangeListener(this.handleChange);
  };

  handleChange = modalState => {
    this.setState(modalState);
  };

  render() {
    const {
      closable,
      footer,
      bodyContent,
      isModalOpen,
      onConfirm,
      headerTextId,
      bodyTextId,
    } = this.state;

    if (bodyContent) {
      return (
        <Modal
          bodyContent
          footer={footer}
          closable={closable}
          open={isModalOpen}
          toggle={this.toggleModal}
          onConfirm={onConfirm}
          headerTextId={headerTextId}>
          {bodyTextId}
        </Modal>
      );
    }

    return (
      <Modal
        footer={footer}
        closable={closable}
        open={isModalOpen}
        toggle={this.toggleModal}
        onConfirm={onConfirm}
        headerTextId={headerTextId}
        bodyTextId={bodyTextId}
      />
    );
  }
}

export default injectIntl(ConfirmModal);
