/**
 * A report popup used to report issues with teams or team members
 */

import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";
import { closeReport } from "./actions";
import BaseModal from "components/BaseModal";
import TextArea from "components/TextArea";
import Button from "../Button";
import { postReport } from "services/teams";
import CenteredSpinner from "components/CenteredSpinner";

function ReportPopup() {
  const { isOpen, teamName, teamId, memberHandle } = useSelector(
    (state) => state.reportPopup
  );

  const dispatch = useDispatch();
  const [textVal, setTextVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitReport = () => {
    setIsLoading(true);

    postReport(teamName, teamId, textVal, memberHandle)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        closeModal();
        toastr.success("Report submitted successfully");
      })
      .catch((err) => {
        setIsLoading(false);
        toastr.error("Report failed", err.message);
      });
  };

  const button = (
    <Button
      onClick={() => submitReport()}
      size="medium"
      isSubmit
      disabled={textVal.trim().length < 1 || isLoading}
    >
      Submit
    </Button>
  );

  const closeModal = useCallback(() => {
    dispatch(closeReport());
  }, [dispatch]);

  return (
    <BaseModal
      open={isOpen}
      onClose={closeModal}
      title={`Issue Report - ${teamName}${
        memberHandle ? " - " + memberHandle : ""
      }`}
      button={button}
      disabled={isLoading}
    >
      {isLoading ? (
        <CenteredSpinner />
      ) : (
        <TextArea
          value={textVal}
          onChange={setTextVal}
          placeholder="Describe your issue"
        />
      )}
    </BaseModal>
  );
}

export default ReportPopup;
