/**
 * Input Skills page
 * Page that user reaches after choosing to input job skills.
 *
 * Gets location state from the router.
 *
 * Allows selecting a number of skills, searching for users
 * with those skills, and submitting a job requiring the skills.
 */
import React, { useCallback, useState } from "react";
import PT from "prop-types";
import { useData } from "hooks/useData";
import SkillsList from "./components/SkillsList";
import { getSkills } from "services/skills";
import LoadingIndicator from "components/LoadingIndicator";
import SearchContainer from "../../components/SearchContainer";

function InputSkills({ location: { state: locationState } }) {
  const [stages, setStages] = useState([
    { name: "Input Skills", isCurrent: true },
    { name: "Search Member" },
    { name: "Overview of the Results" },
  ]);
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

  if (!Array.isArray(skills)) {
    return <LoadingIndicator error={loadingError} />;
  }

  if (skills.length === 0) {
    return <p style={{ textAlign: "center" }}>Failed to load skills</p>;
  }

  return (
    <SearchContainer
      stages={stages}
      setStages={setStages}
      isCompletenessDisabled={selectedSkills.length < 1}
      searchObject={{ skills: selectedSkills }}
      completenessStyle="input-skills"
      locationState={locationState}
    >
      <SkillsList
        skills={skills}
        selectedSkills={selectedSkills}
        toggleSkill={toggleSkill}
      />
    </SearchContainer>
  );
}

InputSkills.propTypes = {
  locationState: PT.object,
};

export default InputSkills;
