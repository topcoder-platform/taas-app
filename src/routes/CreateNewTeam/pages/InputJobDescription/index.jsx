/**
 * Input Job Description page
 *
 */
import React, { useCallback, useState } from "react";
import { setCurrentStage } from "utils/helpers";
import { navigate } from "@reach/router";
import PT from "prop-types";
import _ from "lodash";
import PageHeader from "components/PageHeader";
import MarkdownEditor from "../../../../components/MarkdownEditor";
import {
  getSkillsByJobDescription,
  searchRoles,
} from "../../../../services/teams";
import Completeness from "../../components/Completeness";
import SearchCard from "../../components/SearchCard";
import ResultCard from "../../components/ResultCard";
import AddAnotherModal from "../../components/AddAnotherModal";
import SkillListPopup from "./components/SkillListPopup";
import "./styles.module.scss";
import withAuthentication from "../../../../hoc/withAuthentication";
import NoMatchingProfilesResultCard from "../../components/NoMatchingProfilesResultCard";
import AddedRolesAccordion from "../SelectRole/components/AddedRolesAccordion";

function InputJobDescription() {
  const [stages, setStages] = useState([
    { name: "Input Job Description", isCurrent: true },
    { name: "Search Member" },
    { name: "Overview of the Results" },
  ]);
  const [jdString, setJdString] = useState("");
  const [searchState, setSearchState] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);
  const [skills, setSkills] = useState([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);
  const [matchingProfiles, setMatchingProfiles] = useState(null);
  const [addedRoles, setAddedRoles] = useState([]);

  const onSearch = useCallback(() => {
    setSkillModalOpen(true);
    setIsLoadingSkills(true);
    getSkillsByJobDescription(jdString)
      .then((response) => {
        setSkills(response.data);
        setIsLoadingSkills(false);
        setSkillModalOpen(true);
      })
      .catch(() => {
        setIsLoadingSkills(false);
      });
  }, [jdString]);

  const onConfirmationClick = useCallback(() => {
    setSearchState("searching");
    setCurrentStage(1, stages, setStages);
    setMatchingProfiles(null);

    searchRoles({ jobDescription: jdString })
      .then((res) => {
        const id = _.get(res, "data.id");
        const name = _.get(res, "data.name");
        const prevSearchId = _.get(res, "data.roleSearchRequestId");
        if (name && !name.toLowerCase().includes("niche")) {
          setMatchingProfiles(res.data);
          setAddedRoles((addedRoles) => [...addedRoles, { id, name }]);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setCurrentStage(2, stages, setStages);
        setSearchState("done");
      });
  }, [stages, jdString]);

  const addAnother = () => {
    navigate(`/taas/myteams/createnewteam/role`);
  };

  const submitJob = () => {
    setSubmitDone(false);
    setModalOpen(true);
    setTimeout(() => {
      setSubmitDone(true);
    }, 3000);
  };

  const onEditChange = useCallback((value) => {
    setJdString(value);
  }, []);

  if (!searchState) {
    return (
      <div styleName="page">
        <div styleName="edit-container">
          <PageHeader
            title="Input Job Description"
            backTo="/taas/myteams/createnewteam"
          />
          <MarkdownEditor
            height="482px"
            placeholder="input job description"
            onChange={onEditChange}
          />
        </div>
        <Completeness
          extraStyleName="input-job-description"
          isDisabled={jdString.length < 10}
          stages={stages}
          onClick={onSearch}
          buttonLabel="Search"
          percentage="26"
        />
        <SkillListPopup
          open={skillModalOpen}
          skills={skills}
          onClose={() => setSkillModalOpen(false)}
          isLoading={isLoadingSkills}
          onContinueClick={onConfirmationClick}
        />
      </div>
    );
  }
  if (searchState === "searching") {
    return (
      <div styleName="page">
        <SearchCard />
        <Completeness
          extraStyleName="input-job-description"
          isDisabled
          stages={stages}
          buttonLabel="Submit Request"
          percentage="52"
        />
      </div>
    );
  }

  if (searchState === "done") {
    return (
      <div styleName="page">
        {matchingProfiles ? (
          <ResultCard role={matchingProfiles} />
        ) : (
          <NoMatchingProfilesResultCard />
        )}
        <div styleName="right-side">
          {addedRoles.length && <AddedRolesAccordion addedRoles={addedRoles} />}
          <Completeness
            extraStyleName="input-job-description"
            stages={stages}
            buttonLabel="Submit Request"
            percentage={matchingProfiles ? 98 : 88}
            isDisabled={!matchingProfiles}
            onClick={submitJob}
          />
        </div>
        <AddAnotherModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          submitDone={submitDone}
          addAnother={addAnother}
        />
      </div>
    );
  }
}

InputJobDescription.propTypes = {
  projectId: PT.string,
};

export default InputJobDescription;
