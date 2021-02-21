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
import LoadingIndicator from "components/LoadingIndicator";
import withAuthentication from "../../hoc/withAuthentication";
import MemberList from "./components/MemberList";
import { useTeamMembers } from "./hooks/useTeamMembers";

const TeamAccess = ({ teamId }) => {
  const {
    state: { members, invites, error },
  } = useTeamMembers(teamId);

  return (
    <Page title="Manage Access">
      {!members || !invites ? (
        <LoadingIndicator error={error} />
      ) : (
        <>
          <PageHeader
            title="Manage Access"
            backTo={`/taas/myteams/${teamId}`}
          />
          <MemberList teamId={teamId} members={members} invitees={invites} />
        </>
      )}
    </Page>
  );
};

TeamAccess.propTypes = {
  teamId: PT.string,
};

export default withAuthentication(TeamAccess);
