/**
 * Payment result popup
 */
import React, { useState, useEffect } from "react";
import PT from "prop-types";
import { useInterval } from "react-use";
import Button from "components/Button";
import BaseCreateModal from "../../../components/BaseCreateModal";
import "./styles.module.scss";

function PaymentResultPopup({ open, onClose, onContinueClick }) {
  const [second, setSecond] = useState(10);
  useInterval(
    () => {
      setSecond(second - 1);
    },
    second > 0 ? 1000 : null
  );
  useEffect(() => {
    if (second === 0) {
      onContinueClick();
    }
  }, [second, onContinueClick]);

  const Buttons = (
    <div styleName="button-contaier">
      <Button
        type="primary"
        size="medium"
        styleName="continue-button"
        onClick={onContinueClick}
      >
        TAKE ME TO MY TEAM
      </Button>
      <div styleName="time-label">
        You will be automatically redirected in{" "}
        {second === 0 || second === 10 ? second : "0" + second} seconds
      </div>
    </div>
  );

  return (
    <BaseCreateModal
      open={open}
      onClose={onClose}
      maxWidth="560px"
      buttons={Buttons}
    >
      <h1 styleName="header">WE'VE RECEIVED YOUR DEPOSIT</h1>
      <div styleName="sub-header">
        Thanks for trusting us with your talent needs! You will be redirected to
        your Team page where you can review candidates, schedule interviews, and
        lock in your selections.
      </div>
    </BaseCreateModal>
  );
}

PaymentResultPopup.propTypes = {
  open: PT.bool,
  onClose: PT.func,
  onContinueClick: PT.func,
};

export default PaymentResultPopup;
