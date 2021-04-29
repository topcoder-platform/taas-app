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
  select,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const confirmSelection = useCallback(async () => {
    setIsLoading(true);
    if (isReject) {
      await reject(candidate);
    } else {
      await select(candidate);
    }
    setIsLoading(false);
  }, [isReject, candidate, reject, select]);

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
          ) : isReject ? (
            <p>Are you sure you want to decline the selected candidate?</p>
          ) : (
            <>
              <p>
                You have selected this applicant - you want this member on your
                team! What happens next:
              </p>
              <ol>
                <li>
                  Upon confirmation, Topcoder will confirm the arrangement with
                  the selected member
                </li>
                <li>
                  A Topcoder Rep will contact you with details on the work
                  arrangement
                </li>
                <li>
                  When both sides accept, we will finalize the agreement and
                  begin onboarding
                </li>
              </ol>
            </>
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
