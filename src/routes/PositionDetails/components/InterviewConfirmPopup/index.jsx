/**
 * InterviewConfirmPopup
 *
 * Popup to Confirm submission of an interview
 */
import React from "react";
import PT from "prop-types";
import SimpleModal from "components/SimpleModal";
import { INTERVIEW_POPUP_MEDIA_URL } from "constants";
import "./styles.module.scss";

function InterviewConfirmPopup({ open, onClose }) {
  return (
    <SimpleModal
      title={"Schedule Your Availability"}
      open={open}
      onClose={onClose}
    >
      <div styleName="modal-content">
        <p>
          Please check your email and look for emails from
          <span styleName="highlighted"> scheduler@topcoder.com</span>.
        </p>
        <p>
          All interviewers will be able to select availability from there and
          the system will help you select and book the time.
        </p>
        <p>
          You may manually select your available times from the email, or click
          <span styleName="highlighted"> “View More Times”</span> to see
          expanded options, additionally, you may click
          <span styleName="highlighted"> “Overlay My Calendar”</span> to
          integrate with your calendar and allow the system to schedule based on
          your calendar availability.
        </p>
        <p>
          If you have any issues with scheduling, please contact
          <a href="mailto:talent@topcoder.com"> talent@topcoder.com</a>.
        </p>
      </div>
    </SimpleModal>
  );
}

InterviewConfirmPopup.propTypes = {
  open: PT.bool,
  onClose: PT.func,
};

export default InterviewConfirmPopup;
