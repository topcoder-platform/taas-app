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
import SearchableList from "../../components/SearchableList";
import SkillItem from "./components/SkillItem";
import Completeness from "../../components/Completeness";
import "./styles.module.scss";
import { getSkills } from "services/skills";
import { sendRoleSearchRequest } from "services/teams";
import { setCurrentStage } from "utils/helpers";
import LoadingIndicator from "components/LoadingIndicator";
import SearchCard from "../../components/SearchCard";
import ResultCard from "../../components/ResultCard";
import NoMatchingProfilesResultCard from "../../components/NoMatchingProfilesResultCard";
import { createJob } from "services/jobs";
import AddAnotherModal from "../../components/AddAnotherModal";
import AddedRolesAccordion from "../../components/AddedRolesAccordion";

function InputSkills({ projectId }) {
  const [stages, setStages] = useState([
    { name: "Input Skills", isCurrent: true },
    { name: "Search Member" },
    { name: "Overview of the Results" },
  ]);
  const [
    previousRoleSearchRequestId,
    setPreviousRoleSearchRequestId,
  ] = useState(null);
  const [roleSearchResult, setRoleSearchResult] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [matchingProfiles, setMatchingProfiles] = useState(null);
  const [searchState, setSearchState] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);
  const [addedRoles, setAddedRoles] = useState([]);

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
      setPreviousRoleSearchRequestId(null);
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

  const search = useCallback(() => {
    setCurrentStage(1, stages, setStages);
    setSearchState("searching");
    sendRoleSearchRequest({
      skills: selectedSkills,
      previousRoleSearchRequestId,
    })
      .then(({ data }) => {
        setRoleSearchResult(data);
        setPreviousRoleSearchRequestId(data.roleSearchRequestId);
        setCurrentStage(2, stages, setStages);
        setMatchingProfiles(null); // display no matching profiles screen for a while
        if (data.name && data.name.toLowerCase() !== "niche") {
          setAddedRoles((addedRoles) => [
            ...addedRoles,
            { id: data.id, name: data.name },
          ]);
          setMatchingProfiles(true);
        } else {
          setMatchingProfiles(false);
        }
        setSearchState("done");
      })
      .catch((e) => {
        setCurrentStage(2, stages, setStages);
        setMatchingProfiles(false); // display no matching profiles screen for a while
        setSearchState("done");
      });
  }, [selectedSkills]);

  return !skills ? (
    <LoadingIndicator error={loadingError} />
  ) : !searchState ? (
    <div styleName="page">
      <SearchableList
        itemList={skills}
        title="Input Skills"
        inputPlaceholder="Find skills or technologies.."
        countElement={
          selectedSkills.length > 0 && (
            <p styleName="skill-count">
              {selectedSkills.length} skills selected
            </p>
          )
        }
        renderItem={({ id, name }) => {
          return (
            <SkillItem
              id={id}
              key={id}
              name={name}
              onClick={toggleSkill}
              isSelected={selectedSkills.includes(id)}
            />
          );
        }}
      />
      {addedRoles.length > 0 && <AddedRolesAccordion addedRoles={addedRoles} />}
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
      {matchingProfiles ? (
        <ResultCard {...roleSearchResult} />
      ) : (
        <NoMatchingProfilesResultCard {...roleSearchResult} onSearch={search} />
      )}
        <div styleName="right-side">
          {addedRoles.length > 0 && (
            <AddedRolesAccordion addedRoles={addedRoles} />
          )}
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
    </div>
  );
}

InputSkills.propTypes = {
  projectId: PT.string,
};

export default InputSkills;
