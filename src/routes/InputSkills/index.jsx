import React from "react";
import SkillsList from "./components/SkillsList";
import Completeness from "./components/Completeness";
import "./styles.module.scss";

function InputSkills() {
  return (
    <div styleName="page">
      <SkillsList />
      <Completeness />
    </div>
  );
}

export default InputSkills;
