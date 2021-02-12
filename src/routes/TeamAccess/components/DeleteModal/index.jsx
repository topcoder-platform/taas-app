import React, { useCallback, useState } from 'react'
import { useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";
import Loader from "react-loader-spinner";
import BaseModal from "components/BaseModal";
import Button from "components/Button";
import { removeTeamMember } from "../../actions";
import "./styles.module.scss";

const MEMBER_TITLE = "You're about to delete a member from the team";
const INVITE_TITLE = "You're about to remove an invitation";


function DeleteModal({selected, open, onClose, teamId, isInvite}) {

  const [loading, setLoading] = useState(false);

  let handle;
  if (selected) {
    if (selected.handle) {
      handle = selected.handle
    } else {
      handle = selected.email
    }
  }

  const dispatch = useDispatch();

  const deleteMember = useCallback(() => {
    setLoading(true);
    if (!isInvite) {
      dispatch(removeTeamMember(teamId, selected.id))
        .then(() => {
          setLoading(false);
          toastr.success("Member Removed", `You have successfully removed ${handle} from the team`);
          onClose();
        })
        .catch(err => {
          setLoading(false);
          toastr.error("Failed to Remove Member", err.message);
        })
    } else {
      console.log("It's an invite!!!")
    }
  }, [dispatch, selected, isInvite]);

  const displayText = useCallback(() => {
    if (isInvite) {
      return ("Once you cancel the invitation for " + 
        handle + " they won't be able to access the project. " + 
        "You will have to invite them again in order for them to gain access")
    }
    return ("You are about to remove " + handle +
      " from your team. They will lose all rights to the project " +
      "and can't see or interact with it anymore. Do you still " +
      "want to remove the member?")
  }, [selected, isInvite])

  const button = (
    <Button 
      type="warning" 
      size="medium" 
      onClick={() => deleteMember()}
      disabled={loading}
    >
      Remove {isInvite ? "invitation" : "member"}
    </Button> 
  )

  return (
    <BaseModal open={open} onClose={onClose} title={isInvite ? INVITE_TITLE : MEMBER_TITLE} button={button} disabled={loading}>
      {loading ? <div styleName="loader-container"><Loader type="TailSpin" color="#00BFFF" height={80} width={80} /></div> : <p>{displayText()}</p>}
    </BaseModal>
  )
}

export default DeleteModal
