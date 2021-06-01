/**
 * Add Another Modal
 * Popup that appears after submitting job.
 * Shows loading spinner while job submits and
 * allows navigation to "Add another role".
 */
import React from "react";
import PT from "prop-types";
import Modal from "react-responsive-modal";
import Button from "components/Button";
import IconCrossLight from "../../assets/images/icon-cross-light.svg";
import IconSingleManAdd from "../../assets/images/icon-single-man-add.svg";
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

function AddAnotherModal({ open, onClose, submitDone, addAnother }) {
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
        {!submitDone ? (
          <>
            <CenteredSpinner />
            <h5>Submitting Request...</h5>
          </>
        ) : (
          <>
            <IconSingleManAdd />
            <h5>Add Another Position</h5>
            <p>You can add another position to your request if you want to.</p>
          </>
        )}
      </div>
      <div styleName="button-group">
        <Button
          type="secondary"
          size="medium"
          disabled={!submitDone}
          onClick={addAnother}
        >
          Add Another Position
        </Button>
        <Button type="primary" size="medium" disabled={!submitDone}>
          Continue
        </Button>
      </div>
    </Modal>
  );
}

AddAnotherModal.propTypes = {
  open: PT.bool,
  onClose: PT.func,
  submitDone: PT.bool,
  addAnother: PT.func,
};

export default AddAnotherModal;
