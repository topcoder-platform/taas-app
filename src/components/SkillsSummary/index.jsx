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

const SkillsSummary = ({ skills, skillMatched, limit }) => {
  return (
    <div>
      <div styleName="percentage">
        <PercentageBar ratio={skillMatched / 100} styleName="percentage-bar" />
        {Math.round(skillMatched)}% skill matched
      </div>
      <SkillsList
        skills={skills}
        limit={limit}
        showMatches
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
  limit: PT.number,
  skillMatched: PT.number,
};

export default SkillsSummary;
