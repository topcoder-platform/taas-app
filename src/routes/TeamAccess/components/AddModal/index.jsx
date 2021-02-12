import React from 'react'
import Button from "components/Button";
import BaseModal from "components/BaseModal";
import ReactSelect from "components/ReactSelect";

function AddModal({open, onClose}) {

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const inviteButton = (<Button
    type="primary"
    size="medium"
    onClick={() => console.log('You clicked invite')}
  >
    Invite
  </Button>)

  return (
    <BaseModal open={open} onClose={onClose} button={inviteButton} title="Invite more people">
      <ReactSelect 
        value="" 
        onChange={(e) => console.log(e)} 
        options={options} 
        isMulti={true}
        placeholder="Enter one or more user handles" 
      />
    </BaseModal>
  )
}

export default AddModal
