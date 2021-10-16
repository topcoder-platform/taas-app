import React from "react";
import PT from "prop-types";
import Modal from "react-responsive-modal";
import IconCrossLight from "../../../../assets/images/icon-cross-light.svg";
import CenteredSpinner from "components/CenteredSpinner";
import "./styles.module.scss";
import cn from "classnames";

const modalStyle = {
  borderRadius: "8px",
  padding: "72px 0 60px 0",
  width: "100%",
  margin: 0,
  overflowX: "hidden",
};

const containerStyle = {
  padding: "10px",
};

const closeButtonStyle = {
  top: "31px",
  right: "31px",
};

function BaseCreateModal({
  open,
  onClose,
  hideCloseIcon,
  headerIcon,
  title,
  subtitle,
  buttons,
  isLoading,
  loadingMessage,
  maxWidth = "680px",
  darkHeader,
  disableFocusTrap,
  children,
}) {
  return (
    <Modal
      open={open}
      center
      onClose={onClose}
      showCloseIcon={!hideCloseIcon}
      closeIcon={
        <IconCrossLight height="20px" width="20px" styleName="cross" />
      }
      styles={{
        modal: { ...modalStyle, maxWidth },
        modalContainer: containerStyle,
        closeButton: closeButtonStyle,
      }}
      focusTrapped={!disableFocusTrap}
    >
      <div styleName="modal-body" tabIndex="-1">
        {isLoading ? (
          <div styleName={cn("modal-header", { "dark-header": darkHeader })}>
            <CenteredSpinner />
            {loadingMessage && <h5>{loadingMessage}</h5>}
          </div>
        ) : (
          <>
            <div styleName={cn("modal-header", { "dark-header": darkHeader })}>
              {headerIcon && <div styleName="header-icon">{headerIcon}</div>}
              <h5>{title}</h5>
              {subtitle && <p>{subtitle}</p>}
            </div>
            {children}
          </>
        )}
      </div>
      <div styleName="button-group">{buttons}</div>
    </Modal>
  );
}

BaseCreateModal.propTypes = {
  open: PT.bool,
  onClose: PT.func,
  hideCloseIcon: PT.bool,
  headerIcon: PT.node,
  title: PT.string,
  subtitle: PT.string,
  buttons: PT.node,
  isLoading: PT.bool,
  loadingMessage: PT.string,
  maxWidth: PT.string,
  darkHeader: PT.bool,
  disableFocusTrap: PT.bool,
  children: PT.node,
};

export default BaseCreateModal;
