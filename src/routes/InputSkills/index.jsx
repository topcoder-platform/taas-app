import React from "react";
import SkillsList from "./components/SkillsList";
import Completeness from "./components/Completeness";
import "./styles.module.scss";
import { useData } from "hooks/useData";
import { getSkills } from "services/skills";
import LoadingIndicator from "components/LoadingIndicator";

function InputSkills() {
  const [skills, loadingError] = useData(getSkills);

  return !skills ? (
    <LoadingIndicator error={loadingError} />
  ) : (
    <div styleName="page">
      <SkillsList skills={skills} />
      <Completeness />
    </div>
  );
}

export default InputSkills;
