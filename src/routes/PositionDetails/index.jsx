/**
 * PositionDetails
 *
 * Page for the list of candidates for position.
 */
import React, { useCallback, useState } from "react";
import PT from "prop-types";
import Page from "components/Page";
import LoadingIndicator from "components/LoadingIndicator";
import PageHeader from "components/PageHeader";
import { CANDIDATE_STATUS } from "constants";
import withAuthentication from "../../hoc/withAuthentication";
import PositionCandidates from "./components/PositionCandidates";
import CandidatesStatusFilter from "./components/CandidatesStatusFilter";
import { useTeamPositionsState } from "./hooks/useTeamPositionsState";
import "./styles.module.scss";

const PositionDetails = ({ teamId, positionId }) => {
  const [candidateStatus, setCandidateStatus] = useState(CANDIDATE_STATUS.OPEN);
  const {
    state: { position, error },
    updateCandidate,
  } = useTeamPositionsState(teamId, positionId);

  const onCandidateStatusChange = useCallback(
    (status) => {
      setCandidateStatus(status);
    },
    [setCandidateStatus]
  );

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
                currentStatus={candidateStatus}
                candidates={position.candidates}
              />
            }
          />
          <PositionCandidates
            position={position}
            candidateStatus={candidateStatus}
            updateCandidate={updateCandidate}
            teamId={teamId}
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
