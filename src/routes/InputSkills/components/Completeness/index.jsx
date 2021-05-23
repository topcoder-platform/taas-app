import Button from "components/Button";
import React from "react";
import CompleteProgress from "../CompleteProgress";
import "./styles.module.scss";
import IconListQuill from "../../../../assets/images/icon-list-quill.svg";

function Completeness({ isDisabled }) {
  return (
    <div styleName="completeness">
      <CompleteProgress percentDone={26} />
      <ul styleName="list">
        <li styleName="list-item done">Input Skills</li>
        <li styleName="list-item">Search Member</li>
        <li styleName="list-item">Overview of the Results</li>
      </ul>
      <Button size="medium" type="primary" disabled={isDisabled}>
        Search
      </Button>
      <IconListQuill styleName="transparent-icon" />
    </div>
  );
}

export default Completeness;
