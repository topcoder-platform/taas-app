/**
 * Temporary Popup for skill list
 * show skill list
 */
import React from "react";
import _ from "lodash";
import PT from "prop-types";
import Button from "components/Button";
import IconSingleManAdd from "../../../../../../assets/images/icon-single-man-add.svg";
import "./styles.module.scss";
import BaseCreateModal from "../../../../components/BaseCreateModal";

function SkillListPopup({ open, skills, isLoading, onClose, onContinueClick }) {
  const Buttons = (
    <>
      <Button type="secondary" size="medium" onClick={onClose}>
        Edit Job Description
      </Button>
      <Button
        disabled={isLoading || !skills.length}
        type="primary"
        size="medium"
        onClick={onContinueClick}
      >
        Continue
      </Button>
    </>
  );

  return (
    <BaseCreateModal
      open={open}
      onClose={onClose}
      headerIcon={<IconSingleManAdd />}
      title="Skills"
      subtitle={
        skills.length
          ? "These skills are found in your Job Description"
          : "No skills are found in your Job Description"
      }
      isLoading={isLoading}
      loadingMessage="Loading skills..."
      maxWidth="460px"
      buttons={Buttons}
    >
      <div>
        {_.map(skills, (s) => {
          return <div>{s.tag}</div>;
        })}
      </div>
    </BaseCreateModal>
  );
}

SkillListPopup.propTypes = {
  open: PT.bool,
  onClose: PT.func,
  isLoading: PT.bool,
  onContinueClick: PT.func,
  skills: PT.arrayOf(PT.shape()),
};

export default SkillListPopup;
