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
import cn from "classnames";
import { Modal } from "react-responsive-modal";
import Button from "../Button";
import IconCross from "../../assets/images/icon-cross-light.svg";
import "./styles.module.scss";

const modalStyle = {
  borderRadius: "8px",
  padding: "20px 24px",
  maxWidth: "640px",
  width: "100%",
  margin: 0,
  overflowX: "hidden",
};

const containerStyle = {
  padding: "10px",
};

const closeButton = {
  right: "24px",
  top: "24px",
};

function BaseModal({
  open,
  onClose,
  children,
  title,
  button,
  closeButtonText,
  disabled,
  extraModalStyle,
  alignTitleCenter = false,
  showButton = true,
  closeIcon: CloseIcon,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeIcon={
        CloseIcon ? CloseIcon : <IconCross width="15px" height="15px" />
      }
      styles={{
        modal: { ...modalStyle, ...extraModalStyle },
        modalContainer: containerStyle,
        closeButton,
      }}
      center={true}
    >
      {title && (
        <h2
          styleName={cn("title", {
            "center-title": alignTitleCenter,
          })}
        >
          {title}
        </h2>
      )}
      <div styleName="content">{children}</div>
      {showButton && (
        <div styleName="button-group">
          {button && button}
          <Button
            type="secondary"
            size="medium"
            onClick={onClose}
            disabled={disabled}
          >
            {closeButtonText ? closeButtonText : "Cancel"}
          </Button>
        </div>
      )}
    </Modal>
  );
}

BaseModal.propTypes = {
  open: PT.bool.isRequired,
  onClose: PT.func.isRequired,
  children: PT.node,
  title: PT.string,
  button: PT.element,
  closeButtonText: PT.string,
  disabled: PT.bool,
  extraModalStyle: PT.object,
  showButton: PT.bool,
  alignTitleCenter: PT.bool,
  closeIcon: PT.node,
};

export default BaseModal;
