/**
 * PositionDetails
 *
 * Page for the list of candidates for position.
 */
import React, { useCallback, useState } from "react";
import PT from "prop-types";
import LayoutContainer from "components/LayoutContainer";
import LoadingIndicator from "components/LoadingIndicator";
import PageHeader from "components/PageHeader";
import { CANDIDATE_STATUS_FILTER_KEY } from "constants";
import withAuthentication from "../../hoc/withAuthentication";
import PositionCandidates from "./components/PositionCandidates";
import CandidatesStatusFilter from "./components/CandidatesStatusFilter";
import { useTeamPositionsState } from "./hooks/useTeamPositionsState";
import "./styles.module.scss";

const PositionDetails = ({ teamId, positionId }) => {
  const [candidateStatusFilterKey, setCandidateStatusFilterKey] = useState(CANDIDATE_STATUS_FILTER_KEY.TO_REVIEW);
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

  return (
    <LayoutContainer>
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
    </LayoutContainer>
  );
};

PositionDetails.propTypes = {
  teamId: PT.string,
  positionId: PT.string,
};

export default withAuthentication(PositionDetails);
