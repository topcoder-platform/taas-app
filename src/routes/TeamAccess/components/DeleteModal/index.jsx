import React from 'react'
import BaseModal from "components/BaseModal";
import Button from "components/Button";

function DeleteModal({open, onClose}) {

  const button = (
    <Button 
      type="warning" 
      size="medium" 
      onClick={() => console.log("deleted an invite")}
    >
      Remove invitation
    </Button> 
  )

  return (
    <BaseModal open={open} onClose={onClose} title="You're about to remove an invitation" button={button}>
      <p>Once you cancel the invitation for handle they won't be able to access the project. You will have to invite them again in order for them to gain access</p>
    </BaseModal>
  )
}

export default DeleteModal
