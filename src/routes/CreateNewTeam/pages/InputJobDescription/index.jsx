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
import SearchCard from "../../components/SearchCard";
import ResultCard from "../../components/ResultCard";
import AddAnotherModal from "../../components/AddAnotherModal";
import SkillListPopup from "./components/SkillListPopup";
import "./styles.module.scss";
import withAuthentication from "../../../../hoc/withAuthentication";
import IconOfficeFileText from "../../../../assets/images/icon-office-file-text.svg";

function InputJobDescription() {
  const [stages, setStages] = useState([
    { name: "Input Job Desccription", isCurrent: true },
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

  const onSearch = useCallback(
    (value) => {
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
    },
    [jdString]
  );

  const onConfirationClick = useCallback(() => {
    setSearchState("searching");
    setCurrentStage(1, stages, setStages);
    setTimeout(() => {
      setCurrentStage(2, stages, setStages);
      setSearchState("done");
    }, 3000);
  }, []);

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
            onContinueClick={onConfirationClick}
          />
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
          <ResultCard />
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
      )}
    </div>
  );
}

InputJobDescription.propTypes = {
  projectId: PT.string,
};

export default withAuthentication(InputJobDescription);
