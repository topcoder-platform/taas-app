import React, { useState } from "react";
import PropTypes from "prop-types";
import BaseCreateModal from "../BaseCreateModal";
import Button from "components/Button";
import "./styles.module.scss";
import Checkbox from "components/Checkbox";

function ConfirmationModal() {
  const [open, setOpen] = useState(true);
  const [agreed, setAgreed] = useState(false);

  const toggleAgreed = () => {
    setAgreed((agreed) => !agreed);
  };

  const onConfirm = () => {
    console.log("Confirmed!");
  };

  const confirmButton = (
    <Button type="primary" size="medium" disabled={!agreed} onClick={onConfirm}>
      Confirm
    </Button>
  );

  return (
    <BaseCreateModal
      open={open}
      onClose={() => setOpen(false)}
      title="Confirmation"
      buttons={confirmButton}
    >
      <div styleName="agreement">
        <h5>Our Commitment to You</h5>
        <p>
          We will do everything we can to find the talent you need within the
          Topcoder community.
        </p>
        <h5>Your Commitment to Us</h5>
        <p>
          You will only post genuine job opportunities, and will be responsive
          and communicative with the candidates provided. You recognize the
          freelancers in the Topcoder community are real people making big
          decisions based on your engagement with them.
        </p>
      </div>
      <div styleName="check-container">
        <Checkbox
          label="I agree to the commitments."
          checked={agreed}
          onClick={toggleAgreed}
        />
      </div>
    </BaseCreateModal>
  );
}

ConfirmationModal.propTypes = {};

export default ConfirmationModal;
