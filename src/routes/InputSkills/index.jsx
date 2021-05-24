import React, { useCallback, useEffect, useState } from "react";
import SkillsList from "./components/SkillsList";
import Completeness from "./components/Completeness";
import "./styles.module.scss";
import { useData } from "hooks/useData";
import { getSkills } from "services/skills";
import LoadingIndicator from "components/LoadingIndicator";
import SearchCard from "./components/SearchCard";
import ResultCard from "./components/ResultCard";
import { createJob } from "services/jobs";
import { navigate } from "@reach/router";

function InputSkills({ projectId }) {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchState, setSearchState] = useState(null);
  const [skills, loadingError] = useData(getSkills);

  let searchTimer;

  const submitJob = () => {
    createJob({
      projectId,
      title: `job-${Date()}`,
      skills: selectedSkills,
      numPositions: 1,
    }).then(() => {
      navigate("/taas/myteams/createnewteam");
    });
  };

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
    <div styleName="page">
      <ResultCard />
      <Completeness
        buttonLabel="Submit Request"
        stage={3}
        onClick={submitJob}
      />
    </div>
  );
}

export default InputSkills;
