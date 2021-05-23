import React, { useCallback, useState } from "react";
import SkillsList from "./components/SkillsList";
import Completeness from "./components/Completeness";
import "./styles.module.scss";
import { useData } from "hooks/useData";
import { getSkills } from "services/skills";
import LoadingIndicator from "components/LoadingIndicator";

function InputSkills() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skills, loadingError] = useData(getSkills);

  const toggleSkill = useCallback(
    (id) => {
      if (selectedSkills.includes(id)) {
        setSelectedSkills(selectedSkills.filter((skill) => skill !== id));
      } else {
        setSelectedSkills(() => {
          return [...selectedSkills, id];
        });
      }
    },
    [selectedSkills]
  );

  return !skills ? (
    <LoadingIndicator error={loadingError} />
  ) : (
    <div styleName="page">
      <SkillsList
        skills={skills}
        selectedSkills={selectedSkills}
        toggleSkill={toggleSkill}
      />
      <Completeness isDisabled={selectedSkills.length < 1} />
    </div>
  );
}

export default InputSkills;
