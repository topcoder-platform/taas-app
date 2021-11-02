/**
 * PrevInterviewItem
 *
 * A list item for the PreviousInterviewsPopup
 */
import React from "react";
import PT from "prop-types";
import { formatInterviewDate } from "utils/format";
import Accordion from "components/Accordion";
import "./styles.module.scss";

function PrevInterviewItem(props) {
  const { date, round, hostName, guestName } = props;

  return (
    <Accordion
      title={`Interview Round ${round}`}
      subhead={formatInterviewDate(date)}
      sidebar={`2 Attendee(s)`}
    >
      <ul>
        <li styleName="email">{hostName}</li>
        <li styleName="email">{guestName}</li>
      </ul>
    </Accordion>
  );
}

PrevInterviewItem.propTypes = {
  date: PT.string.isRequired,
  round: PT.number.isRequired,
  hostName: PT.string.isRequired,
  guestName: PT.string.isRequired,
};

export default PrevInterviewItem;
