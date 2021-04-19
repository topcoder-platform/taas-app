/**
 * SelectCandidatePopup
 *
 * Confirmation popup on selecting or rejecting a candidate
 */
import React, { useCallback, useState } from "react";
import PT from "prop-types";
import BaseModal from "components/BaseModal";
import Button from "components/Button";
import User from "components/User";
import "./styles.module.scss";
import CenteredSpinner from "components/CenteredSpinner";

const SelectCandidatePopup = ({
  candidate,
  isReject,
  open,
  closeModal,
  reject,
  shortList,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const confirmSelection = useCallback(async () => {
    setIsLoading(true);
    if (isReject) {
      await reject(candidate.id);
    } else {
      await shortList(candidate.id);
    }
    setIsLoading(false);
  }, [isReject, candidate, reject, shortList]);

  return (
    <BaseModal
      open={open}
      onClose={closeModal}
      title={
        isReject ? "Confirm Decline Candidate" : "Confirm Candidate Selection"
      }
      button={
        <Button
          onClick={confirmSelection}
          type={isReject ? "warning" : "primary"}
          size="medium"
          disabled={isLoading}
        >
          Confirm
        </Button>
      }
      disabled={isLoading}
    >
      {candidate === null ? (
        ""
      ) : (
        <>
          <div styleName="user">
            <User
              user={{
                ...candidate,
                photoUrl: candidate.photo_url,
              }}
              hideFullName
            />
          </div>
          {isLoading ? (
            <CenteredSpinner />
          ) : (
            <p>
              {isReject
                ? "Are you sure you want to decline the selected candidate?"
                : "Please confirm your selection of the above candidate"}
            </p>
          )}
        </>
      )}
    </BaseModal>
  );
};

SelectCandidatePopup.propTypes = {
  candidate: PT.object,
  open: PT.bool,
  isReject: PT.bool,
  shortList: PT.func,
  reject: PT.func,
  closeModal: PT.func,
};

export default SelectCandidatePopup;
