/**
 * Input Job Description page
 *
 * Gets location state from router
 *
 * Allows user to search for roles by
 * job description
 */
import React, { useCallback, useState } from "react";
import PT from "prop-types";
import PageHeader from "components/PageHeader";
import MarkdownEditor from "../../../../components/MarkdownEditor";
import "./styles.module.scss";
import SearchContainer from "../../components/SearchContainer";

function InputJobDescription({ location: { state: locationState } }) {
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
      locationState={locationState}
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

InputJobDescription.propTypes = {
  locationState: PT.object,
};

export default InputJobDescription;
