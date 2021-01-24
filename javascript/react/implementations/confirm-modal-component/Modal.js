/** @format */

import React from 'react';
import {
  Modal as StrapModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'; // TODO: adjust to modal use
import {Button} from './GBPButton'; // TODO: change buttons
import IntlMessages from 'Util/IntlMessages';

export class Modal extends React.Component {
  state = {modal: false};

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  hideModal = () => this.setState({modal: false});

  render() {
    const {
      header,
      bodyText = '', // if 'bodyContent' enabled, then no need to send this prop
      open,
      toggle,
      size,
      bodyContent, // to receive a children within
      onConfirm,
      footer = true,
      okText = 'modal.button.ok',
      cancelText = 'modal.button.cancel',
      closable = true,
      children,
    } = this.props;

    return (
      <StrapModal
        backdrop="static"
        isOpen={open || this.state.modal}
        size={size}
        toggle={toggle}>
        <ModalHeader className="border-0" toggle={closable && toggle}>
          <strong>{header}</strong>
        </ModalHeader>
        <ModalBody>{bodyContent ? bodyText : children}</ModalBody>
        {footer && (
          <ModalFooter className="border-0">
            <Button outline onClick={toggle} textId={cancelText} /> &nbsp;
            <Button color="primary" textId={okText} onClick={onConfirm} />
          </ModalFooter>
        )}
      </StrapModal>
    );
  }
}
