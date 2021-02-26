/**
 * An email popup used to format and send emails for reporting issues
 * and requesting extensions
 */

import React, { useCallback, useState } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";
import { closeEmailPopup } from "./actions";
import BaseModal from "components/BaseModal";
import TextArea from "components/TextArea";
import Button from "../Button";
import { postEmail } from "services/teams";
import CenteredSpinner from "components/CenteredSpinner";

function EmailPopup() {
  const { isOpen, popupOptions, data } = useSelector(
    (state) => state.emailPopup
  );

  const dispatch = useDispatch();
  const [textVal, setTextVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitEmail = () => {
    setIsLoading(true);

    _.set(data, popupOptions.textDataField, textVal);

    postEmail(data)
      .then(() => {
        setIsLoading(false);
        closeModal();
        toastr.success("Email submitted successfully");
      })
      .catch((err) => {
        setIsLoading(false);

        toastr.error("Email failed to send", err.message);
      });
  };

  const button = (
    <Button
      onClick={() => submitEmail()}
      size="medium"
      isSubmit
      disabled={textVal.trim().length < 1 || isLoading}
    >
      Submit
    </Button>
  );

  const closeModal = useCallback(() => {
    dispatch(closeEmailPopup());
    setTextVal("");
  }, [dispatch]);

  return (
    <BaseModal
      open={isOpen}
      onClose={closeModal}
      title={popupOptions.title}
      button={button}
      disabled={isLoading}
    >
      {isLoading ? (
        <CenteredSpinner />
      ) : (
        <TextArea
          value={textVal}
          onChange={setTextVal}
          placeholder={popupOptions.textPlaceholder}
        />
      )}
    </BaseModal>
  );
}

export default EmailPopup;
