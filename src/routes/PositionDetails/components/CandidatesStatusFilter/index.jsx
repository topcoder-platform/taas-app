/**
 * CandidatesStatusFilter
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";
import _ from "lodash";
import Button from "components/Button";
import Badge from "components/Badge";
import {
  CANDIDATE_STATUS,
  CANDIDATE_STATUS_FILTERS,
  CANDIDATE_STATUS_FILTER_KEY,
} from "constants";

const CandidatesStatusFilter = ({ statusFilterKey, onChange, candidates }) => {
  return (
    <div styleName="candidates-status-filter">
      {CANDIDATE_STATUS_FILTERS.map((statusFilter) => {
        const count = _.filter(candidates, (candidate) => statusFilter.statuses.includes(candidate.status)).length;

        return (
          <Button
            key={statusFilter.key}
            type={statusFilterKey === statusFilter.key ? "segment-selected" : "segment"}
            onClick={() => onChange(statusFilter)}
          >
            {statusFilter.buttonText} (
            {count})
            {statusFilter.key === CANDIDATE_STATUS_FILTER_KEY.TO_REVIEW && count > 0 && (
              <Badge type="danger">Pending</Badge>
            )}
          </Button>
        )
    })}
    </div>
  );
};

CandidatesStatusFilter.propTypes = {
  statusFilterKey: PT.oneOf(Object.values(CANDIDATE_STATUS_FILTER_KEY)),
  onChange: PT.func,
  candidates: PT.arrayOf(
    PT.shape({
      status: PT.oneOf(Object.values(CANDIDATE_STATUS)),
    })
  ),
};

export default CandidatesStatusFilter;
