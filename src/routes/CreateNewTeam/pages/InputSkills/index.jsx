/**
 * Input Skills page
 * Page that user reaches after choosing to input job skills.
 *
 * Gets a project id from the router.
 *
 * Allows selecting a number of skills, searching for users
 * with those skills, and submitting a job requiring the skills.
 */
import React, { useCallback, useEffect, useState } from "react";
import { useData } from "hooks/useData";
import { navigate } from "@reach/router";
import { toastr } from "react-redux-toastr";
import PT from "prop-types";
import SkillsList from "./components/SkillsList";
import Completeness from "../../components/Completeness";
import "./styles.module.scss";
import { getSkills } from "services/skills";
import { setCurrentStage } from "utils/helpers";
import LoadingIndicator from "components/LoadingIndicator";
import SearchCard from "../../components/SearchCard";
import ResultCard from "../../components/ResultCard";
import { createJob } from "services/jobs";
import AddAnotherModal from "../../components/AddAnotherModal";
import withAuthentication from "../../../../hoc/withAuthentication";

function InputSkills({ projectId }) {
  const [stages, setStages] = useState([
    { name: "Input Skills", isCurrent: true },
    { name: "Search Member" },
    { name: "Overview of the Results" },
  ]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchState, setSearchState] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);

  const [skills, loadingError] = useData(getSkills);

  let searchTimer;

  const submitJob = () => {
    setSubmitDone(false);
    setModalOpen(true);
    createJob({
      projectId,
      title: `job-${Date()}`,
      skills: selectedSkills,
      numPositions: 1,
    })
      .then(() => {
        toastr.success("Job Submitted");
      })
      .catch((err) => {
        console.error(err);
        toastr.warning("Error Submitting Job");
      })
      .finally(() => {
        setSubmitDone(true);
      });
  };

  const addAnother = useCallback(() => {
    navigate(`/taas/myteams/createnewteam/${projectId}/roles`);
  }, [projectId]);

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

  // mocked search for users with given skills
  const search = () => {
    setSearchState("searching");
    setCurrentStage(1, stages, setStages);
    searchTimer = setTimeout(() => {
      setSearchState("done");
      setCurrentStage(2, stages, setStages);
    }, 3000);
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
        extraStyleName="input-skills"
        onClick={search}
        buttonLabel="Search"
        stages={stages}
        percentage="26"
      />
    </div>
  ) : searchState === "searching" ? (
    <div styleName="page">
      <SearchCard />
      <Completeness
        extraStyleName="input-skills"
        isDisabled
        buttonLabel="Submit Request"
        stages={stages}
        percentage="52"
      />
    </div>
  ) : (
    <div styleName="page">
      <ResultCard />
      <Completeness
        buttonLabel="Submit Request"
        extraStyleName="input-skills"
        stages={stages}
        percentage="98"
        onClick={submitJob}
      />
      <AddAnotherModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        submitDone={submitDone}
        addAnother={addAnother}
      />
    </div>
  );
}

InputSkills.propTypes = {
  projectId: PT.string,
};

export default withAuthentication(InputSkills);
