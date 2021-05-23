import React from "react";
import Input from "components/Input";
import PageHeader from "components/PageHeader";
import "./styles.module.scss";
import SkillItem from "../SkillItem";

function SkillsList({ skills }) {
  return (
    <div styleName="skills-list">
      <PageHeader
        title="Input Skills"
        backTo="/taas/myteams/createnewteam"
        aside={
          <Input
            styleName="filter-input"
            placeholder="Find skills or technologies.."
          />
        }
      />
      <div styleName="skill-container">
        {skills.map((skill) => (
          <SkillItem id={skill.id} name={skill.name} />
        ))}
      </div>
    </div>
  );
}

export default SkillsList;
