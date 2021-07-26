/**
 * Input Job Description page
 *
 * Allows user to search for roles by
 * job description
 */
import React, { useCallback, useMemo, useState } from "react";
import PageHeader from "components/PageHeader";
import MarkdownEditor from "../../../../components/MarkdownEditor";
import "./styles.module.scss";
import SearchAndSubmit from "../../components/SearchAndSubmit";
import TextInput from "components/TextInput";
import { getSkillsByJobDescription } from "services/teams";
import SkillListPopup from "./components/SkillListPopup";

function InputJobDescription() {
  const [stages, setStages] = useState([
    { name: "Input Job Description", isCurrent: true },
    { name: "Search Member" },
    { name: "Overview of the Results" },
  ]);
  const [jdString, setJdString] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  const onEditChange = useCallback((value) => {
    setJdString(value);
  }, []);

  const searchObject = useMemo(() => {
    if (jobTitle && jobTitle.length) {
      return { jobDescription: jdString, jobTitle };
    }
    return { jobDescription: jdString };
  }, [jobTitle, jdString]);

  const onClick = useCallback(() => {
    setLoadingSkills(true);
    setSkills([]);
    setPopupOpen(true);
    getSkillsByJobDescription(jdString)
      .then((res) => {
        setSkills(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadingSkills(false);
      });
  }, [jdString]);

  return (
    <SearchAndSubmit
      stages={stages}
      setStages={setStages}
      isProgressDisabled={jdString.length < 10 || jdString.length > 100000}
      progressStyle="input-job-description"
      searchObject={searchObject}
      page="jd"
      onClick={onClick}
      toRender={(searchFunc) => (
        <div styleName="edit-container">
          <PageHeader
            title={<div styleName="title">Input Job Description</div>}
            backTo="/taas/createnewteam"
          />
          <p styleName="subtitle">
            Input a Job Description for your opening and the Topcoder Platform
            will identify the skills required to perform the job duties and find
            the best matching freelancers for your job opening. After inputting
            the Job Description click on the "Search" button to see the skills
            identified.
          </p>
          <div styleName="job-title">
            <TextInput
              placeholder="Job title"
              value={jobTitle}
              onChange={setJobTitle}
              maxLength={100}
              type="text"
            />
          </div>
          <MarkdownEditor
            height="450px"
            placeholder="input job description"
            onChange={onEditChange}
            errorMessage={
              jdString.length > 100000
                ? "Maximum of 100,000 characters. Please reduce job description length."
                : ""
            }
          />
          <SkillListPopup
            open={popupOpen}
            onClose={() => setPopupOpen(false)}
            skills={skills}
            isLoading={loadingSkills}
            onContinueClick={searchFunc}
          />
        </div>
      )}
    />
  );
}

export default InputJobDescription;
