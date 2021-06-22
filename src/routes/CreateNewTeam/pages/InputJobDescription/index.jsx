/**
 * Input Job Description page
 *
 * Allows user to search for roles by
 * job description
 */
import React, { useCallback, useState } from "react";
import PageHeader from "components/PageHeader";
import MarkdownEditor from "../../../../components/MarkdownEditor";
import "./styles.module.scss";
import SearchAndSubmit from "../../components/SearchAndSubmit";
import TextInput from "components/TextInput";

function InputJobDescription() {
  const [stages, setStages] = useState([
    { name: "Input Job Description", isCurrent: true },
    { name: "Search Member" },
    { name: "Overview of the Results" },
  ]);
  const [jdString, setJdString] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const onEditChange = useCallback((value) => {
    setJdString(value);
  }, []);

  return (
    <SearchAndSubmit
      stages={stages}
      setStages={setStages}
      isCompletenessDisabled={jdString.length < 10 || jdString.length > 255}
      completenessStyle="input-job-description"
      searchObject={{ jobDescription: jdString }}
      toRender={
        <>
          <div styleName="edit-container">
            <PageHeader
              title="Input Job Description"
              backTo="/taas/myteams/createnewteam"
            />
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
              height="482px"
              placeholder="input job description"
              onChange={onEditChange}
              errorMessage={
                jdString.length > 255
                  ? "Maximum of 255 characters. Please reduce job description length."
                  : ""
              }
            />
          </div>
        </>
      }
    />
  );
}

export default InputJobDescription;
