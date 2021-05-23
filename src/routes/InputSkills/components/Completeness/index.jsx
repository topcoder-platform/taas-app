import Button from "components/Button";
import React from "react";
import CompleteProgress from "../CompleteProgress";
import "./styles.module.scss";

function Completeness() {
  return (
    <div styleName="completeness">
      <CompleteProgress percentDone={26} />
      <ul styleName="list">
        <li styleName="list-item done">Input Skills</li>
        <li styleName="list-item">Search Member</li>
        <li styleName="list-item">Overview of the Results</li>
      </ul>
      <Button size="medium" type="primary" disabled>
        Search
      </Button>
    </div>
  );
}

export default Completeness;
