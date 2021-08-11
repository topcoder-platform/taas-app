/**
 * Temporary Popup for skill list
 * show skill list
 */
import React, { useCallback } from "react";
import { MAX_SELECTED_SKILLS } from "constants";
import _ from "lodash";
import PT from "prop-types";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import IconSingleManAdd from "../../../../assets/images/icon-single-man-add.svg";
import "./styles.module.scss";
import BaseCreateModal from "../BaseCreateModal";

function SkillListPopup({
  page,
  open,
  skills,
  selectedSkills,
  setSelectedSkills,
  isLoading,
  loadingTxt,
  onClose,
  onContinueClick,
}) {
  const title = page === "jd" ? "Identified Skills" : "Selected Skills";
  const subTitle =
    page === "jd"
      ? `Topcoder has identified the following skills referenced in your job description. Select the ${MAX_SELECTED_SKILLS} skills most important to be successful in the job. These skills will be weighted more heavily in matching.`
      : `You have chosen the following skills in your request. Please select the ${MAX_SELECTED_SKILLS} skills most important to be successful in the job. These skills will be weighted more heavily in matching.`;
  const skillsNotFoundTxt = "No skills are found in your Job Description";

  const toggleSkill = useCallback(
    (skillId) => {
      const skillIdx = selectedSkills.indexOf(skillId);
      setSelectedSkills((skills) =>
        skillIdx > -1
          ? [...skills.slice(0, skillIdx), ...skills.slice(skillIdx + 1)]
          : [...skills, skillId]
      );
    },
    [selectedSkills, setSelectedSkills]
  );
  const Buttons = (
    <>
      <Button type="secondary" size="medium" onClick={onClose}>
        {page === "jd" ? "Edit Job Description" : "Edit Skill Selections"}
      </Button>
      <Button
        disabled={isLoading || !selectedSkills.length}
        type="primary"
        size="medium"
        styleName="continue-button"
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
      title={title}
      subtitle={skills.length ? subTitle : skillsNotFoundTxt}
      isLoading={isLoading}
      loadingMessage={loadingTxt || "Loading..."}
      maxWidth="560px"
      buttons={Buttons}
    >
      <ul styleName="list">
        {_.map(skills, (s) => {
          return (
            <li>
              <Checkbox
                checked={selectedSkills.includes(s.id)}
                disabled={
                  selectedSkills.length === MAX_SELECTED_SKILLS &&
                  !selectedSkills.includes(s.id)
                }
                onClick={() => toggleSkill(s.id)}
                label={s.tag || s.name}
                checkmarkFloat="right"
              />
            </li>
          );
        })}
      </ul>
      {selectedSkills.length === MAX_SELECTED_SKILLS &&
        selectedSkills.length !== skills.length && (
          <p styleName="max-selection">
            You can select up to {MAX_SELECTED_SKILLS} skills.
          </p>
        )}
    </BaseCreateModal>
  );
}

SkillListPopup.propTypes = {
  page: PT.oneOf(["jd", "skills"]),
  open: PT.bool,
  onClose: PT.func,
  isLoading: PT.bool,
  loadingTxt: PT.string,
  onContinueClick: PT.func,
  skills: PT.arrayOf(PT.shape()),
};

export default SkillListPopup;
