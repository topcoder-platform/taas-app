import Input from "components/Input";
import PageHeader from "components/PageHeader";
import React from "react";
import "./styles.module.scss";

function SkillsList() {
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
    </div>
  );
}

export default SkillsList;
