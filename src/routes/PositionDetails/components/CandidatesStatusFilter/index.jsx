/**
 * CandidatesStatusFilter
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";
import _ from "lodash";
import Button from "components/Button";
import {
  CANDIDATE_STATUS,
  CANDIDATE_STATUS_FILTERS,
  CANDIDATE_STATUS_TO_TEXT,
} from "constants";

const CandidatesStatusFilter = ({ currentStatus, onChange, candidates }) => {
  return (
    <div styleName="candidates-status-filter">
      {CANDIDATE_STATUS_FILTERS.map((status) => (
        <Button
          key={status}
          type={currentStatus === status ? "segment-selected" : "segment"}
          onClick={() => onChange(status)}
        >
          {CANDIDATE_STATUS_TO_TEXT[status]} (
          {_.filter(candidates, { status }).length})
        </Button>
      ))}
    </div>
  );
};

CandidatesStatusFilter.propTypes = {
  currentStatus: PT.oneOf(Object.values(CANDIDATE_STATUS)),
  onChange: PT.func,
  candidates: PT.arrayOf(
    PT.shape({
      status: PT.oneOf(Object.values(CANDIDATE_STATUS)),
    })
  ),
};

export default CandidatesStatusFilter;
