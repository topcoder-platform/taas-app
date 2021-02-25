import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import BaseModal from "components/BaseModal";
import Button from "components/Button";
import { removeTeamMember } from "../../actions";
import CenteredSpinner from "components/CenteredSpinner";

const getTitle = (isSelf) =>
  isSelf
    ? "You're about to leave the team"
    : "You're about to delete a member from the team";

const getDeletingTitle = (isSelf) =>
  isSelf ? "Leaving Team..." : "Deleting Member...";

const getText = (isSelf, userHandleOrEmail) =>
  isSelf
    ? `You are about to remove yourself from the team. You might lose
    access to the team and couldn't see or interact with it anymore. Do
    you still want to leave the team?`
    : `You are about to remove ${userHandleOrEmail} from your team. They might lose all
access to the team and couldn't see or interact with it anymore. Do
you still want to remove the member?`;

const getSuccessTitle = (isSelf) =>
  isSelf ? "Team Left" : "Member Removed";

const getSuccessText = (isSelf, userHandleOrEmail) =>
  isSelf ? "You have successfully left the team" : `You have successfully removed ${userHandleOrEmail} from the team`;

const getFailedTitle = (isSelf) =>
  isSelf ? "Failed to Leave the Team" : "Failed to Remove Member";

const getDeleteButtonText = (isSelf) =>
  isSelf ? "Leave Team" : "Remove Member";

function DeleteModal({ selected, open, onClose, teamId }) {
  const [loading, setLoading] = useState(false);
  const { userId } = useSelector((state) => state.authUser);

  const isSelf = useMemo(() => selected && selected.userId === userId, [selected, userId]);
  const userHandleOrEmail = useMemo(() => {
    if (selected) {
      return selected.handle ? selected.handle : selected.email;
    }
  }, [selected]);

  const dispatch = useDispatch();

  const deleteMember = useCallback(() => {
    setLoading(true);
    dispatch(removeTeamMember(teamId, selected.id))
      .then(() => {
        setLoading(false);
        toastr.success(
          getSuccessTitle(isSelf),
          getSuccessText(isSelf, userHandleOrEmail)
        );
        onClose();
        if (isSelf) {
          // redirect to the team list after leaving the team just in case if the current user lost access
          window.history.pushState({}, null, `/taas/myteams`);
        }
      })
      .catch((err) => {
        setLoading(false);
        toastr.error(getFailedTitle(isSelf), err.message);
      });
  }, [dispatch, selected, isSelf]);

  const button = (
    <Button
      type="warning"
      size="medium"
      onClick={deleteMember}
      disabled={loading}
    >
      {getDeleteButtonText(isSelf)}
    </Button>
  );

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={loading ? getDeletingTitle(isSelf) : getTitle(isSelf)}
      button={button}
      disabled={loading}
    >
      {loading ? (
        <CenteredSpinner />
      ) : (
        <p>{getText(isSelf, userHandleOrEmail)}</p>
      )}
    </BaseModal>
  );
}

export default DeleteModal;
