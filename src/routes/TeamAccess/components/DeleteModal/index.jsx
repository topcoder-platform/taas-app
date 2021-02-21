import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";
import BaseModal from "components/BaseModal";
import Button from "components/Button";
import { removeTeamMember } from "../../actions";
import "./styles.module.scss";
import CenteredSpinner from "components/CenteredSpinner";

const MEMBER_TITLE = "You're about to delete a member from the team";

const DELETE_MEMBER_TITLE = "Deleting Member...";

function DeleteModal({ selected, open, onClose, teamId }) {
  const [loading, setLoading] = useState(false);

  let handle;
  if (selected) {
    if (selected.handle) {
      handle = selected.handle;
    } else {
      handle = selected.email;
    }
  }

  const dispatch = useDispatch();

  const deleteMember = useCallback(() => {
    setLoading(true);
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
  }, [dispatch, selected]);

  const displayText = useCallback(() => {
    return (
      "You are about to remove " +
      handle +
      " from your team. They will lose all rights to the project " +
      "and can't see or interact with it anymore. Do you still " +
      "want to remove the member?"
    );
  }, [selected]);

  const button = (
    <Button
      type="warning"
      size="medium"
      onClick={() => deleteMember()}
      disabled={loading}
    >
      Remove member
    </Button>
  );

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={loading ? DELETE_MEMBER_TITLE : MEMBER_TITLE}
      button={button}
      disabled={loading}
    >
      {loading ? <CenteredSpinner /> : <p>{displayText()}</p>}
    </BaseModal>
  );
}

export default DeleteModal;
