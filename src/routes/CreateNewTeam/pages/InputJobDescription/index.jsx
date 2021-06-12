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
import SearchContainer from "../../components/SearchContainer";

function InputJobDescription() {
  const [stages, setStages] = useState([
    { name: "Input Job Description", isCurrent: true },
    { name: "Search Member" },
    { name: "Overview of the Results" },
  ]);
  const [jdString, setJdString] = useState("");

  const onEditChange = useCallback((value) => {
    setJdString(value);
  }, []);

  return (
    <SearchContainer
      stages={stages}
      setStages={setStages}
      isCompletenessDisabled={jdString.length < 10}
      completenessStyle="input-job-description"
      searchObject={{ jobDescription: jdString }}
    >
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
    </SearchContainer>
  );
}

export default InputJobDescription;
