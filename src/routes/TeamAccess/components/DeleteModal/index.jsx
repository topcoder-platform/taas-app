import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";
import BaseModal from "components/BaseModal";
import Button from "components/Button";
import { removeTeamMember, removeInvite } from "../../actions";
import "./styles.module.scss";
import CenteredSpinner from "components/CenteredSpinner";

const MEMBER_TITLE = "You're about to delete a member from the team";
const INVITE_TITLE = "You're about to remove an invitation";

const DELETE_MEMBER_TITLE = "Deleting Member...";
const DELETE_INVITE_TITLE = "Deleting Invite...";

function DeleteModal({ selected, open, onClose, teamId, isInvite }) {
  const [loading, setLoading] = useState(false);

  let handle;
  if (selected) {
    if (selected.handle) {
      handle = selected.handle;
    } else {
      handle = selected.email;
    }
  }

  let deleteTitle = DELETE_MEMBER_TITLE;
  if (isInvite) deleteTitle = DELETE_INVITE_TITLE;

  const dispatch = useDispatch();

  const deleteMember = useCallback(() => {
    setLoading(true);
    if (!isInvite) {
      dispatch(removeTeamMember(teamId, selected.id))
        .then(() => {
          setLoading(false);
          toastr.success(
            "Member Removed",
            `You have successfully removed ${handle} from the team`
          );
          onClose();
        })
        .catch((err) => {
          setLoading(false);
          toastr.error("Failed to Remove Member", err.message);
        });
    } else {
      dispatch(removeInvite(teamId, selected.id))
        .then(() => {
          setLoading(false);
          toastr.success(
            "Invite Removed",
            `You have successfully removed invite for ${handle}`
          );
          onClose();
        })
        .catch((err) => {
          setLoading(false);
          toastr.error("Failed to Remove Invite", err.message);
        });
    }
  }, [dispatch, selected, isInvite]);

  const displayText = useCallback(() => {
    if (isInvite) {
      return (
        "Once you cancel the invitation for " +
        handle +
        " they won't be able to access the project. " +
        "You will have to invite them again in order for them to gain access"
      );
    }
    return (
      "You are about to remove " +
      handle +
      " from your team. They will lose all rights to the project " +
      "and can't see or interact with it anymore. Do you still " +
      "want to remove the member?"
    );
  }, [selected, isInvite]);

  const button = (
    <Button
      type="warning"
      size="medium"
      onClick={() => deleteMember()}
      disabled={loading}
    >
      Remove {isInvite ? "invitation" : "member"}
    </Button>
  );

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={loading ? deleteTitle : isInvite ? INVITE_TITLE : MEMBER_TITLE}
      button={button}
      disabled={loading}
    >
      {loading ? <CenteredSpinner /> : <p>{displayText()}</p>}
    </BaseModal>
  );
}

export default DeleteModal;
