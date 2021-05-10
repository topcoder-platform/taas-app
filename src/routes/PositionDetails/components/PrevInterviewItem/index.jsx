/**
 * PrevInterviewItem
 *
 * A list item for the PreviousInterviewsPopup
 */
import React from "react";
import PT from "prop-types";
import { formatDate } from "utils/format";
import Accordion from "components/Accordion";
import "./styles.module.scss";

function PrevInterviewItem(props) {
  const { date, round, hostEmail, guestEmails } = props;

  return (
    <Accordion
      title={`Interview Round ${round}`}
      subhead={formatDate(date)}
      sidebar={`${guestEmails.length + 1} Attendees`}
    >
      <ul>
        <li styleName="email">{hostEmail}</li>
        {guestEmails.map((email) => (
          <li styleName="email">{email}</li>
        ))}
      </ul>
    </Accordion>
  );
}

PrevInterviewItem.propTypes = {
  date: PT.string.isRequired,
  round: PT.number.isRequired,
  hostEmail: PT.string.isRequired,
  guestEmails: PT.arrayOf(PT.string).isRequired,
};

export default PrevInterviewItem;
