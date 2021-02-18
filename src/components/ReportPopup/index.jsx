import React from 'react'
import PropTypes from 'prop-types'
import BaseModal from "components/BaseModal"
import TextArea from "components/TextArea"
import Button from "../Button";

function ReportPopup(props) {
  const {} = props

  const onClose = () => console.log("close the modal");

  const title = "Issue Report - BLAHAH"

  const button = <Button onClick={onClose} size="medium" isSubmit >Submit</Button>

  const isDisabled = false;

  const textVal = '';

  return (
    <BaseModal open={true} onClose={onClose} title={title} button={button} disabled={isDisabled}>
      <TextArea value={textVal} placeholder="Describe your issue" />
    </BaseModal> 
  )
}

ReportPopup.propTypes = {

}

export default ReportPopup
