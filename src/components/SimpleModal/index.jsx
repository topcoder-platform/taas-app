/**
 * SimpleModal
 *
 * Wraps the react-responsive-modal
 * and adds the app's style
 *
 * The same as the BaseModal, but with only a single close button
 * Supports title
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

export const SimpleModal = ({
  open,
  onClose,
  extraModalStyle,
  title,
  children,
  disabled,
}) => (
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
      <Button
        type="primary"
        size="medium"
        onClick={onClose}
        disabled={disabled}
      >
        Close
      </Button>
    </div>
  </Modal>
);

SimpleModal.propTypes = {
  open: PT.bool.isRequired,
  onClose: PT.func.isRequired,
  children: PT.node,
  title: PT.string,
  disabled: PT.bool,
  extraModalStyle: PT.object,
};

export default SimpleModal;
