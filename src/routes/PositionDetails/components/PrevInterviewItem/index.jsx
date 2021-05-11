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
  const { date, round, emails } = props;

  return (
    <Accordion
      title={`Interview Round ${round}`}
      subhead={formatDate(date)}
      sidebar={`${emails.length} Attendee(s)`}
    >
      <ul>
        {emails.map((email) => (
          <li styleName="email">{email}</li>
        ))}
      </ul>
    </Accordion>
  );
}

PrevInterviewItem.propTypes = {
  date: PT.string.isRequired,
  round: PT.number.isRequired,
  emails: PT.arrayOf(PT.string).isRequired,
};

export default PrevInterviewItem;
