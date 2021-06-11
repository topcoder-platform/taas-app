/**
 * Input Job Description page
 *
 */
import React, { useCallback, useEffect, useState } from "react";
import { useData } from "hooks/useData";
import { navigate } from "@reach/router";
import { toastr } from "react-redux-toastr";
import { setCurrentStage } from "utils/helpers";
import Page from "components/Page";
import PT from "prop-types";
import PageHeader from "components/PageHeader";
import LoadingIndicator from "components/LoadingIndicator";
import MarkdownEditor from "../../../../components/MarkdownEditor";
import { getSkillsByJobDescription } from "../../../../services/teams";
import Completeness from "../../components/Completeness";
import { getSkills } from "services/skills";
import { sendRoleSearchRequest } from "services/teams";
import SearchCard from "../../components/SearchCard";
import ResultCard from "../../components/ResultCard";
import NoMatchingProfilesResultCard from "../../components/NoMatchingProfilesResultCard";
import AddAnotherModal from "../../components/AddAnotherModal";
import "./styles.module.scss";
import AddedRolesAccordion from "../../components/AddedRolesAccordion";
import IconOfficeFileText from "../../../../assets/images/icon-office-file-text.svg";

function InputJobDescription() {
  const [stages, setStages] = useState([
    { name: "Input Job Desccription", isCurrent: true },
    { name: "Search Member" },
    { name: "Overview of the Results" },
  ]);
  const [roleSearchResult, setRoleSearchResult] = useState(null);
  const [addedRoles, setAddedRoles] = useState([]);
  const [
    previousRoleSearchRequestId,
    setPreviousRoleSearchRequestId,
  ] = useState(null);
  const [jdString, setJdString] = useState("");
  const [matchingProfiles, setMatchingProfiles] = useState(null);
  const [searchState, setSearchState] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);
  const [skills, setSkills] = useState([]);

  const addAnother = useCallback(() => {
    // navigate(`/taas/myteams/createnewteam/${projectId}/role`);
  }, []);

  const submitJob = () => {
    setSubmitDone(false);
    setModalOpen(true);
    setTimeout(() => {
      setSubmitDone(true);
    }, 3000);
  };

  const search = useCallback(() => {
    setCurrentStage(1, stages, setStages);
    setSearchState("searching");
    sendRoleSearchRequest({
      jobDescription: jdString,
      previousRoleSearchRequestId,
    })
      .then(({ data }) => {
        setRoleSearchResult(data);
        setPreviousRoleSearchRequestId(data.roleSearchRequestId);
        setCurrentStage(2, stages, setStages);
        setMatchingProfiles(null); // display no matching profiles screen for a while
        if (data.name && data.name.toLowerCase() !== "niche") {
          setMatchingProfiles(true);
          setAddedRoles((addedRoles) => [
            ...addedRoles,
            { id: data.id, name: data.name },
          ]);
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
  }, [jdString]);

  const onEditChange = useCallback((value) => {
    setJdString(value);
  }, []);

  return (
    <div>
      {!searchState ? (
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

        <div styleName="right-side">
          {addedRoles.length > 0 && (
            <AddedRolesAccordion addedRoles={addedRoles} />
          )}
          <Completeness
            extraStyleName="input-job-description"
            isDisabled={jdString.length < 10}
            stages={stages}
            onClick={search}
            buttonLabel="Search"
            percentage="26"
          />
        </div>
        </div>
      ) : searchState === "searching" ? (
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
      ) : (
        <div styleName="page">
          {matchingProfiles ? (
            <ResultCard {...roleSearchResult} />
          ) : (
            <NoMatchingProfilesResultCard
              {...roleSearchResult}
              onSearch={search}
            />
          )}

        <div styleName="right-side">
          {addedRoles.length > 0 && (
            <AddedRolesAccordion addedRoles={addedRoles} />
          )}
          <Completeness
            extraStyleName="input-job-description"
            stages={stages}
            buttonLabel="Submit Request"
            percentage="92"
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
      )}
    </div>
  );
}

InputJobDescription.propTypes = {
  projectId: PT.string,
};

export default InputJobDescription;
