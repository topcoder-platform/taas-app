import React, { useCallback, useEffect, useState } from "react";
import SkillsList from "./components/SkillsList";
import Completeness from "./components/Completeness";
import "./styles.module.scss";
import { useData } from "hooks/useData";
import { getSkills } from "services/skills";
import LoadingIndicator from "components/LoadingIndicator";
import SearchCard from "./components/SearchCard";

function InputSkills() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchState, setSearchState] = useState("done");
  const [skills, loadingError] = useData(getSkills);

  let searchTimer;

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

  const search = () => {
    setSearchState("searching");
    searchTimer = setTimeout(() => {
      setSearchState("done");
    }, 2000);
  };

  useEffect(() => clearTimeout(searchTimer));

  return !skills ? (
    <LoadingIndicator error={loadingError} />
  ) : !searchState ? (
    <div styleName="page">
      <SkillsList
        skills={skills}
        selectedSkills={selectedSkills}
        toggleSkill={toggleSkill}
      />
      <Completeness
        isDisabled={selectedSkills.length < 1}
        onClick={search}
        buttonLabel="Search"
        stage={1}
      />
    </div>
  ) : searchState === "searching" ? (
    <div styleName="page">
      <SearchCard />
      <Completeness isDisabled buttonLabel="Submit Request" stage={2} />
    </div>
  ) : (
    <div>Done!</div>
  );
}

export default InputSkills;
