import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { closeReport, submitReport } from "./actions";
import BaseModal from "components/BaseModal"
import TextArea from "components/TextArea"
import Button from "../Button";

function ReportPopup() {

  const {isOpen, teamName, memberHandle } = useSelector(state => state.reportPopup);

  const dispatch = useDispatch();
  const [textVal, setTextVal] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const button = <Button onClick={() => closeModal()} size="medium" >Submit</Button>

  const closeModal = useCallback(() => {
    dispatch(closeReport());
  }, [dispatch])

  return (
    <BaseModal 
      open={isOpen} 
      onClose={closeModal} 
      title={`Issue Report - ${teamName}${memberHandle ? " - " + memberHandle : ""}`} button={button} disabled={isDisabled}>
      <TextArea value={textVal} onChange={setTextVal}placeholder="Describe your issue" />
    </BaseModal> 
  )
}

export default ReportPopup;