/**
 * PreviousInterviewsPopup
 *
 * Popup listing a user's previous interviews
 */
import React from "react";
import PT from "prop-types";
import SimpleModal from "components/SimpleModal";
import User from "components/User";
import "./styles.module.scss";
import PrevInterviewItem from "../PrevInterviewItem";

function PreviousInterviewsPopup(props) {
  const { candidate, open, onClose } = props;

  // sorts interviews and returns list of PrevInterviewItems
  const showPrevInterviews = (interviews) => {
    const sortedInterviews = (interviews || [])
      .slice()
      .sort((a, b) => a.round - b.round);

    return sortedInterviews.map((interview) => (
      <PrevInterviewItem
        key={interview.id}
        round={interview.round}
        date={interview.startTimestamp}
        status={interview.status}
        hostName={`${interview.hostFirstName} ${interview.hostLastName}`}
        guestName={`${candidate.firstName} ${candidate.lastName}` }
      />
    ));
  };

  return (
    <SimpleModal open={open} onClose={onClose} title="Previous Interviews">
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
          {showPrevInterviews(candidate.interviews)}
        </>
      )}
    </SimpleModal>
  );
}

PreviousInterviewsPopup.propTypes = {
  candidate: PT.object,
  open: PT.bool,
  onClose: PT.func,
};

export default PreviousInterviewsPopup;
