/**
 * BaseModal
 *
 * Wraps the react-responsive-modal
 * and adds the app's style
 *
 * Supports title and action button
 * children are displayed as modal content
 */

import React from "react";
import PT from "prop-types";
import { Modal } from "react-responsive-modal";
import Button from "../Button";
import IconCross from "../../assets/images/icon-cross-light.svg";
import "./styles.module.scss";

const modalStyle = {
  borderRadius: "8px",
  padding: "32px 32px 22px 32px",
  maxWidth: "640px",
  width: "100%",
  margin: 0,
};

const containerStyle = {
  padding: "10px",
};

function BaseModal({
  open,
  onClose,
  children,
  title,
  button,
  disabled,
  extraModalStyle,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeIcon={<IconCross width="15px" height="15px" />}
      styles={{
        modal: { ...modalStyle, ...extraModalStyle },
        modalContainer: containerStyle,
      }}
      center={true}
    >
      {title && <h2 styleName="title">{title}</h2>}
      <div styleName="content">{children}</div>
      <div styleName="button-group">
        {button && button}
        <Button
          type="secondary"
          size="medium"
          onClick={onClose}
          disabled={disabled}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}

BaseModal.propTypes = {
  open: PT.bool.isRequired,
  onClose: PT.func.isRequired,
  children: PT.node,
  title: PT.string,
  button: PT.element,
  disabled: PT.bool,
  extraModalStyle: PT.object,
};

export default BaseModal;
