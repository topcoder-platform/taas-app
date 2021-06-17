/**
 * Add Another Modal
 * Popup that appears after submitting job.
 * Shows loading spinner while job submits and
 * allows navigation to "Add another role".
 */
import React from "react";
import PT from "prop-types";
import Button from "components/Button";
import IconSingleManAdd from "../../../../assets/images/icon-single-man-add.svg";
import BaseCreateModal from "../BaseCreateModal";

function AddAnotherModal({
  open,
  onClose,
  onContinueClick,
  submitDone,
  addAnother,
}) {
  const buttons = (
    <>
      <Button
        type="secondary"
        size="medium"
        disabled={!submitDone}
        onClick={addAnother}
      >
        Add Another Position
      </Button>
      <Button
        type="primary"
        size="medium"
        onClick={onContinueClick}
        disabled={!submitDone}
      >
        Continue
      </Button>
    </>
  );

  return (
    <BaseCreateModal
      open={open}
      onClose={onClose}
      headerIcon={<IconSingleManAdd />}
      title="Add Another Position"
      subtitle="You can add another position to your request if you want to."
      buttons={buttons}
      isLoading={!submitDone}
      maxWidth="480px"
    />
  );
}

AddAnotherModal.propTypes = {
  open: PT.bool,
  onClose: PT.func,
  submitDone: PT.bool,
  addAnother: PT.func,
};

export default AddAnotherModal;
