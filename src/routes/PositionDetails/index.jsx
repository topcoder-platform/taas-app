/**
 * PositionDetails
 *
 * Page for the list of candidates for position.
 */
import React, { useCallback, useEffect, useState } from "react";
import PT from "prop-types";
import Page from "components/Page";
import LoadingIndicator from "components/LoadingIndicator";
import PageHeader from "components/PageHeader";
import {
  CANDIDATE_STATUS_FILTER_KEY,
  CANDIDATE_STATUS_FILTERS,
} from "constants";
import withAuthentication from "../../hoc/withAuthentication";
import PositionCandidates from "./components/PositionCandidates";
import CandidatesStatusFilter from "./components/CandidatesStatusFilter";
import { useTeamPositionsState } from "./hooks/useTeamPositionsState";
import "./styles.module.scss";

const inReviewStatusFilter = _.find(CANDIDATE_STATUS_FILTERS, {
  key: CANDIDATE_STATUS_FILTER_KEY.TO_REVIEW,
});

const PositionDetails = ({ teamId, positionId }) => {
  // by default show "interested" tab
  const [candidateStatusFilterKey, setCandidateStatusFilterKey] = useState(
    CANDIDATE_STATUS_FILTER_KEY.INTERESTED
  );
  const {
    state: { position, error },
    updateCandidate,
  } = useTeamPositionsState(teamId, positionId);

  const onCandidateStatusChange = useCallback(
    (statusFilter) => {
      setCandidateStatusFilterKey(statusFilter.key);
    },
    [setCandidateStatusFilterKey]
  );

  // if there are some candidates to review, then show "To Review" tab by default
  useEffect(() => {
    if (
      position &&
      _.filter(position.candidates, (candidate) =>
        inReviewStatusFilter.statuses.includes(candidate.status)
      ).length > 0
    ) {
      setCandidateStatusFilterKey(CANDIDATE_STATUS_FILTER_KEY.TO_REVIEW);
    }
  }, [position]);

  return (
    <Page title="Job Details">
      {!position ? (
        <LoadingIndicator error={error} />
      ) : (
        <>
          <PageHeader
            title={position.title}
            backTo={`/taas/myteams/${teamId}`}
            aside={
              <CandidatesStatusFilter
                onChange={onCandidateStatusChange}
                statusFilterKey={candidateStatusFilterKey}
                candidates={position.candidates}
              />
            }
          />
          <PositionCandidates
            position={position}
            statusFilterKey={candidateStatusFilterKey}
            updateCandidate={updateCandidate}
          />
        </>
      )}
    </Page>
  );
};

PositionDetails.propTypes = {
  teamId: PT.string,
  positionId: PT.string,
};

export default withAuthentication(PositionDetails);
