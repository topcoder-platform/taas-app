/**
 * TeamAccess
 *
 * Page for reviewing, adding and removing team members.
 * It gets `teamId` from the router.
 * It fetches `teamMembers` and `invitees` from api.
 */
import React from "react";
import PT from "prop-types";
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import { useData } from "hooks/useData";
import { getTeamMembers, getTeamInvitees } from "services/teams";
import LoadingIndicator from "components/LoadingIndicator";
import withAuthentication from "../../hoc/withAuthentication";
import MemberList from "./components/MemberList";

const MyTeamsDetails = ({ teamId }) => {

  const [teamMembers, memberLoadingError] = useData(getTeamMembers, teamId);
  const [teamInvitees, inviteeLoadingError] = useData(getTeamInvitees, teamId);

  return (
    <Page title="Manage Access">
      {!teamMembers || !teamInvitees ? (
        <LoadingIndicator error={memberLoadingError} />
      ) : (
        <>
          <PageHeader title="Manage Access" backTo={`/taas/myteams/${teamId}`} />
          <MemberList teamId={teamId} members={teamMembers} invitees={teamInvitees} />
        </>
      )}
    </Page>
  );
};

MyTeamsDetails.propTypes = {
  teamId: PT.string,
};

export default withAuthentication(MyTeamsDetails);