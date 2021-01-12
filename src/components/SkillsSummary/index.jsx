/**
 * SkillsSummary
 *
 * Shows skills list with percentage of matched skills,
 */
import React from "react";
import PT from "prop-types";
import _ from "lodash";
import PercentageBar from "components/PercentageBar";
import SkillsList from "components/SkillsList";
import "./styles.module.scss";

const SkillsSummary = ({ skills, requiredSkills = [], limit }) => {
  const skillsMatched = _.intersectionBy(skills, requiredSkills, "id");
  const skillsMatchedRatio =
    requiredSkills.length > 0
      ? skillsMatched.length / requiredSkills.length
      : 1;

  return (
    <div>
      <div styleName="percentage">
        <PercentageBar ratio={skillsMatchedRatio} styleName="percentage-bar" />
        {Math.round(skillsMatchedRatio * 100)}% skill matched
      </div>
      <SkillsList
        skills={skills}
        requiredSkills={requiredSkills}
        limit={limit}
      />
    </div>
  );
};

const skillShape = PT.shape({
  id: PT.string,
  name: PT.string,
});

SkillsSummary.propTypes = {
  skills: PT.arrayOf(skillShape),
  requiredSkills: PT.arrayOf(skillShape),
  limit: PT.number,
};

export default SkillsSummary;
