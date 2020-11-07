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

const SkillsSummary = ({ skills, requiredSkills, limit }) => {
  const matchedSkills = _.intersection(skills, requiredSkills);
  const matchedRatio =
    requiredSkills.length > 0
      ? matchedSkills.length / requiredSkills.length
      : 1;

  return (
    <div>
      <div styleName="percentage">
        <PercentageBar ratio={matchedRatio} styleName="percentage-bar" />
        {Math.round(matchedRatio * 100)}% skill matched
      </div>
      <SkillsList
        skills={skills}
        requiredSkills={requiredSkills}
        limit={limit}
        showMatches
      />
    </div>
  );
};

SkillsSummary.propTypes = {
  skills: PT.arrayOf(PT.string),
  requiredSkills: PT.arrayOf(PT.string),
  limit: PT.number,
};

export default SkillsSummary;
