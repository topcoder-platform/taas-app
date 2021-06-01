/**
 * Temporary Popup for skill list
 * show skill list
 */
import React from "react";
import _ from "lodash";
import PT from "prop-types";
import Modal from "react-responsive-modal";
import Button from "components/Button";
import IconCrossLight from "../../../../assets/images/icon-cross-light.svg";
import IconSingleManAdd from "../../../../assets/images/icon-single-man-add.svg";
import "./styles.module.scss";
import CenteredSpinner from "components/CenteredSpinner";

const modalStyle = {
  borderRadius: "8px",
  padding: "32px 32px 22px 32px",
  maxWidth: "460px",
  width: "100%",
  margin: 0,
  "overflow-x": "hidden",
};

const containerStyle = {
  padding: "10px",
};

function Popup({ open, skills, onClose, isLoading, onContinueClick }) {
  return (
    <Modal
      open={open}
      center
      onClose={onClose}
      closeIcon={
        <IconCrossLight height="18px" width="18px" styleName="cross" />
      }
      styles={{
        modal: modalStyle,
        modalContainer: containerStyle,
      }}
    >
      <div styleName="modal-body">
        {isLoading ? (
          <>
            <CenteredSpinner />
            <h5>loading skills</h5>
          </>
        ) : (
          <>
            <IconSingleManAdd />
            <h5>skills</h5>
            {_.map(skills, (s) => {
              return <div>{s.tag}</div>;
            })}
          </>
        )}
      </div>
      <div styleName="button-group">
        <Button
          type="primary"
          size="medium"
          disabled={isLoading}
          onClick={onContinueClick}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
}

Popup.propTypes = {
  open: PT.bool,
  onClose: PT.func,
  isLoading: PT.bool,
  onContinueClick: PT.func,
  skills: PT.arrayOf(PT.shape()),
};

export default Popup;
