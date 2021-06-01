/**
 * Input Job Description page
 *
 */
import React, { useCallback, useEffect, useState } from "react";
import { useData } from "hooks/useData";
import { navigate } from "@reach/router";
import { toastr } from "react-redux-toastr";
import MarkdownEditor from "../../components/MarkdownEditor";
import { getSkillsByJobDescription } from "../../services/teams";
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import PT from "prop-types";
import Completeness from "components/Completeness";
import { getSkills } from "services/skills";
import LoadingIndicator from "components/LoadingIndicator";
import SearchCard from "components/SearchCard";
import ResultCard from "components/ResultCard";
import AddAnotherModal from "components/AddAnotherModal";
import SkillListPopup from "./components/Popup";
import "./styles.module.scss";
import withAuthentication from "../../hoc/withAuthentication";
import IconOfficeFileText from "../../assets/images/icon-office-file-text.svg";

function InputJobDescription() {
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
    setTimeout(() => {
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
          <div styleName='edit-container'>
            <PageHeader
              title="Input Job Description"
              backTo="/taas/myteams/createnewteam"
            />
            <MarkdownEditor
              height='482px'
              placeholder="input job description"
              onChange={onEditChange}
            />
          </div>
          <Completeness
            title="Job Desccription"
            isDisabled={jdString.length < 10}
            backgroundImage="linear-gradient(135deg, #2984BD 0%, #0AB88A 100%)"
            backgroundIcon={<IconOfficeFileText />}
            onClick={onSearch}
            buttonLabel="Search"
            stage={1}
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
            title="Job Desccription"
            backgroundImage="linear-gradient(135deg, #2984BD 0%, #0AB88A 100%)"
            backgroundIcon={<IconOfficeFileText />}
            isDisabled
            buttonLabel="Submit Request"
            stage={2}
          />
        </div>
      ) : (
        <div styleName="page">
          <ResultCard />
          <Completeness
            title="Job Desccription"
            backgroundImage="linear-gradient(135deg, #2984BD 0%, #0AB88A 100%)"
            backgroundIcon={<IconOfficeFileText />}
            buttonLabel="Submit Request"
            stage={3}
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
